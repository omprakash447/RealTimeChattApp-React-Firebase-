import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from '../Firebase';

const Register = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handelsubmit = async (e) => {
        e.preventDefault();
        const displayname = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayname);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress function can be implemented here if needed
                },
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayname,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayname,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );
        } catch (error) {
            setError(true);
        }
    }

    return (
        <div className="Formcontainer">
            <div className="Formwrapper">
                <span className='logo'>Apna Chatt</span>
                <span className='title'>Register</span>
                <form onSubmit={handelsubmit}>
                    <input type="text" placeholder='Display Name...' />
                    <input type="email" placeholder='Email...' />
                    <input type="password" placeholder='Password...' />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor="file">
                        <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Img icon" style={{ height: "40px" }} />
                        <span>Add an image</span>
                    </label>
                    <button>Sign Up</button>
                    {error && <span>Something Went wrong</span>}
                </form>
                <p>do u have an account ? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;

