import mqtt from 'mqtt'
import {
    handleUpdateDate
} from '../controllers/controller'

'../services/service'


let mqttClient = mqtt.connect('mqtt://10.21.242.172');
let mqttData = null;
let data = null
let type = null
mqttClient.on('connect', () => {
    console.log('Đã kết nối đến MQTT broker');

    // subcribe topic Air
    mqttClient.subscribe('SubData/air', (err) => {
        if (err) {
            console.error('Lỗi khi đăng ký topic:', err);
        } else {
            console.log('Đã đăng ký SubData/air thành công');
        }
    });

    // subcribe topic Light
    mqttClient.subscribe('SubData/light', (err) => {
        if (err) {
            console.error('Lỗi khi đăng ký topic:', err);
        } else {
            console.log('Đã đăng ký SubData/light thành công');
        }
    });

    // subcribe topic Rain
    mqttClient.subscribe('SubData/rain', (err) => {
        if (err) {
            console.error('Lỗi khi đăng ký topic rain:', err);
        } else {
            console.log('Đã đăng ký SubData/rain thành công');
        }
    });
});
mqttClient.on('message', (topic, message) => {
    const now = new Date();

    const time = now.toLocaleTimeString(); // e.g., "10:45:30 AM"
    const date = now.toLocaleDateString(); // e.g., "11/01/2024"

    type = topic == "SubData/air" ? "air" : topic == "SubData/light" ? "light" : "rain"

    console.log(`Dữ liệu nhận từ ${topic}: ${message.toString()}`);
    mqttData = {
        a: message.toString(),
        time: time,
        date: date
    }
    data = {
        type : type,
        mqttData : mqttData
    }
    handleUpdateDate(data)
    console.log(data);


});

export default mqttClient;