const fetch = require("cross-fetch")
require("dotenv").config()

module.exports = async (ipAddress) => {
    const resCountryCode = await fetch(`http://api.ipapi.com/api/${ipAddress}?access_key=${process.env.IPAPI_API_KEY}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resCountryCodeJson = await resCountryCode.json()
    
    const resCountryData = await fetch(`https://restcountries.com/v3.1/alpha/${resCountryCodeJson.country_code}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resCountryDataJson = await resCountryData.json()
    const countryData = resCountryDataJson[0]

    return {
        code: resCountryCodeJson.country_code,
        name: countryData.name.official,
        currency: Object.keys(countryData.currencies)[0]
    }
}