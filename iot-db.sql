USE `iot-db`;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    deviceId VARCHAR(255)
);

CREATE TABLE Airs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ppm FLOAT,
    deviceId VARCHAR(255),
    time TIME,
    date DATE
);

CREATE TABLE Lights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lux FLOAT,
    deviceId VARCHAR(255),
    time TIME,
    date DATE
);

CREATE TABLE Rains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT,
    deviceId VARCHAR(255),
    time TIME,
    date DATE
);

INSERT INTO Users (userName, email, password, deviceId) VALUES 
('DungP', 'user1@example.com', '123456', 'dev001'),
('Anh', 'user2@example.com', '123456', 'dev002'),
('Huyền', 'user3@example.com', '123456', 'dev003'),
('Loi', 'user4@example.com', '123456', 'dev004'),
('Loc', 'user5@example.com', '123456', 'dev005');

-- Thêm dữ liệu vào bảng Airs
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (400.5, 'dev001','08:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (410.2, 'dev005', '09:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (380.1, 'dev003', '10:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (390.8, 'dev002', '11:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (405.3, 'dev002', '12:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (420.0, 'dev004', '13:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (400.9, 'dev003', '14:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (415.6, 'dev002', '15:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (390.5, 'dev004', '16:00:00', '2024-11-01');
INSERT INTO Airs (ppm, deviceId, time, date) VALUES (410.3, 'dev001', '17:00:00', '2024-11-01');

-- Thêm dữ liệu vào bảng Lights
INSERT INTO Lights (lux, deviceId, time, date) VALUES (300.5, 'dev001', '08:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (320.2, 'dev004', '09:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (290.1, 'dev002', '10:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (310.8, 'dev001', '11:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (305.3, 'dev003', '12:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (330.0, 'dev004', '13:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (315.9, 'dev001', '14:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (300.6, 'dev002', '15:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (310.5, 'dev005', '16:00:00', '2024-11-01');
INSERT INTO Lights (lux, deviceId, time, date) VALUES (320.3, 'dev004', '17:00:00', '2024-11-01');


-- Thêm dữ liệu vào bảng Rains theo ngày
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev001', '00:00:00', '2024-10-22'); -- Mưa
INSERT INTO Rains (status, deviceId, time, date) VALUES (0, 'dev004', '00:00:00', '2024-10-23'); -- Không mưa
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev002', '00:00:00', '2024-10-24');
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev002', '00:00:00', '2024-10-25');
INSERT INTO Rains (status, deviceId, time, date) VALUES (0, 'dev003', '00:00:00', '2024-10-26');
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev003', '00:00:00', '2024-10-27');
INSERT INTO Rains (status, deviceId, time, date) VALUES (0, 'dev005', '00:00:00', '2024-10-28');
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev004', '00:00:00', '2024-10-29');
INSERT INTO Rains (status, deviceId, time, date) VALUES (0, 'dev002', '00:00:00', '2024-10-30');
INSERT INTO Rains (status, deviceId, time, date) VALUES (1, 'dev003', '00:00:00', '2024-10-31');
airs