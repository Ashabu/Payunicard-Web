import Lang from './Services/SetLang';

export const initialState = {
    allUserCurrencies: [],
    activeLang: Lang.langKey,
    currencyRates: [],
    isUserAuthorized: false,
    packages: [],
    packageCurrencies: [],
    paymentServices: [],
    paymentTemplates: [],
    transferTemplates: [],
    userAccounts: [],
    userTotalBalance: [],
    userTransactions: [],
    userDetails: [],
    userVerificationStatus: 'Not Verified'
}