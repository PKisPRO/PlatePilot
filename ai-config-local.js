// API Configuration - DO NOT COMMIT TO GITHUB
// This file contains sensitive information and should be kept local

const LOCAL_API_CONFIG = {
    API_KEY: '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'
};

// Override the API key in the main config after it loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for AI_CONFIG to be available, then override the API key
    const checkConfig = () => {
        if (typeof AI_CONFIG !== 'undefined') {
            AI_CONFIG.API_KEY = LOCAL_API_CONFIG.API_KEY;
            console.log('API key loaded successfully');
        } else {
            // Retry after a short delay
            setTimeout(checkConfig, 100);
        }
    };
    checkConfig();
});
