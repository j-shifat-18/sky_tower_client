import React from 'react';
import Banner from '../Banner/Banner';
import CouponShowcase from '../CouponShowcase/CouponShowcase';
import AboutSkyTower from '../AboutSkyTower/AboutSkyTower';
import SkyTowerLocation from '../SkyTowerLocation/SkyTowerLocation';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSkyTower></AboutSkyTower>
            <SkyTowerLocation></SkyTowerLocation>
            <CouponShowcase></CouponShowcase>
        </div>
    );
};

export default Home;