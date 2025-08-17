import React from 'react';
import Banner from '../Banner/Banner';
import CouponShowcase from '../CouponShowcase/CouponShowcase';
import AboutSkyTower from '../AboutSkyTower/AboutSkyTower';
import SkyTowerLocation from '../SkyTowerLocation/SkyTowerLocation';
import Testimonial from '../Testimonial/Testimonial';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSkyTower></AboutSkyTower>
            <SkyTowerLocation></SkyTowerLocation>
            <CouponShowcase></CouponShowcase>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;