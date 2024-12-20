import express from "express"
import {
    handleGetAllData, handleGetDataDay, handleGetDataWeek, handleGetDataMonth
} from "../controllers/controller"
import {
    handleLogin, handleControl
} from "../controllers/userController"
import{getHomePage} from "../controllers/homeControler"


let router = express.Router()

let initWebRouter = (app) => {
    // homeController
    router.get('/', getHomePage)

    // Controller
    router.get('/api/get-all-data', handleGetAllData) // get all data
    router.get('/api/get-data-day', handleGetDataDay) // get data in 1 day
    router.get('/api/get-data-week', handleGetDataWeek) // get data in 1 week
    router.get('/api/get-data-month', handleGetDataMonth) // get data in 1 month

    //userController
    router.post('/api/login', handleLogin)
    // light, toggle
    router.post('/api/control', handleControl)
    
    return app.use('/', router)
}

module.exports = initWebRouter