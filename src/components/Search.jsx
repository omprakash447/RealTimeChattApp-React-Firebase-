import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Firebase';

function Search() {
    const [username , setusername]=useState("");
    const [user , setuser]=useState(null);
    const [error , seterror]=useState(false);




    const {currentUser} =useContext(AuthContext);



    const handelsearch= async ()=>{
        const q=query(
            collection(db , "users"),
            where("displayname","==",username)
        );

        try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setuser(doc.data())
        });

    }
    catch(err){
        seterror(true);

    }


    }
    const handelkey=(e)=>{
        e.code==="Enter" && handelsearch();
    }

    const handelselect= async ()=>{
        // check wheather the group is exist or not if not create one
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(db,"chats", combinedId));

            if(!res.exists()){
                // create chatts
                await setDoc(doc(db,"chats", combinedId),{messages:[]})
                // create userchats
                await updateDoc(doc(db,"userChats",currentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid:user.uid,
                        displayname:user.displayname,
                        photoURL:user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                });
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayname:currentUser.displayname,
                        photoURL:currentUser.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                });
            }
        }
        catch(error){
            seterror(true);
        }

        setuser(null);
        setusername("");
    }
    return(
        <div className='search'>
            <div className="searchform">
                <input type="text"
                name=""
                id=""
                placeholder='Find user...'
                onKeyDown={handelkey}
                onChange={e=>setusername(e.target.value)}
                value={username}
                />
            </div>
            {error && <span>User Not Found!</span>}
            {user && <div className="userchatt" onClick={handelselect}>
                <img src={user.photoURL} alt="image" />
                <div className="userchattinfo">
                    <span>{user.displayname}</span>
                </div>
            </div>}

        </div>
    )
}

export default Search;
