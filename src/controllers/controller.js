import { forEach } from 'lodash'
import {
    getAllData, updateRainData, updateLightData, updateAirData,
    getAllDataDay, getAllDataMonth, getAllDataWeek
} from '../services/service'


let handleGetAllData = async (req, res) => {
    let types = req.query.types
    let deviceId = req.query.deviceId

    let data = await getAllData(types, deviceId)
    console.log(data)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        data
    })
}
// get data in 1 day
let handleGetDataDay = async (req, res) => {
    let types = req.query.types
    let day = req.query.day
    let deviceId = req.query.deviceId
    
    let data = await getAllDataDay(types, day, deviceId)
    console.log(data)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        data
    })
}
let getDayOfWeek = (day, month, year) => {
    let days = []
    // Lưu ý: tháng trong JavaScript bắt đầu từ 0 (0 = Tháng 1, 1 = Tháng 2, ..., 11 = Tháng 12)
    const date = new Date(year, month - 1, day); // Trừ 1 từ tháng để phù hợp với chỉ số của JavaScript
    const dayOfWeek = date.getDay(); // Lấy thứ trong tuần (0 - Chủ nhật, 1 - Thứ Hai, ..., 6 - Thứ Bảy)

    // lấy các date trong week
    for (let i = 1 ; i <8; i++){
        let x = new Date(date);
        x.setDate(Number(day) - (Number(dayOfWeek) - i))
        days.push(x)
        console.log('đây là ngày thứ',i,', ', x)
    }
    // Đặt tên cho các thứ trong tuần
    const days_text = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    return days;
}

// get data in 1 week
let handleGetDataWeek = async (req, res) => {
    let types = req.query.types
    let date = new Date(req.query.date)
    const year = date.getFullYear(); // Lấy năm
    const month = date.getMonth() + 1; // Lấy tháng (0-11), cần cộng 1
    const day = date.getDate(); // Lấy ngày (1-31)

    let deviceId = req.query.deviceId
    let days = getDayOfWeek(day, month, year)
    console.log('đây là DayOfWeek: ',days)
    let data = await getAllDataWeek(types, days, deviceId)
    console.log(data)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        data
    })
}

// get data in 1 month
let handleGetDataMonth = async (req, res) => {
    let types = req.query.types
    let month = req.query.month
    let year = req.query.year
    let deviceId = req.query.deviceId
    let data = await getAllDataMonth(types, month, year, deviceId)
    console.log(data)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        data
    })
}


let handleUpdateDate = async (data) => {
    let message = data.type == "air" ? await updateAirData(data.mqttData) :
        data.type == "light" ? await updateLightData(data.mqttData) : await updateRainData(data.mqttData)
    console.log(message)
    // return res.status(200).json(message)
}

module.exports = {
    handleGetAllData, handleUpdateDate, handleGetDataDay, handleGetDataWeek,
    handleGetDataMonth
}