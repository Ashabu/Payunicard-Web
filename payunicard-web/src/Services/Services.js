import User from './API/UserServices';
class Services {
    
    handleTransactionDetailView = (transaction, history) => {
        let selectedTransaction = [];
        if(transaction.tranID){ 
            User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
                if(res.data.ok) {
                    selectedTransaction = res.data.data
                } else {
                    console.log('error')
                }
            }).catch(error => {
                console.log(error)
            })
           history.push({
                pathname: '/Transactions/TransactionDetail',
                search: `?tranId=${transaction.tranID}`,
            })
        } else {
            selectedTransaction = transaction;
           history.push({
                pathname: '/Transactions/TransactionDetail',
                search: `?cardNumber=${transaction.cardNumber}`,
            })
        }
        this.callback(selectedTransaction)
        
    }

    callback = (data) => {
        return data;
    }
}

export default new Services;