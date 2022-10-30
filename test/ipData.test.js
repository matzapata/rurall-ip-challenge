const ipData = require("../domain/ipData");
const IpEntity = require("../entities/Ip")

// mock interfaces functions
const getIpCountryData = jest.fn(ipAddress => ({
    code: "ARS",
    name: "Argentina",
    currency: "ARS"
}))
const getCurrencyValuation = jest.fn(baseCurrency => ({ USD: 1.2, EUR: 1.5 }))

describe("IP data", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Ip entity should validate ips correctly', () => {
        const validIp = new IpEntity("192.168.0.1")
        const invalidIp = new IpEntity("")

        expect(validIp.validate()).toBe(true)
        expect(invalidIp.validate()).toBe(false)
    })
    it('Should throw error when IP is invalid', async () => {
        return ipData({ getIpCountryData, getCurrencyValuation }, { ipAddress: "invalidIp" })
            .then(() => expect(true).toBe(false)) // Fail test if above expression doesn't throw anything.
            .catch((e) => {
                expect(e?.message).toBe("Invalid IP")
                expect(getIpCountryData.mock.calls.length).toBe(0) // validation must happen before api calls
                expect(getCurrencyValuation.mock.calls.length).toBe(0) // validation must happen before api calls
            })
    })
    it('Should respond with ip country name, ISO, and currency valuation', async () => {
        const ipAddress = "192.168.0.1";
        return ipData({ getIpCountryData, getCurrencyValuation }, { ipAddress })
            .then((res) => {
                expect(typeof res?.name).toBe("string")
                expect(typeof res?.code).toBe("string")
                expect(typeof res?.currency).toBe("string")
                expect(typeof res?.currencyRates).toBe("object")
                expect(typeof res?.currencyRates.USD).toBe("number")
                expect(typeof res?.currencyRates.EUR).toBe("number")

                // Interfaces must be used to resolve data
                expect(getIpCountryData).toHaveBeenCalledWith(ipAddress)
                expect(getCurrencyValuation).toHaveBeenCalledWith("ARS")
            })
    })
})