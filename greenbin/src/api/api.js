import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8000"  // Make sure it's 'baseURL' (case-sensitive)
});

 
