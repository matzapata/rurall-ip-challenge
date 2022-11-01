const fetch = require("cross-fetch")
require("dotenv").config()
const { cache } = require("../data/redis");

const getIpCountryCode = async (ipAddress) => {
    // If available fetch data from cache
    const countryCode = await cache.GET(`ipCountryCode:${ipAddress}`)
    if (countryCode !== null) return countryCode; 

    // Data is not in cache, fetch from api and store to cache 
    const resCountryCode = await fetch(`http://api.ipapi.com/api/${ipAddress}?access_key=${process.env.IPAPI_API_KEY}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resCountryCodeJson = await resCountryCode.json()
    await cache.SET(`ipCountryCode:${ipAddress}`, resCountryCodeJson.country_code)
    
    return resCountryCodeJson.country_code;
}

const getCountryNameAndCurrency =  async (countryCode) => {
    // If available fetch data from cache
    let countryData = await cache.GET(`countryData:${countryCode}`);
    if (countryData !== null) return JSON.parse(countryData);

    // Data is not in cache, fetch from api and store to cache 
    const resCountryData = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resCountryDataJson = await resCountryData.json()
    countryData = {
        name: resCountryDataJson[0].name.official,
        currency: Object.keys(resCountryDataJson[0].currencies)[0]
    }
    await cache.SET(`countryData:${countryCode}`, JSON.stringify(countryData))
    
    return countryData;
}

module.exports = async (ipAddress) => {
    const countryCode = await getIpCountryCode(ipAddress)
    const countryNameAndCurrency = await getCountryNameAndCurrency(countryCode)

    return {
        code: countryCode,
        name: countryNameAndCurrency.name,
        currency: countryNameAndCurrency.currency
    }
}