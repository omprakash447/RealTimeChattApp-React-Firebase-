import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Firebase';

function Navbar() {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className='navbar'>
            <span className='logo'>Apna Chatt</span>
                <div className="user">
                    <img src={currentUser.photoURL} alt="User Avatar" />
                    <span>{currentUser.displayname}</span>
                    <button onClick={()=>signOut(auth)}>Log out</button>
                </div>
        </div>
    );
}

export default Navbar;

