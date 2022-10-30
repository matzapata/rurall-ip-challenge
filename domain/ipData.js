const IpEntity = require("../entities/Ip")

module.exports = async ({ getIpCountryData, getCurrencyValuation }, { ipAddress }) => {
    const Ip = new IpEntity(ipAddress);
    if (Ip.validate() === false) throw new Error("Invalid IP");

    const { code, name, currency } = await getIpCountryData(ipAddress);
    const { USD, EUR } = await getCurrencyValuation(currency)

    return {
        code,
        name,
        currency,
        currencyRates: { USD, EUR }
    }
}
