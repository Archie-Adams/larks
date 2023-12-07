import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';


import canopy_logo from "./logos/canopy.png";
import dipstik_logo from "./logos/dipstik.png";
import paralysis_analysis_logo from "./logos/paralysis-analysis.png";
import tonsillitis_detector_logo from "./logos/tonsillitis-detector.png";
import roots_radar_logo from "./logos/roots-radar.png";
import skinscan_logo from "./logos/skinscan.png";
import ease_mind_logo from "./logos/ease-mind.png";
import autism_detector_logo from "./logos/autism-detector.png";
import chatbot_logo from "./logos/chatbot.png"

import depressiLess_logo from "./logos/depressiLess-logo.png"

import homeImage from "../../images/home.png";

import homeImage from "../../images/home.png";
import DepressiLess_logo from "./logos/DepressiLess-logo.png"

import canopyLogo from './logos/canopy.png';
import dipstikLogo from './logos/dipstik.png';
import paralysisAnalysisLogo from './logos/paralysis-analysis.png';
import tonsillitisDetectorLogo from './logos/tonsillitis-detector.png';
import rootsRadarLogo from './logos/roots-radar.png';
import skinscanLogo from './logos/skinscan.png';
import easeMindLogo from './logos/ease-mind.png';
import autismDetectorLogo from './logos/autism-detector.png';
import chatbotLogo from './logos/chatbot.png';
import depressiLessLogo from './logos/depressiLess-logo.png';

import homeImage from '../../images/home.png';


interface IAppLink {
  to: string;
  logo: string;
  alt: string;
  slogan: string;
}

function AppLink({
  to, logo, alt, slogan,
}: IAppLink) {
  const [showSlogan, setShowSlogan] = useState(false);

  return (
    <Link
      className="app-link"
      to={to}
      onMouseEnter={() => setShowSlogan(true)}
      onMouseLeave={() => setShowSlogan(false)}
    >
      <div className="logo-container">
        <img src={logo} alt={alt} />
        {showSlogan && <div className="slogan-container">{slogan}</div>}
      </div>
    </Link>
  );
}

function Home() {
  const appLinks: IAppLink[] = [
    {
      to: '/canopy',
      logo: canopyLogo,
      alt: 'Canopy_App_Alex',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/skin-scan',
      logo: skinscanLogo,
      alt: 'Skin-Scan_App_Kevin',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/dipstik',
      logo: dipstikLogo,
      alt: 'Dipstik_App_Lanre',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/paralysis-analysis',
      logo: paralysisAnalysisLogo,
      alt: 'Stroke_App_Ramat',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/shreyas/tonsillitis_instructions',
      logo: tonsillitisDetectorLogo,
      alt: 'Tonsilitis_App_Shreyas',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/roots-radar',
      logo: rootsRadarLogo,
      alt: 'Roots Radar App',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/EaseMind',
      logo: easeMindLogo,
      alt: 'EaseMind App',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/autism_instructions',
      logo: autismDetectorLogo,
      alt: 'Autism_App',
      slogan: 'Always Unique Totally Intelligent Sometimes Mysterious',
    },
    {
      to: '/food_allergy_chatbot',
      logo: chatbotLogo,
      alt: 'chatbotLogo',
      slogan: 'Empowering healthcare solutions.',
    },
    {
      to: '/DepressiLess',
      logo: depressiLessLogo,
      alt: 'DepressiLess App',
      slogan: 'Be less depressed!',
    },
  ];

  return (
    <div className="home">
      <div className="app-links-container">
        {appLinks.map((app) => (
          <AppLink
            key={app.to}
            to={app.to}
            logo={app.logo}
            alt={app.alt}
            slogan={app.slogan}
          />
        ))}
      </div>
      <img src={homeImage} alt="home" className="home-image" />
    </div>
  );
}

export default Home;
