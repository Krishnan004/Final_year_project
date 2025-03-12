import React, { useState, useContext } from "react";
import "../../css/mobile selling/screencheck.css";
import { Context } from "../../context/Context";

const FunctionalCheck = () => {
    const { setScreen, handleSellingDetail } = useContext(Context);
    const [sellingProductDetails, setSellingProductDetails] = useState({
        call_ability: true,
        touchscreen_working: true,
        original_screen: true,
        no_broken_screen: true,
        no_dead_spot: true,
        no_scratch_dent: true,
        no_panel_missing: true,
        front_camera_working: true,
        back_camera_working: true,
        volume_button_working: true,
        wifi_working: true,
        finger_touch_working: true,
        battery_service: true,
        battery_health_80_85: true,
        no_speaker_faulty: true,
        charging_port_working: true,
        power_button_working: true,
        face_sensor_working: true,
        silent_button_working: true,
        audio_receiver_working: true,
        no_camera_glass_broken: true,
        bluetooth_working: true,
        vibrator_working: true,
        microphone_working: true,
        proximity_sensor_working: true,
    });

    const conditions = [
        { key: "front_camera_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2440e1d4b31.jpg?p=default&s=lg", description: "Front Camera not working" },
        { key: "back_camera_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2441a16cca9.jpg?p=default&s=lg", description: "Back Camera not working" },
        { key: "volume_button_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2443731c3db.jpg?p=default&s=lg", description: "Volume Button not working" },
        { key: "wifi_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2442d22fa49.jpg?p=default&s=lg", description: "WiFi not working" },
        { key: "finger_touch_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2444092bce8.jpg?p=default&s=lg", description: "Finger Touch not working" },
        { key: "battery_service", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244621b86f8.jpg?p=default&s=lg", description: "Battery in Service (Health is less than 80%)" },
        { key: "battery_health_80_85", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/Battery_faulty_or__not_working.jpg?p=default&s=lg", description: "Battery Health 80-85%" },
        { key: "no_speaker_faulty", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244674ced62.jpg?p=default&s=lg", description: "Speaker Faulty" },
        { key: "charging_port_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d24486306b57.jpg?p=default&s=lg", description: "Charging Port not working" },
        { key: "power_button_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244762197f4.jpg?p=default&s=lg", description: "Power Button not working" },
        { key: "face_sensor_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d2448e9ec9d0.jpg?p=default&s=lg", description: "Face Sensor not working" },
        { key: "silent_button_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5df0e69829e5c.png?p=default&s=lg", description: "Silent Button not working" },
        { key: "audio_receiver_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5dfb2607b7889.png?p=default&s=lg", description: "Audio Receiver not working" },
        { key: "no_camera_glass_broken", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5f868584a1a09.png?p=default&s=lg", description: "Camera Glass Broken" },
        { key: "bluetooth_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/6023a363ad07d.png?p=default&s=lg", description: "Bluetooth not working" },
        { key: "vibrator_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/6023a3a6f00e2.png?p=default&s=lg", description: "Vibrator is not working" },
        { key: "microphone_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/6023a3ef18975.png?p=default&s=lg", description: "Microphone not working" },
        { key: "proximity_sensor_working", image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/6023a5bda784d.png?p=default&s=lg", description: "Proximity Sensor not working" }
    ];

    const handleSelect = (key) => {
        setSellingProductDetails(prevState => ({
            ...prevState,
            [key]: !prevState[key] // Toggle the value
        }));
        handleSellingDetail(key, !sellingProductDetails[key]);
    };

    return (
        <div className="screencheck">
            <h1>Select screen/body defects that are applicable!</h1>
            <p className="description">Please provide correct details</p>
            <div className="device_condition">
                {conditions.map((item) => (
                    <div
                        className={`condition_item ${!sellingProductDetails[item.key] ? "selected" : ""}`}
                        key={item.key}
                        onClick={() => handleSelect(item.key)}
                    >
                        <img src={item.image} alt="Device Condition" />
                        <div className={`discription_sec ${!sellingProductDetails[item.key] ? "active" : ""}`}>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_button">
                <button onClick={() => setScreen(4)}>Continue</button>
            </div>
        </div>
    );
};

export default FunctionalCheck;
