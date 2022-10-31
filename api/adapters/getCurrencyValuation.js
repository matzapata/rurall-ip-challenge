require('dotenv').config()
const todayDate = require("../utils/todayDate")
const fetch = require('cross-fetch');
const redisClient = require("../data/redisClient")

const CURRENCY_VALUATION_CACHE_LIFETIME = 60*60

module.exports = async ({
    base, // Base currency symbol to convert from
    symbols, // Array of currency symbols to convert to 
    date // A date in the past for which historical rates are requested (as string formated like yyyy-mm-dd). Default today.
}) => {
    // If available fetch data from cache
    let currencyRates = await redisClient.GET(`currencyRates:${base}:${symbols}:${date}`);
    if (currencyRates !== null) return JSON.parse(currencyRates);

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
    await redisClient.SETEX(`currencyRates:${base}:${symbols}:${date}`, CURRENCY_VALUATION_CACHE_LIFETIME, JSON.stringify(currencyRates))

    return currencyRates; 
}