const Redis = require('redis')

const cache = Redis.createClient({
    url: process.env.REDIS_URL
})

const CURRENCY_VALUATION_CACHE_LIFETIME = 60*60

const cacheGetIp = async ({ ipAddress }) => {
    const data = await cache.GET(`ips:${ipAddress}`)
    if (data !== null) return JSON.parse(data)
    else return null
};
const cacheSetIp = ({ id, ipAddress, isBanned }) => cache.SET(`ips:${ipAddress}`, JSON.stringify({ id, address: ipAddress, is_banned: isBanned }))

const cacheGetIpCountryData = async ({ countryCode }) => {
    const data = await cache.GET(`countryData:${countryCode}`);
    if (data !== null) return JSON.parse(data)
    else return null;
}
const cacheSetIpCountryData = ({ countryCode, countryData }) => cache.SET(`countryData:${countryCode}`, JSON.stringify(countryData))

const cacheGetCurrencyRates = async ({ base, symbols, date }) => {
    const data = await cache.GET(`currencyRates:${base}:${symbols}:${date}`);
    if (data !== null) return JSON.parse(data) 
    else return null;
}
const cacheSetCurrencyRates = ({ base, symbols, date, currencyRates }) => cache.SETEX(`currencyRates:${base}:${symbols}:${date}`, CURRENCY_VALUATION_CACHE_LIFETIME, JSON.stringify(currencyRates))

module.exports = {
    cache,
    cacheGetIp,
    cacheSetIp,
    cacheGetCurrencyRates,
    cacheSetCurrencyRates,
    cacheGetIpCountryData,
    cacheSetIpCountryData
};
