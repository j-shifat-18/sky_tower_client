import React from 'react';
import Banner from '../Banner/Banner';
import CouponShowcase from '../CouponShowcase/CouponShowcase';
import AboutSkyTower from '../AboutSkyTower/AboutSkyTower';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSkyTower></AboutSkyTower>
            <CouponShowcase></CouponShowcase>
        </div>
    );
};

export default Home;