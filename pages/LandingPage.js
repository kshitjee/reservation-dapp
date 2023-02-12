import React, { useState } from 'react';
import IntroSlide from '../components/IntroSlide';
import Abstract from '../components/Abstract';
import HowitWorks from '../components/HowitWorks';
import { css } from '@emotion/react'


const LandingPage = () => {


    return (

        <div className='custom-img'>
            <IntroSlide />
            <Abstract />
            <HowitWorks />
        </div>
    );
};

export default LandingPage;
