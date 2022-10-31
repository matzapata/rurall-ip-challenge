

module.exports = async ({ getBannedIpByValue }, { ipAddress }) => {
    const foundIp = await getBannedIpByValue(ipAddress);
    return foundIp !== undefined? true : false;
}
