import mqtt from 'mqtt'
import {
    handleUpdateDate
} from '../controllers/controller'

//list client tương ứng với device (deviceId)
export const userClients = {};

// Function to connect a user to MQTT
export const connectUser = (deviceId) => {
    const client = mqtt.connect('mqtt://192.168.1.52');
    let mqttData = null
    let data = null
    let type = null
    client.on('connect', () => {
        console.log(`${deviceId} connected to MQTT broker`);
        client.subscribe(`${deviceId}/data/+`, (err) => {
            if (err) {
                console.error(`${deviceId} subscription error:`, err);
            }
        });
    });

    client.on('message', (topic, message) => {
        console.log(`${deviceId} received message on ${topic}: ${message.toString()}`);
        const now = new Date();

        const time = now.toLocaleTimeString(); // e.g., "10:45:30 AM"
        const date = now.toLocaleDateString(); // e.g., "11/01/2024"

        type = topic == `${deviceId}/data/air` ? "air" : topic == `${deviceId}/data/light` ? "light" : "rain"

        mqttData = {
            a: message.toString(),
            deviceId: deviceId,
            time: time,
            date: date
        }
        data = {
            type: type,
            mqttData: mqttData
        }
        handleUpdateDate(data)
        console.log(data);
    });

    userClients[deviceId] = client; // Store the client for later use
}

export const publishToTopic = (deviceId, subTopic, message) => {
    const client = userClients[deviceId];
    if (client) {
        const topic = `${deviceId}/${subTopic}`;
        client.publish(topic, message, (err) => {
            if (err) {
                console.error(`Publish error for user ${deviceId} on topic ${topic}:`, err);
            } else {
                console.log(`Message published to ${topic} for user ${deviceId}: ${message}`);
            }
        });
    } else {
        console.error(`Client not found for user ${deviceId}. Please ensure the user is connected.`);
    }
}