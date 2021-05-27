import Lang from './Services/SetLang';

export const initialState = {
    allUserCurrencies: [],
    activeLang: Lang.langKey,
    currencyRates: [],
    isUserAuthorized: false,
    paymentServices: [],
    paymentTemplates: [],
    transactionTemplates: [],
    userAccounts: [],
    userTotalBalance: [],
    userTransactions: [],
    userDetails: [],
    userVerificationStatus: 'Not Verified'
}