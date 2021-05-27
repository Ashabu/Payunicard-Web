import { User } from '../Services/API/APIS';



export const handleTransactionDetailView = (transaction, callBack, navigate) => {
  
    if(transaction.tranID){ 
        User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
            if(res.data.ok) {
                callBack(res.data.data)
            } else {
                console.log('error')
            }
        }).catch(error => {
            console.log(error)
        })
        navigate(transaction.tranID)
    } else {
        callBack(transaction)
        navigate(transaction.cardNumber)
        
    }
    
}
