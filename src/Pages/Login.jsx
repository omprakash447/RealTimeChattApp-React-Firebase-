import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";


function Login() {
    const [error, seterror] = useState(false);
    const navigate=useNavigate();

    const handelsubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
            await signInWithEmailAndPassword(auth , email ,password)
            navigate("/");
        }
        catch (error) {
            seterror(true);
        }


    }
    return (
        <div className="Formcontainer">
        <div className="Formwrapper">
            <span className='logo'>Apna Chatt</span>
            <span className='title'>Login</span>
            <form onSubmit={handelsubmit}>
                <input type="email" placeholder='Email...'/>
                <input type="password" placeholder='Password...'/>
                <button>Sign In</button>
                {error && <span>Something Went wrong</span>}
            </form>
            <p>U don't have an account ? <Link to="/register">Register</Link></p>
        </div>
    </div>
    )
}

export default Login;
