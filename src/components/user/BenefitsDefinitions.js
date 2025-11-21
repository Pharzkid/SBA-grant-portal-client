import React from 'react';

const BenefitsDefinitions = () => {
    const grantBenefits = [
        {
            title: "No Repayment",
            points: [
                "Unlike loans, you don't pay back the money.",
                "No interest, no deadlines, no bank pressure."
            ]
        },
        {
            title: "Helps Start or Grow a Business",
            points: [
                "Start a small business",
                "Buy equipment",
                "Build a website",
                "Pay for marketing",
                "Expand operations"
            ]
        },
        {
            title: "Increases Credibility",
            points: [
                "Getting approved for a grant can make your business look more trustworthy.",
                "It can help you qualify for more funding later."
            ]
        }
    ];

    const definitions = [
        {
            term: "Grant",
            def: "Funds given by one entity to an individual or business for a specific purpose, which do not need to be repaid."
        },
        {
            term: "Portal",
            def: "A secure, web-based platform that allows you to log in, view your application status, manage your personal information, and receive notifications."
        },
        {
            term: "Direct Deposit",
            def: "An electronic transfer of funds directly into your designated bank account, often used for quick and secure payment of funds like a grant."
        }
    ];

    return (
        <div className="benefits-definitions-container">
            <div className="grant-benefits-card card">
                <h3>Grant Benefits</h3>
                {grantBenefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                        <h4>{`${index + 1}. ${benefit.title}`}</h4>
                        <ul>
                            {benefit.points.map((point, pIndex) => (
                                <li key={pIndex}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="key-definitions-card card">
                <h3>Key Definitions</h3>
                {definitions.map((item, index) => (
                    <div key={index} className="definition-item">
                        <h4>{item.term}</h4>
                        <p>{item.def}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BenefitsDefinitions;