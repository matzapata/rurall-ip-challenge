require('dotenv').config()
const todayDate = require("../utils/todayDate")
const fetch = require('cross-fetch');

module.exports = async ({
    base, // Base currency symbol to convert from
    symbols, // Array of currency symbols to convert to 
    date // A date in the past for which historical rates are requested (as string formated like yyyy-mm-dd). Default today.
}) => {
    const res = await fetch(`https://api.apilayer.com/fixer/${date === undefined ? todayDate() : date}?symbols=${symbols.join("%2C")}&base=${base}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "apikey": process.env.FIXER_API_KEY
        }
    })
    const resJson = await res.json()

    return { ...resJson.rates }
}