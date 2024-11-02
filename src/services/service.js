import db from '../models/index';
const { Op, fn, col, where } = require('sequelize');


// air service
let updateAirData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.a || !data.time || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Airs.create({
                    ppm: Number(data.a),
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
            if (!data.a || !data.time || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Lights.create({
                    lux: Number(data.a),
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
            if (!data.a || !data.time || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                await db.Rains.create({
                    status: Number(data.a),
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
let getAllData = (types) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                datas = await (types == "air" ? db.Airs.findAll() :
                    types == "light" ? db.Lights.findAll() : db.Rains.findAll())
            }
            resolve(datas)
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 day
let getAllDataDay = (types, day) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !day) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                let model = types == "air" ? db.Airs :
                    types == "light" ? db.Lights : db.Rains

                datas = await model.findAll({ where: { date: day } });
            }
            resolve(datas)
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 month
let getAllDataMonth = (types, month, year) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !month || !year) {
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
                            where(fn('YEAR', col('date')), year)     // So sánh năm
                        ]
                    }
                });
            }
            resolve(datas)
        } catch (e) {
            reject(e)
        }
    })
}

// get all data for each type in 1 week
let getAllDataWeek = (types, days) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datas = null
            if (!types || !days) {
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
                        }
                    }
                });
            }
            resolve(datas)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllData, updateRainData, updateLightData, updateAirData,
    getAllDataDay, getAllDataMonth, getAllDataWeek
}