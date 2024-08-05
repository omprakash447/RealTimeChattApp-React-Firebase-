import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

function Message({ message }) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageinfo">
                <img src={
                    message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
                } alt="" />
                <span>Just now</span>
            </div>
            <div className="messagecontent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="img" />}

            </div>

        </div>
    )
}

export default Message;