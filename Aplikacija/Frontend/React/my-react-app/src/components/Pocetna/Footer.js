import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <hr />
                <div className="footer-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="footer-icon" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="footer-icon" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="footer-icon" />
                    </a>
                </div>
                <p className="footer-copyright">
                    @{new Date().getFullYear()} AJD Team.
                </p>
            </div>
        </div>
    );
}

export default Footer;
