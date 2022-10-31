const getIpCountryData = require("../../adapters/getIpCountryData")
const redisClient = require("../../data/redisClient")
const nock = require("nock")
require("dotenv").config()

describe('Get ip country data', () => {

    beforeAll(async () => {
        await redisClient.connect()
	})

    afterAll(async () => {
		await redisClient.disconnect()
	})

    it("Given an ip it should respond with the ip country code, name and currency", () => {
        const testIpAddress = "161.185.160.93"
        const testIpAddressCountryCode = "US"
        const testIpAddressCountryName = "United States of America"
        const testIpAddressCurrency = "USD"

        nock("http://api.ipapi.com")
            .get(`/api/${testIpAddress}?access_key=${process.env.IPAPI_API_KEY}`)
            .reply(200, {
                "ip": "161.185.160.93",
                "type": "ipv4",
                "continent_code": "NA",
                "continent_name": "North America",
                "country_code": "US",
                "country_name": "United States",
                "region_code": "NY"
            })

        nock("https://restcountries.com")
            .get(`/v3.1/alpha/${testIpAddressCountryCode}`)
            .reply(200, [
                {
                    "name": {
                        "common": "United States",
                        "official": "United States of America",
                        "nativeName": {
                            "eng": {
                                "official": "United States of America",
                                "common": "United States"
                            }
                        }
                    },
                    "currencies": {
                        "USD": {
                            "name": "United States dollar",
                            "symbol": "$"
                        }
                    },
                }
            ])


            return getIpCountryData(testIpAddress)
                .then((res) => {
                    expect(res.code).toBe(testIpAddressCountryCode) 
                    expect(res.name).toBe(testIpAddressCountryName) 
                    expect(res.currency).toBe(testIpAddressCurrency) 
                })
                .catch(e => expect(true).toEqual(false))

    })
})