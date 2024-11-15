import db from '../models/index';
const { Op, fn, col, where } = require('sequelize');


// air service
let updateAirData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.a || !data.time || !data.date || !data.deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Airs.create({
                    ppm: Number(data.a),
                    deviceId: data.deviceId,
                    time: data.time,
                    date: data.date,
                })

                resolve({
                    errCode: 0,
                    errMessage: `ok`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// light service
let updateLightData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.a || !data.time || !data.date || !data.deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Lights.create({
                    lux: Number(data.a),
                    deviceId: data.deviceId,
                    time: data.time,
                    date: data.date,
                })

                resolve({
                    errCode: 0,
                    errMessage: `ok`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// rain service
let updateRainData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.a || !data.time || !data.date || !data.deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Rains.create({
                    status: Number(data.a),
                    deviceId: data.deviceId,
                    time: data.time,
                    date: data.date,
                })

                resolve({
                    errCode: 0,
                    errMessage: `ok`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// get all data for each type
let getAllData = (types, deviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                let model = types == "air" ? db.Airs :
                    types == "light" ? db.Lights : db.Rains
                datas = await model.findAll({ where: { deviceId: deviceId } });
            }
            resolve(datas)
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 day
let getAllDataDay = (types, day, deviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !day || !deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                let model = types == "air" ? db.Airs :
                    types == "light" ? db.Lights : db.Rains

                datas = await model.findAll({
                    where: {
                        date: day,
                        deviceId: deviceId
                    }
                });
            }

            let value = types == "air" ? "ppm" :
            types == "light" ? "lux" : "status";

            // Nhóm dữ liệu theo giờ dựa vào trường time
            let groupedData = datas.reduce((acc, data) => {
                let hour = data.time.split(':')[0]; 
                if (!acc[hour]) acc[hour] = [];
                acc[hour].push(data[value]); 
                return acc;
            }, {});

            let averagedData = Object.keys(groupedData).map(hour => {
                let values = groupedData[hour];
                let average = values.reduce((sum, value) => sum + value, 0) / values.length;
                average = Math.ceil(average * 100) / 100; 
                return {
                    hour, 
                    average: average
                };
            });
            resolve(
                averagedData
            )
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 month
let getAllDataMonth = (types, month, year, deviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !month || !year || !deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                let model = types == "air" ? db.Airs :
                    types == "light" ? db.Lights : db.Rains

                datas = await model.findAll({
                    where: {
                        [Op.and]: [
                            where(fn('MONTH', col('date')), month),  // So sánh tháng
                            where(fn('YEAR', col('date')), year),     // So sánh năm
                        ],
                        deviceId: deviceId
                    }
                });
            }

            let value = types == "air" ? "ppm" :
                types == "light" ? "lux" : "status";

            let averagedData = averageDataInDay(datas, value)
            resolve({
                averagedData
            })
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 week
let getAllDataWeek = (types, days, deviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !days || !deviceId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                let model = types == "air" ? db.Airs :
                    types == "light" ? db.Lights : db.Rains

                let listDays = days;

                datas = await model.findAll({
                    where: {
                        date: {
                            [Op.in]: listDays
                        },
                        deviceId: deviceId
                    }
                });
            }

            let value = types == "air" ? "ppm" :
                types == "light" ? "lux" : "status";

            let averagedData = averageDataInDay(datas, value)
            resolve({
                averagedData
            })
        } catch (e) {
            reject(e)
        }
    })
}

let averageDataInDay = (datas, value) => {
    // Nhóm dữ liệu theo ngày
    let groupedData = datas.reduce((acc, data) => {
        let date = data.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(data[value]);
        return acc;

    }, {});

    // Tính trung bình cho từng ngày
    let averagedData = Object.keys(groupedData).map(date => {
        let values = groupedData[date];
        let average = values.reduce((sum, value) => sum + value, 0) / values.length;
        average = Math.ceil(average * 100) / 100
        return {
            date: date,
            average: average
        };
    });
    return averagedData;
}
module.exports = {
    getAllData, updateRainData, updateLightData, updateAirData,
    getAllDataDay, getAllDataMonth, getAllDataWeek
}