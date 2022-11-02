require('dotenv').config()
const todayDate = require("../utils/todayDate")
const fetch = require('cross-fetch');
const { cache, cacheGetCurrencyRates, cacheSetCurrencyRates } = require("../data/redis")

const CURRENCY_VALUATION_CACHE_LIFETIME = 60*60

module.exports = async ({
    base, // Base currency symbol to convert from
    symbols, // Array of currency symbols to convert to 
    date // A date in the past for which historical rates are requested (as string formated like yyyy-mm-dd). Default today.
}) => {
    // If available fetch data from cache
    let currencyRates = await cacheGetCurrencyRates({ base, symbols, date })
    if (currencyRates !== null) return currencyRates;

    // Data is not in cache, fetch from api and store to cache 
    const res = await fetch(`https://api.apilayer.com/fixer/${date === undefined ? todayDate() : date}?symbols=${symbols.join("%2C")}&base=${base}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "apikey": process.env.FIXER_API_KEY
        }
    })
    const resJson = await res.json()
    currencyRates = { ...resJson.rates }
    await cacheSetCurrencyRates({ base, symbols, date, currencyRates })

    return currencyRates; 
}