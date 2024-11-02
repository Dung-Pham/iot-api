
import {Login} from '../services/userService'
import {userClients, publishToTopic, connectUser} from '../config/connectBroker'


let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter'
        })
    }

    let userData = await Login(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}


let handleControl = async (req, res) => {
    let deviceId = req.query.deviceId
    let type = req.query.type //  đèn hay là mái che (led/toggle)
    let status = req.query.status // trạng thái on/off 
    if (!deviceId || !type || !status ) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter'
        })
    }
    // xử lý gửi tín hiệu tới broker bằng client tưong ứng với device
    publishToTopic(deviceId, type, status);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
    })
}
module.exports = {
    handleLogin, handleControl
}