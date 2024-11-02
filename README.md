
# IOT Dashboard Backend
- chất lượng không khí (Air)
- Cường độ ánh sáng (Light)
- Mưa (Rain)

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

```


#### Lấy data theo ngày từ database

```http
http://localhost:8080/api/get-data-day?types=rain&day=2024-11-01
```
#### Lấy data theo tuần từ database

```http
http://localhost:8080/api/get-data-week?types=rain&date=2024-11-01
```

#### Lấy data theo tháng từ database

```http
http://localhost:8080/api/get-data-month?types=rain&month=10&year=2024
```

#### Điều khiển đèn

```http

```

#### Điều khiển mái che

```http

```

# IOT Dashboard Frontend
  -  Realtime data sẽ nhận từ broker server chứ không phải gọi API từ backend
  - Điều khiển đèn/mái che thì gọi API
  - Hiển thị biểu đồ thống kê dựa vào các API get data: day, week, month
