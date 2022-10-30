

module.exports = async ({ getBannedIpByValue }, { ipAddress }) => {
    const foundIp = await getBannedIpByValue(ipAddress);
    console.log(foundIp)
    return foundIp !== undefined? true : false;
}
