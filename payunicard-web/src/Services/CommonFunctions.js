class ComonFunctions  {

    formatCurrencySymbol = (currency) => {
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


    formatNumber = (number) => {
        let formatedNumber = parseFloat(number);
        return formatedNumber
            .toFixed(2)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }


    formatDate = (dateString) => {
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

    getMccImageUrl = (codeId) => {
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

    

     



}

export default new ComonFunctions();