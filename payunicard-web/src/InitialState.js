import Lang from './Services/SetLang';

export const initialState = {
    allUserCurrencies: [],
    activeLang: Lang.langKey,
    currencyRates: [],
    isUserAuthorized: false,
    paymentTemplates: [],
    transactionTemplates: [],
    userAccounts: [],
    userTotalBalance: [],
    userTransactions: [],
    userDetails: []
}