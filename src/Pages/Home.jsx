import React from 'react';
import Chatt from '../components/Chatt';
import Sidebar from '../components/Sidebar';


function Home() {
    return (
        <div className='Home'>
            <div className="container">
                <Sidebar />
                <Chatt />
            </div>
        </div>
    )
}

export default Home;
