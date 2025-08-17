import React from 'react';
import Banner from '../Banner/Banner';
import CouponShowcase from '../CouponShowcase/CouponShowcase';
import AboutSkyTower from '../AboutSkyTower/AboutSkyTower';
import SkyTowerLocation from '../SkyTowerLocation/SkyTowerLocation';
import Testimonial from '../Testimonial/Testimonial';
import FAQ from '../FAQ/FAQ';
import TeamSection from '../TeamSection/TeamSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSkyTower></AboutSkyTower>
            <SkyTowerLocation></SkyTowerLocation>
            <TeamSection></TeamSection>
            <CouponShowcase></CouponShowcase>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;