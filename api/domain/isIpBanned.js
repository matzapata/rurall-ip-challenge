

module.exports = async ({ getIpByValue, setIp }, { ipAddress }) => {
    const foundIp = await getIpByValue(ipAddress);
    if (foundIp === null) {
        await setIp(ipAddress, false)
        return false;
    } else return foundIp.isBanned;
}
