import axios from 'axios'
import { useState } from "react";
// import { useSelector } from "react-redux";

function useApi() {
    // let { token } = useSelector((s) => s.user)
    let [token] = useState(localStorage.getItem("token").split("|")[1])
    token = token != '' ? token : ''
    const [request] = useState({
        // baseURL: process.env.REACT_APP_API_URL || '',
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    // console.log(request)
    return axios.create(request)
}

export default useApi