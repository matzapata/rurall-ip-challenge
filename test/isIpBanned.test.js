

describe('Ban/Blacklist IPs', () => {
    it("isIpBanned should return true if ip is banned", () => {
        const ipAddress = "192.0.1"; 
        const getBannedIpByValue = jest.fn(ip => ({ id: 1, ip: ipAddress }));
        
        expect(isIpBanned({ getBannedIpByValue }, { ip: ipAddress })).toBe(true);
    })
    it("isIpBanned should return false if ip is not banned", () => {
        const ipAddress = "192.0.1"; 
        const getBannedIpByValue = jest.fn(ip => undefined);
        
        expect(isIpBanned({ getBannedIpByValue }, { ip: ipAddress })).toBe(false);
    })
})

