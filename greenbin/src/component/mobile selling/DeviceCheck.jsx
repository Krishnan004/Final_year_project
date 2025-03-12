import React, { useState, useContext, useEffect } from 'react';
import "../../css/mobile selling/DeviceCheck.css";
import { Context } from '../../context/Context';

const DeviceCheck = () => {
    const { setScreen, handleSellingDetail } = useContext(Context);

    // Initialize state to keep track of selected options for each question.
    const [selectedOption, setSelectedOption] = useState([
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
    ]);

    // Error state to track validation
    const [error, setError] = useState('');

    const handleChange = (e, index) => {
        const { value, name } = e.target;

        // Update the selling details in context when "no" is selected
        if (value === "no") {
            handleSellingDetail(name, false);
        }

        // Update the state to track the selected option
        setSelectedOption((prev) =>
            prev.map((option) =>
                option.id === index
                    ? { ...option, value }
                    : option
            )
        );

        // Update the selling details based on the selected value
        handleSellingDetail(name, value === 'yes'); // Assuming "yes" means true
    };

    const handleContinue = () => {
        // Check if all questions are answered
        const isAllAnswered = selectedOption.every(option => option.value !== '');
        if (!isAllAnswered) {
            setError('Please answer all the questions before continuing.');
        } else {
            setError('');
            setScreen(2); // Continue to the next screen
        }
    };

    useEffect(() => {
        return () => {
            console.log("DeviceCheck component is unmounting...");
            // Perform any cleanup or function call here
        };
    }, []);

    return (
        <div className="device_check">
            <div className="head_sec">
                <h1 className="head">Tell us more about your device?</h1>
                <p className="discription">Please answer a few questions about your device.</p>
            </div>

            {/* Question 1 */}
            <fieldset className="question_sec">
                <label htmlFor="callCheck1">1. Are you able to make and receive calls?</label>
                <p className="discription">Check your device for cellular network connectivity issues.</p>
                <div className="radio">
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckYes1"
                            name="call_ability"
                            value="yes"
                            checked={selectedOption[0].value === 'yes'}
                            onChange={(e) => handleChange(e, 1)}
                        />
                        <p>Yes</p>
                    </div>
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckNo1"
                            name="call_ability"
                            value="no"
                            checked={selectedOption[0].value === 'no'}
                            onChange={(e) => handleChange(e, 1)}
                        />
                        <p>No</p>
                    </div>
                </div>
            </fieldset>

            {/* Question 2 */}
            <fieldset className="question_sec">
                <label htmlFor="callCheck2">2. Is your device's touch screen working properly?</label>
                <p className="discription">Check the touch screen functionality of your phone.</p>
                <div className="radio">
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckYes2"
                            name="touchscreen_working"
                            value="yes"
                            checked={selectedOption[1].value === 'yes'}
                            onChange={(e) => handleChange(e, 2)}
                        />
                        <p>Yes</p>
                    </div>
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckNo2"
                            name="touchscreen_working"
                            value="no"
                            checked={selectedOption[1].value === 'no'}
                            onChange={(e) => handleChange(e, 2)}
                        />
                        <p>No</p>
                    </div>
                </div>
            </fieldset>

            {/* Question 3 */}
            <fieldset className="question_sec">
                <label htmlFor="callCheck3">3. Is your phone's screen original?</label>
                <p className="discription">Pick "Yes" if screen was never changed or was changed by Authorized Service Center. Pick "No" if screen was changed at a local shop.</p>
                <div className="radio">
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckYes3"
                            name="original_screen"
                            value="yes"
                            checked={selectedOption[2].value === 'yes'}
                            onChange={(e) => handleChange(e, 3)}
                        />
                        <p>Yes</p>
                    </div>
                    <div className="radio_div">
                        <input
                            type="radio"
                            id="callCheckNo3"
                            name="original_screen"
                            value="no"
                            checked={selectedOption[2].value === 'no'}
                            onChange={(e) => handleChange(e, 3)}
                        />
                        <p>No</p>
                    </div>
                </div>
            </fieldset>

            {/* Display error message if validation fails */}
            {error && <div className="error_message">{error}</div>}

            <div className="btn_sec">
                <button className="btn" onClick={handleContinue}>Continue →</button>
            </div>
        </div>
    );
};

export default DeviceCheck;
