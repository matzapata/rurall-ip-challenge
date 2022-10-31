const isIpBanned = require("../domain/isIpBanned")

describe('Ban/Blacklist IPs', () => {
    it("isIpBanned should return true if ip is banned", () => {
        const ipAddress = "192.0.1";
        const getBannedIpByValue = jest.fn(ip => ({ id: 1, ipAddress }));

        isIpBanned({ getBannedIpByValue }, { ipAddress })
            .then(res => expect(res).toBe(true))
            .catch(() => expect(true).toBe(false)) // Should not throw errors
    })
    it("isIpBanned should return false if ip is not banned", () => {
        const ipAddress = "192.0.1";
        const getBannedIpByValue = jest.fn(ip => undefined);

        isIpBanned({ getBannedIpByValue }, { ipAddress })
            .then(res => expect(res).toBe(false))
            .catch(() => expect(true).toBe(false)) // Should not throw errors
    })
})

