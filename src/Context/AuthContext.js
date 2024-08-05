import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Use `null` as the initial state

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => {
            unsub();
        };
    }, []); // Empty dependency array

    return ( <
        AuthContext.Provider value = {
            { currentUser }
        } > { children } <
        /AuthContext.Provider>
    );
};