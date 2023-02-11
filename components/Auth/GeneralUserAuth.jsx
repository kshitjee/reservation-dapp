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
        fetch("http://localhost:5001/api/students/login", { method: "POST", body: JSON.stringify(studentData), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
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
        fetch("http://localhost:5001/api/students/signup", { method: "POST", body: JSON.stringify(studentData), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
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


    const [studentData, setStudentData] = useState({
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
            <h1 className="header">Student</h1>
            <button onClick={() => exitButton()} className='exitButton'>Exit</button>
            <form autoComplete="off" validate="true" className="form">
                <div >
                    <div className="projectHolder">
                        <h1 className="header" >{logIn ? "Log In" : "Sign Up"}</h1>
                        {logIn && (
                            <>
                               
                            </>
                        )}
                        {!logIn && (
                            <>

                            </>
                        )}
                        <button className="changeMode" onClick={changeMode}>{!logIn ? "Log In Instead" : "Sign Up instead"}</button>
                    </div>
                  </div>
            </form>
        </div>
    )
}