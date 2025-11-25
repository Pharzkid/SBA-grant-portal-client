import React from 'react';
import { FaInstagram} from 'react-icons/fa';
import { FaXTwitter} from 'react-icons/fa6'

const Footer = () => {
    // Links provided by the user
    const xLink = "https://x.com/sbagrantportal?s=21";
    const instagramLink = "https://www.instagram.com/sbagrantportal?igsh=ZnRxYml2cjl3MTcy";
    const contactNumber = "+1-618-701-2773";

    return (
        <footer className="app-footer">
            <div className="footer-content">
                
                <div className="footer-logo">
                    <img src="/sba_logo_small.png" alt="SBA Logo" />
                </div>

                <div className="footer-contact">
                    <p>Questions? We're here to help.</p>
                    <p>Text us at: <a href={`tel:${contactNumber}`}>{contactNumber}</a></p>
                </div>

                <div className="footer-social">
                    <a href={xLink} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaXTwitter size={24} className="social-icon" />
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