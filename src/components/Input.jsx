import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { v4 as uuid } from "uuid";
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { db, storage } from '../Firebase';

const Input = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress function can be implemented here if needed
                },
                (error) => {
                    // setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db,"chats",data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db,"chats",data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }


        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },
            [data.chatId+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },
            [data.chatId+".date"]:serverTimestamp()
        });

        setText("")
        setImg(null)
    }

    return (
        <div className='input'>
            <input
                type="text"
                placeholder='Type something...'
                onChange={e => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <img
                    src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3255464/message-dots-icon-md.png"
                    alt="Send"
                />
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={e => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img
                        src="https://cdn2.iconfinder.com/data/icons/viiva-content-editor/32/image-1024.png"
                        alt="Add Image"
                    />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;