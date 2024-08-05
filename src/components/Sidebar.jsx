import React from 'react';
import Charts from './Charts';
import Navbar from './Navbar';
import Search from './Search';

function Sidebar() {
    return (
        <div className='sidebar'>
            <Navbar />
            <Search />
            <Charts />

        </div>
    );
};

export default Sidebar;
