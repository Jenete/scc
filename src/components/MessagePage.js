import React from 'react';
import "./styles/MessagePage.css";

const MessagePage = ({ messageText, messageType }) => {
    const getEmoji = () => {
        switch (messageType) {
            case 0: // CONFIRMATION
                return '✅';
            case 1: // SUCCESS
                return '🎉';
            case 2: // ERROR
                return '❌';
            case 3: // LOADING
                return '⏳';
            case 4: // WARNING
                return '⚠️';
            default:
                return 'ℹ️';
        }
    };

    const getMessageStyle = () => {
        switch (messageType) {
            case 0: // CONFIRMATION
                return 'confirmation-message';
            case 1: // SUCCESS
                return 'success-message';
            case 2: // ERROR
                return 'error-message';
            case 3: // LOADING
                return 'loading-message';
            case 4: // WARNING
                return 'warning-message';
            default:
                return 'info-message';
        }
    };

    return (
        <div className={`message-container ${getMessageStyle()}`}>
            <span className="emoji">{getEmoji()}</span>
            <p className="message-text">{messageText}</p>
        </div>
    );
};

export default MessagePage;
