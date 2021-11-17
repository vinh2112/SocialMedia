import React from 'react';
import Home from 'components/HomePage';
const HomePage = (toggle,isOpen) => {
    console.log(isOpen)
    return (
        <Home toggle={toggle} isOpen={isOpen} />
    );
}

export default HomePage
