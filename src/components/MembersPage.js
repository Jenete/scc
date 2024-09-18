import React from 'react';
import "./styles/MembersPage.css";
import MembersView from './member/MembersView';

const MembersPage = () => {
    const users = [
        {name: 'Mr Lukhaya', cellnumber: '+27735534588' },
        {name: 'Ms Yonela', cellnumber: '+27840210162' },
        {name: 'Mr Njongo', cellnumber: '+27694453487' },
        {name: 'Pastor Luvo', cellnumber: '+27735745803' },
        {name: 'Mrs Bianca', cellnumber: '+27682381933' },
    ];

    const generateContactLink = (cellnumber) => {
        return "https://wa.me/" + cellnumber; // WhatsApp link format
    };

    return (
        <div className="members-container">
            <MembersView/>
        </div>
    );
};

export default MembersPage;
