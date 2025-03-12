import React, { createContext, useState, useMemo, useEffect, useCallback } from 'react';
import api from "../api/api";

export const Context = createContext();

export const ContextProvider = (props) => {
    const [mobiles, setMobiles] = useState([]);
    const [brand, setBrand] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(false); // State for loading
    const [screen, setScreen] = useState(1);
    const [orderId, setOrderId] = useState();
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);  // For admin

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
        phone_box: true,
        original_charger: true
    });

    // Fetch mobiles based on the selected brand
    const fetchMobiles = useCallback(async (brand) => {
        setLoading(true);
        try {
            const response = await api.get(`/mobile`, { params: { brand } });
            setMobiles(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching mobiles:", error);
            setError("Failed to load mobiles.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSellingDetail = (input, value) => {
        setSellingProductDetails(prevState => ({
            ...prevState,
            [input]: value, // Example: User can make/receive calls
        }));
    };

    const addSellingDetails = async (id, email) => {
        setLoading(true);
        try {
            const response = await api.post("/selling", {
                product_id: id,
                user_email: email,
                // Include any other required details
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error adding selling details", error);
            setError("Failed to add selling details.");
        } finally {
            setLoading(false);
        }
    };

    // Get a mobile by ID
    const GetMobileById = useCallback((id) => {
        if (!Array.isArray(mobiles) || mobiles.length === 0) {
            console.warn("Mobiles list is empty or undefined");
            return null;
        }
        return mobiles.find((mobile) => String(mobile.id) === String(id)) || null;
    }, [mobiles]);

    // Fetch list of brands
    const fetchBrand = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/mobile/brand");
            setBrand(response.data);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch brand:", error);
            setError("Failed to load brands.");
        } finally {
            setLoading(false);
        }
    }, []);

    const createSellingProductDetails = async () => {
        setLoading(true); // Set loading state to true while making the request
        try {
            const response = await api.post('/selling', {
                user_id: user.user_id,  // Accessing user_id from state
                user_email: user.user_email,  // Accessing user_email from state
                ...sellingProductDetails,  // Spread the product details
            });
            console.log(response.data.message); // Log the success message
            setOrderId(response.data.id);
            console.log(response.data);
        } catch (error) {
            console.error("Error creating product details", error);
            setError("Failed to create selling product details."); // Set error message
        } finally {
            setLoading(false); // Set loading state to false after the request
        }
    };


   

    // Function to log in the user
    const handleLogin = async (emailid, password) => {
        try {
            const response = await api.post("/userauth/login", { emailid, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                setUser({
                    user_id: response.data.userId,
                    user_email: emailid
                });

                console.log("Login Successful:", response.data.userId);
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };

    // Function to sign up the user
    const handleSignUp = async (username, emailid, password) => {
        try {
            const response = await api.post("/userauth/signup", { username, emailid, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            console.log("Signup successful:", response.data);
        } catch (error) {
            console.error("Signup failed:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Signup failed.");
        }
    };

    const checkUserAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const response = await api.get("/userauth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.user) {
                setUser({
                    user_id: response.data.user.id,
                    user_email: response.data.user.emailid
                });
            } else {
                handleLogout(); // Log user out if invalid
            }
        } catch (error) {
            console.error("User Authentication failed:", error);
            handleLogout();
        }
    };

    // Admin authentication check
    const checkAdminAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setAdmin(null);
            return;
        }

        try {
            const response = await api.get("/adminauth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.admin) {
                setAdmin({
                    admin_id: response.data.admin.id,
                    admin_email: response.data.admin.email
                });
            } else {
                handleLogout(); // Log admin out if invalid
            }
        } catch (error) {
            console.error("Admin Authentication failed:", error);
            handleLogout();
        }
    };

    // Common logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setAdmin(null);
        api.defaults.headers.common["Authorization"] = "";
    };

    

    // Admin login handler
    const handleAdminLogin = async (email, password) => {
        try {
            const response = await api.post("/adminauth/login", { email, password });
    
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    
                setAdmin({
                    admin_id: response.data.adminId, // Fixed: Correctly assigning adminId
                    admin_email: email
                });
    
                console.log("Admin Login Successful:", response.data.adminId);
            }
        } catch (error) {
            console.error("Admin Login failed:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };
    

    // Admin signup handler
    const handleAdminSignUp = async (name, email, password) => {
        try {
            const response = await api.post("/adminauth/signup", { name, email, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            console.log("Admin Signup successful:", response.data);
        } catch (error) {
            console.error("Admin Signup failed:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Signup failed.");
        }
    };

    useEffect(() => {
        checkUserAuth(); // For user
        checkAdminAuth(); // For admin
    }, []);

    const postAddressDetails = async (addressData) => {
        setLoading(true);
        try {
            const response = await api.post('/selling/address', {
                userid: user.user_id,
                order_id: orderId,
                ...addressData, // spread all the address data passed as argument
            });
            console.log("Address added successfully:", response.data);
            // Optionally reset form, store response, etc.
        } catch (error) {
            console.error("Error posting address details:", error);
            setError("Failed to add address details.");
        } finally {
            setLoading(false);
        }
    };

    const addEwastedetails = async (ewasteDetails) => {
        setLoading(true); // Set loading to true while making the request
        try {
            const response = await api.post('/ewaste', {
                userid: user.user_id, // Accessing user_id from state
                ...ewasteDetails // Spread the e-waste details provided by the user
            });
            console.log("E-waste details added successfully:", response.data);
        } catch (error) {
            console.error("Error adding e-waste details", error);
            setError("Failed to add e-waste details."); // Set an error message
        } finally {
            setLoading(false); // Set loading to false after the request
        }
    };
    
    

    // Fetch brands on mount
    useEffect(() => {
        fetchBrand();
    }, [fetchBrand]);

    // Fetch mobiles when brand changes
    useEffect(() => {
        if (brand.length > 0) {
            fetchMobiles(brand[0]); // Fetch mobiles for the first brand by default
        }
    }, [brand, fetchMobiles]);

    const ContextValue = useMemo(() => ({
        mobiles,
        brand,
        user,
        admin,
        handleAdminLogin,
        handleAdminSignUp,
        orderId,        
        screen,
        error,
        loading,
        sellingProductDetails,
        fetchMobiles,
        fetchBrand,
        GetMobileById,
        setScreen,
        setUser,
        setOrderId,
        setError,
        handleSellingDetail,
        createSellingProductDetails,
        addSellingDetails,
        handleSignUp,
        handleLogin,
        postAddressDetails,
        addEwastedetails,
        setLoading,
        setSellingProductDetails,
    }), [
        mobiles, brand, user, orderId, screen, error, loading, sellingProductDetails, admin
    ]);
    

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};
