
# IOT Dashboard Backend
- chất lượng không khí (Air)
- Cường độ ánh sáng (Light)
- Mưa (Rain)
- Điều khiển đền/mái che
- Cho phép kết nối nhiều thiết bị 
  - Mỗi thiết bị phần cứng có 1 deviceId
  - Mỗi User sẽ lưu 1 deviceId trong database 
  - Mỗi User Pub/Sub dựa vào deviceId này để xác định nhận đúng dữ liệu/ điều khiển thiết bị của chính chủ


# Broker MQTT Server
- Cho phép BE và FE, thiết bị Pub và Sub
- thiết bị (esp32) (kèm id khớp với userId)
  - Gửi dữ liệu lên broker
  - Nhận tín hiệu điều khiển đèn/mái che từ broker
-  Backend: 
   -  Nhận data realtime để lưu vào database
   -  gửi tín hiệu điều khiển đèn/mái che tới broker
- Fronted: 
  - Nhận data realtime để hiển thị lên dashboard
  - gọi API điều khiển đèn/mái che tới Backend


## API 

#### Đăng nhập 
Để xác thực thiết bị và người dùng

```http
http://localhost:8080/api/login
```
body : 
```
{
    "email":"user1@example.com",
    "password":"123456"
}
```

#### Lấy data theo ngày từ database
trả về dữ liệu trung bình theo mỗi giờ trong 1 ngày
```http
http://localhost:8080/api/get-data-day?types=air&day=2024-11-01&deviceId=dev001
```
#### Lấy data theo tuần từ database
trả về dữ liệu trung bình theo mỗi ngày trong 1 tuần
```http
http://localhost:8080/api/get-data-week?types=air&date=2024-11-01&deviceId=dev001
```

#### Lấy data theo tháng từ database
trả về dữ liệu trung bình theo mỗi ngày trong 1 tháng

```http
http://localhost:8080/api/get-data-month?year=2024&deviceId=dev001&types=air&month=11
```

#### Điều khiển đèn/ mái che

```http
http://localhost:8080/api/control?deviceId=dev002&type=led&status=on
```
```http
http://localhost:8080/api/control?deviceId=dev002&type=toggle&status=on
```

# IOT Dashboard Frontend
  -  Realtime data sẽ nhận từ broker server chứ không phải gọi API từ backend
  - Điều khiển đèn/mái che thì gọi API
    - gọi API điều khiển phải kèm với deviceId để điều khiển đúng thiết bị của user
  - Hiển thị biểu đồ thống kê dựa vào các API get data: day, week, month
