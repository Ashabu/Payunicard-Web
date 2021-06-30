
import axios from "axios";

class AuthService {
    refreshStarted = false;

  //set token and refresh token
  setToken(token, refreshToken) {
    localStorage.setItem("access_token", token);

    if (refreshToken !== undefined) {
      localStorage.setItem("refresh_token", refreshToken);
    }
  }

  //get token
  getToken() {
    return localStorage.getItem("access_token");
  }

  //get refresh token
  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  //remove token and refresh token
  removeToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  //is authenticated
  isAuthenticated() {
    let token = this.getToken();
    let refreshToken = this.getRefreshToken();

    return token != null || refreshToken != null;
  }

   SignOut () {
     this.removeToken();
  }

  registerAuthInterceptor(callBack) {
    const setAuthToken =  (config) => {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${this.getToken()}`;
      
    };

    const waitForRefresh = (config) => {
      return new Promise(resolve => {
        let interval = setInterval(() => {
          if (this.refreshStarted) return;

          clearInterval(interval);
          resolve(config);
        }, 500);
      });
    };

    //add auth header
    let requestInterceptor = axios.interceptors.request.use(
       (config) => {
        if (this.isAuthenticated() && !config.anonymous) {
          console.log(this.isAuthenticated(), config.anonymous);
          //if refreshStarted wait
          if (this.refreshStarted && !config.skipRefresh) {
            return waitForRefresh(config).then( (config) => {
              if (!this.getToken())
                return Promise.reject({status: 401});
               setAuthToken(config);
              return Promise.resolve(config);
            });
          }

           setAuthToken(config);
        }
        return config;
      },
    );

    // if unauthorized refetch
    let responseInterceptor = axios.interceptors.response.use(
      response => response,
       (error) => {
        console.log('error', error);
        error.response = error.response || {};

        //Reject promise if usual error
        if (
          (error.response.status !== 401 &&
            error.response.status !== 403 &&
            error.response.status !== 400) ||
          error.config.anonymous ||
          error.config.skipRefresh
        ) {
          return Promise.reject(error);
        }
        const originalRequest = error.config;
        //if refresh already started wait and retry with new token
        if (this.refreshStarted) {
          return waitForRefresh().then( _ => {
            if (!this.getToken()) return Promise.reject({status: 401});
            setAuthToken(originalRequest);
            return axios(originalRequest);
          });
        }

        //refresh token
        this.refreshStarted = true;
        const refreshObj = new FormData();
        refreshObj.append('scope', 'Wallet_Api.Full offline_access');
        refreshObj.append('client_id', 'WalletApi');
        refreshObj.append('client_secret', 'abcd123');
        refreshObj.append('grant_type', 'refresh_token');
        refreshObj.append('refresh_token',  this.getRefreshToken());
        return axios
          .post(`${globalConfig.token_URL}`, refreshObj, {anonymous: true})
          .then( response => {
            if (!response.data.access_token) throw response;
             this.setToken(
              response.data.access_token,
              response.data.refresh_token,
            );

            this.refreshStarted = false;

            setAuthToken(originalRequest);
            return axios(originalRequest);
          })
          .catch(err => {
            this.refreshStarted = false;
            this.SignOut();
            callBack();
            return Promise.reject(err);
          });
      },
    );

    return {
      unsubscribe: () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      },
    };
  }

}

export default new AuthService();
