// src/Pages/acknowledgement/acknowledgement.jsx

import React from 'react';
import './style.css';
import ssImage from '../../../images/ss.png';

const Acknowledgement = () => {
  return (
    <div className="container">
      <h1 className="heading">Acknowledgment</h1>
      <img
        src={ssImage}
        alt="Dr. Shashank Srivastava"
        className="image"
      />
      <p className="text">
        We are  deeply grateful to <strong>Dr. Shashank Srivastava sir</strong> for his invaluable guidance,
        unwavering support, and inspiring mentorship throughout this project. His profound
        expertise in Artificial Intelligence and Machine Learning has been a constant source of
        motivation. Under his mentorship, We gained not just technical skills, but also a disciplined
        and research-oriented mindset that greatly enriched this project.
      </p>

      <p>We are also highly thankful to <b>Abhishek Kant Sir</b> and <b>Md.Haseeb sir</b> for their guidance.</p>
    </div>
  );
};

export default Acknowledgement;
