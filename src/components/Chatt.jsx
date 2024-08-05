import React, { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import Input from './Input';
import Messages from './Messages';

function Chatt() {


    const {data}=useContext(ChatContext);

    return (
        <div className='chatt'>
            <div className="chattinfo">
                <span>{data.user?.displayname}</span>
                <div className="chatticons">
                    <img src="https://purepng.com/public/uploads/large/purepng.com-camera-iconsymbolsiconsapple-iosiosios-8-iconsios-8-72152259602494tzv.png" alt="" />
                    <img src="https://th.bing.com/th/id/R.7d1eeb9a0b22fbbb9c99dbfbdad26915?rik=jIEtId79tVIW1w&riu=http%3a%2f%2ffiles.softicons.com%2fdownload%2fsocial-media-icons%2ffree-social-media-icons-by-aha-soft%2fpng%2f512x512%2fUser.png&ehk=lIKGnne%2biYXsJOk4mL2x9UH6WuAyrpFtmUPfXaqHm2s%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <img src="https://th.bing.com/th/id/OIP.7EXRDq4_gJF08EQPD-nS6AHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chatt;
