const getCurrencyValuation = require("../../adapters/getCurrencyValuation")
const nock = require("nock");
const todayDate = require("../../utils/todayDate");
const redisClient = require("../../data/redisClient")

describe('Get currency valuation', () => {
    
    beforeAll(async () => {
        await redisClient.connect()
	})

    afterAll(async () => {
		await redisClient.disconnect()
	})

    it("Should return symbols rates", () => {
        const date = "2022-10-30";
        const symbols = ["USD", "EUR"]
        const base = "ARS";

        nock("https://api.apilayer.com")
            .get(`/fixer/${date}?symbols=${symbols.join("%2C")}&base=${base}`)
            .reply(200, {
                base: "ARS",
                date: "2022-10-30",
                historical: true,
                rates: {
                    "EUR": 0.006433,
                    "USD": 0.00641
                },
                success: true,
                timestamp: 1667137804
            })

        return getCurrencyValuation({ base, symbols, date })
            .then((res) => {
                expect(res.EUR).toBe(0.006433)
                expect(res.USD).toBe(0.00641)
            })
            .catch(e => expect(true).toBe(false)) // should not fail
    })
    it("Should use today as default date", () => {
        const date = todayDate();
        const symbols = ["USD", "EUR"]
        const base = "ARS";

        nock("https://api.apilayer.com")
            .get(`/fixer/${date}?symbols=${symbols.join("%2C")}&base=${base}`)
            .reply(200, {
                base: "ARS",
                date: "2022-10-30",
                historical: true,
                rates: {
                    // fixed unreal values to validate this nock has been used
                    "EUR": 1,
                    "USD": 1
                },
                success: true,
                timestamp: 1667137804

            })

        return getCurrencyValuation({ base, symbols })
            .then((res) => {
                expect(res.EUR).toBe(1)
                expect(res.USD).toBe(1)
            })
            .catch(e => expect(true).toBe(false)) // should not fail
    })
});
