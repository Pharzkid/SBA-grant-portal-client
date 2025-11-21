import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    // Links provided by the user
    const facebookLink = "https://www.facebook.com/share/1DFCkVqQCJ/?mibextid=wwXIfr";
    const instagramLink = "https://www.instagram.com/itzmevirdi?igsh=ZnRxYml2cjl3MTcy";
    const contactNumber = "+1-618-701-2773";

    return (
        <footer className="app-footer">
            <div className="footer-content">
                
                <div className="footer-logo">
                    <img src="/sba_logo_small.png" alt="SBA Logo" />
                </div>

                <div className="footer-contact">
                    <p>Questions? We're here to help.</p>
                    <p>Call us at: <a href={`tel:${contactNumber}`}>{contactNumber}</a></p>
                </div>

                <div className="footer-social">
                    <a href={facebookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook size={24} className="social-icon" />
                    </a>
                    <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram size={24} className="social-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;