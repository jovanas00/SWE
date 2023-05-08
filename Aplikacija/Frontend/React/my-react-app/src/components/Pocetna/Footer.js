import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div >
            <hr />
                <p className="footer-copyright">
                   @{new Date().getFullYear()} All rights reserved. 
                </p>
            </div>
        </div>
    );
}

export default Footer;