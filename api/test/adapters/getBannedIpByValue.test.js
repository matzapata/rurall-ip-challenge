const getBannedIpByValue = require("../../adapters/getBannedIpByValue")

describe('getBannedIpByValue', () => { 
    it("Should return ip object if found or undefined if not", async () => {
        expect(await getBannedIpByValue("notfound")).toBe(undefined)
        expect(await getBannedIpByValue("notfound1")).toBe(undefined)
        expect(await getBannedIpByValue("161.185.160.93")).toEqual({ id: 1, ipAddress: "161.185.160.93" })
        expect(await getBannedIpByValue("161.185.160.94")).toEqual({ id: 2, ipAddress: "161.185.160.94" })
        expect(await getBannedIpByValue("161.185.160.95")).toEqual({ id: 3, ipAddress: "161.185.160.95" })
    })
 })