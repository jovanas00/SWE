import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div >
            <hr />
                <p classname="footer-copyright">
                   @{new Date().getFullYear()} All rights reserved. 
                </p>
            </div>
        </div>
    );
}

export default Footer;