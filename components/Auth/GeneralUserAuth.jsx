import React, { useState } from "react";
import "./auth.css"
import { useNavigate } from "react-router-dom";


export default function GeneralUserAuth() {
    const [isError, changeIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [logIn, changeLogIn] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (logIn) {
            sendLogIn()
        }
        else {
            sendSignUp()
        }

    }
    const sendLogIn = (e) => {
        fetch("http://localhost:5001/api/generalusers/login", { method: "POST", body: JSON.stringify(userData), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
            .then(res => {
                return res.json()
            })
            .then(data => {
                changeIsError(false)
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
            .catch(e => {
                console.log(e)
                console.log("Error Message Here")
                setErrorMessage("Error: Invalid Credentials")
                changeIsError(true)
            })
    }

    const sendSignUp = (e) => {
        fetch("http://localhost:5001/api/generalusers/signup", { method: "POST", body: JSON.stringify(userData), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
            .then(res => {
                return res.json();
            })
            .then(data => {
                changeIsError(false)
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
            .catch(e => {
                console.log(e)
                setErrorMessage("Error: Invalid Credentials")
                changeIsError(true)
            })
    }

    const changeMode = (event) => {
        event.preventDefault();;
        changeLogIn(!logIn);
    }


    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const exitButton = (e) => {
        window.location.reload(true);
        console.log("Hello")
    }

    return (
        <div className="authPage">
        </div>
    )
}