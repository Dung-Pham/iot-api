USE `iot-db`;
CREATE TABLE Air (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ppm FLOAT,
    time TIME,
    date DATE
);

CREATE TABLE Light (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lux FLOAT,
    time TIME,
    date DATE
);

CREATE TABLE Rain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status INT,
    time TIME,
    date DATE
);

-- Thêm dữ liệu vào bảng Air
INSERT INTO Air (ppm, time, date) VALUES (400.5, '08:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (410.2, '09:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (380.1, '10:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (390.8, '11:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (405.3, '12:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (420.0, '13:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (400.9, '14:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (415.6, '15:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (390.5, '16:00:00', '2024-11-01');
INSERT INTO Air (ppm, time, date) VALUES (410.3, '17:00:00', '2024-11-01');

-- Thêm dữ liệu vào bảng Light
INSERT INTO Light (lux, time, date) VALUES (300.5, '08:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (320.2, '09:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (290.1, '10:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (310.8, '11:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (305.3, '12:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (330.0, '13:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (315.9, '14:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (300.6, '15:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (310.5, '16:00:00', '2024-11-01');
INSERT INTO Light (lux, time, date) VALUES (320.3, '17:00:00', '2024-11-01');


-- Thêm dữ liệu vào bảng Rain theo ngày
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-22'); -- Mưa
INSERT INTO Rain (status, time, date) VALUES (0, '00:00:00', '2024-10-23'); -- Không mưa
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-24');
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-25');
INSERT INTO Rain (status, time, date) VALUES (0, '00:00:00', '2024-10-26');
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-27');
INSERT INTO Rain (status, time, date) VALUES (0, '00:00:00', '2024-10-28');
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-29');
INSERT INTO Rain (status, time, date) VALUES (0, '00:00:00', '2024-10-30');
INSERT INTO Rain (status, time, date) VALUES (1, '00:00:00', '2024-10-31');