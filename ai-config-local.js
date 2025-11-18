// API Configuration - DO NOT COMMIT TO GITHUB
// This file contains sensitive information and should be kept local

const LOCAL_API_CONFIG = {
    API_KEY: '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',
    API_TYPE: 'openai' // Set to OpenAI instead of Gemini
};

// Override the API configuration after it loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for AI_CONFIG to be available, then override the settings
    const checkConfig = () => {
        if (typeof AI_CONFIG !== 'undefined') {
            // Switch to OpenAI API
            AI_CONFIG.API_KEY = LOCAL_API_CONFIG.API_KEY;
            AI_CONFIG.API_BASE_URL = 'https://api.openai.com/v1';
            AI_CONFIG.MODEL_NAME = 'gpt-4o'; // OpenAI vision model
            AI_CONFIG.API_TYPE = 'openai';
            console.log('OpenAI API configuration loaded successfully');
        } else {
            // Retry after a short delay
            setTimeout(checkConfig, 100);
        }
    };
    checkConfig();
});
