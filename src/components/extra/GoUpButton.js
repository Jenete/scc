// src/components/GoUpButton.js
import React, { useEffect } from 'react';
import './styles/GoUpButton.css';

const GoUpButton = () => {
    useEffect(() => {
        const goUpButton = document.getElementById('go-up-btn');

        const handleScroll = () => {
            if (window.scrollY > 300) { // Change 300 to the scroll position where you want the button to appear
                goUpButton.classList.add('visible');
            } else {
                goUpButton.classList.remove('visible');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', handleScroll);
        goUpButton.addEventListener('click', scrollToTop);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            goUpButton.removeEventListener('click', scrollToTop);
        };
    }, []);

    return (
        <button id="go-up-btn" className="go-up-button">
           <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
        </button>
    );
};

export default GoUpButton;
