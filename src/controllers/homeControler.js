import { json } from 'body-parser'
import db from '../models/index'

let getHomePage = async (req, res) => {
    try {
        // let data = await db.Airs.findAll()
        return res.render('homePage.ejs', {data: "Hello from backend server!"})
    } catch (error) {
        console.log(error)  
    }
}

let getCRUD = (req, res) => {
    return res.send('CRUD')
}

module.exports = {
    getHomePage, getCRUD
}