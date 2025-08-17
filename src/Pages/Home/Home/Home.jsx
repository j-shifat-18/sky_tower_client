import React from 'react';
import Banner from '../Banner/Banner';
import CouponShowcase from '../CouponShowcase/CouponShowcase';
import AboutSkyTower from '../AboutSkyTower/AboutSkyTower';
import SkyTowerLocation from '../SkyTowerLocation/SkyTowerLocation';
import Testimonial from '../Testimonial/Testimonial';
import FAQ from '../FAQ/FAQ';
import TeamSection from '../TeamSection/TeamSection';
import Features from '../Features/Features';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSkyTower></AboutSkyTower>
            <Features></Features>
            <CouponShowcase></CouponShowcase>
            <Testimonial></Testimonial>
            <SkyTowerLocation></SkyTowerLocation>
            <FAQ></FAQ>
            <TeamSection></TeamSection>
        </div>
    );
};

export default Home;