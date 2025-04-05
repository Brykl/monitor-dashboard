const osu = require('os-utils');

function getCpuUsage(): Promise<string> {
    return new Promise((resolve, reject) => {
        osu.cpuUsage((v: number) => {
                const cpuLoad = (v * 100).toFixed(2);  
                resolve(cpuLoad);  
        });
    });
}


module.exports = getCpuUsage;
