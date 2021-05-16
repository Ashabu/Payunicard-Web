/* eslint-disable no-undef */
import axios from 'axios'

class ExportService  {

exportStatementsInExel = async (data) => {
    return await axios.post(`${globalConfig.api_URL}/User/ExportUserAccountStatementsAsExcelAsync`, data, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'statements.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });

}


exportStatementsInPDF = async (data) => {
    let request = new XMLHttpRequest();
            request.open("GET", `/User/ExportStatementsAsPdfAsync?accountNumber=${data.accountNumber}&startDate=${data.startDate}&endDate=${data.endDate}`, true);
            request.responseType = "blob";
            request.onload = function (e) {
                if (this.status === 200) {
                    // `blob` response
                    console.log(this.response);
                    // create `objectURL` of `this.response` : `.pdf` as `Blob`
                    let file = window.URL.createObjectURL(this.response);
                    let a = document.createElement("a");
                    a.href = file;
                    a.download = this.response.name || "Wallet-Statements";
                    document.body.appendChild(a);
                    a.click();
                    // remove `a` following `Save As` dialog, 
                    // `window` regains `focus`
                    window.onfocus = function () {
                        document.body.removeChild(a)
                    }
                };
            };
            request.send();
    
}
}

export default new ExportService;