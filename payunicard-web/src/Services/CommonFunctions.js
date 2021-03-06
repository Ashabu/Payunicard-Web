export const formatCurrencySymbol = (currency) => {
                    let value = currency;
                    switch (currency) {
                        case "USD":
                            value = "$";
                            break;
                        case "EUR":
                            value = "€";
                            break;
                        case "GBP":
                            value = "£";
                         break
                        case "TRY":
                            value = "₺"    
                            break;
                        case "RUB":
                            value = "₽"
                            break;
                            case "RUR":
                            value = "₽"
                            break;
                        case "GEL":
                            value = "₾"
                            break
                        default: 
                            value = currency;
                        break     
                    }
                    return value;
             }


export const formatNumber = (number) => {
                let formatedNumber = parseFloat(number);
                return formatedNumber
                    .toFixed(2)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }       


export const formatDate = (dateString) => {
                    if (!dateString) return "";
                    let dateObj = new Date(dateString);
                    let month = dateObj.getUTCMonth() + 1; //months from 1-12
                    let day = dateObj.getUTCDate();
                    let year = dateObj.getUTCFullYear();
                    let minutes = dateObj.getMinutes();
                    let hour = dateObj.getHours();
                    let newdate =
                        ("0" + day).slice(-2) +
                        "." +
                        ("0" + month).slice(-2) +
                        "." +
                        year +
                        " " +
                        ("0" + hour).slice(-2) +
                        ":" +
                        ("0" + minutes).slice(-2);
                    return newdate;
            }


export const getMccImageUrl = (codeId) => {
                let mccImageUrl;
                switch (codeId) {
                    case 1:
                        mccImageUrl = '../Assets/Images/MccCodeImg/სამშენებლო-მასალები.png'
                        break;
                    case 2:
                        mccImageUrl = '../Assets/Images/MccCodeImg/icons.png';
                        break;
                    case 3:
                        mccImageUrl = '../Assets/Images/MccCodeImg/საკონსულტაციო-სამსახური.png';
                        break;
                    case 4:
                        mccImageUrl = '../Assets/Images/MccCodeImg/გართობა-და-ჰობი.png';
                        break;
                    case 5:
                        mccImageUrl = '../Assets/Images/MccCodeImg/საოჯახო-ხარჯი.png';    
                        break;
                    case 6:
                        mccImageUrl = '../Assets/Images/MccCodeImg/ფინანსური-ინსტიტუტები.png';  
                        break;
                    case 7:
                        mccImageUrl = '../Assets/Images/MccCodeImg/ჯარიმები.png';   
                        break;
                    case 8:
                        mccImageUrl = '../Assets/Images/MccCodeImg/კვება.png';   
                        break;
                    case 9:
                        mccImageUrl = '../Assets/Images/MccCodeImg/სახელმწიფო-სერვისები.png';   
                        break;
                    case 10:
                        mccImageUrl = '../Assets/Images/MccCodeImg/ჯანმრთელობა-და-თავის-მოვლა.png';   
                        break;
                    case 11:
                        mccImageUrl = '../Assets/Images/MccCodeImg/იურიდიული-მომსახურება.png';   
                        break;
                    case 13:
                        mccImageUrl = '../Assets/Images/MccCodeImg/საყიდლები.png';   
                        break;
                    case 14:
                        mccImageUrl = '../Assets/Images/MccCodeImg/ტრანსპორტი.png';   
                        break;
                    case 15:
                        mccImageUrl = '../Assets/Images/MccCodeImg/კომუნალურები.png';   
                        break;
                    default:
                        mccImageUrl ='../Assets/Images/MccCodeImg/სხვადასხვა-ხარჯი.png'
                        break;
                }

                return mccImageUrl;
            }  

            
export const setLogoByAccountType = (type) => {
                if(!type) return;
                if(type === 'MC' || type === 2) {
                    return '../Assets/Images/mc-logo-sm.png';
                } else if (type === 'VS' || type === 3) {
                    return '../Assets/Images/visa-logo_sm.png';
                } else if (type === 'UN' || type === 7) {
                    return '../Assets/Images/unicard-logo-sm.png';
                } else if (type === 'WL' || type === 1){
                    return '../Assets/Images/wallet-logo-sm.png';
                }
            
            } 

     
export const search = (data = [], keys = [], query) => {
    let result =[];

    data.forEach(element => {
        keys.forEach(key=> {
            if(element[key]) {
                if(element[key].toLowerCase().match(query.toLowerCase())) {
                    result.push(element);
                    return;
                };
            }
        });
    });
    return result;
}

export const getKycFullYear = (year) => {
    if(year){
        let x = year.split('-');
        let date = new Date();
        date.setYear(x[x.length -1]);
        return isNaN(date.getFullYear()) ?  '' : date.getFullYear().toString();
    } else {
        return ''
    }
}

