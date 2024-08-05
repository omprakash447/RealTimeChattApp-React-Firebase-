import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../Firebase';
import Message from "./Message";

function Messages() {

    const {data}=useContext(ChatContext);
    const [messages,setmessages]=useState([]);

    useEffect(()=>{
        const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists() && setmessages(doc.data().messages);
        });
        return () => {
            unsub();
        };
    },[data.chatId]);

    console.log(messages);
    
    

    return (
        <div className='messages'>
            {
                messages.map((m) => (
                    <Message message={m} key={m.id}/>
                ))
            }
        </div>
    );
}

export default Messages;
