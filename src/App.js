import { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { AuthContext } from "./Context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./Styles/style.scss";

function App() {

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    const ProtectedRout = ({ children }) => {
        if (!currentUser) {
            return <Navigate to = "/login" / >
        }
        return children;
    };

    return ( <
        div className = "App" >
        <
        Router >
        <
        Routes >
        <
        Route path = "/" >
        <
        Route index element = { <
            ProtectedRout >
            <
            Home / >
            <
            /ProtectedRout>} / >
            <
            Route path = "Login"
            element = { < Login / > }
            /> <
            Route path = "Register"
            element = { < Register / > }
            /> <
            /Route > <
            /Routes> <
            /Router> <
            /div>
        );
    }

    export default App;