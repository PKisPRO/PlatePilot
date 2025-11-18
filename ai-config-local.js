// API Configuration - DO NOT COMMIT TO GITHUB
// This file contains sensitive information and should be kept local

const LOCAL_API_CONFIG = {
    API_KEY: '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',
    API_TYPE: 'openai' // Set to OpenAI instead of Gemini
};

// Override the API configuration immediately when script loads
(function() {
    // Function to apply OpenAI configuration
    function applyOpenAIConfig() {
        if (typeof AI_CONFIG !== 'undefined') {
            // Switch to OpenAI API
            AI_CONFIG.API_KEY = LOCAL_API_CONFIG.API_KEY;
            AI_CONFIG.API_BASE_URL = 'https://api.openai.com/v1';
            AI_CONFIG.MODEL_NAME = 'gpt-4o'; // OpenAI vision model
            AI_CONFIG.API_TYPE = 'openai';
            console.log('✅ OpenAI API configuration loaded successfully', {
                API_BASE_URL: AI_CONFIG.API_BASE_URL,
                MODEL_NAME: AI_CONFIG.MODEL_NAME,
                API_TYPE: AI_CONFIG.API_TYPE,
                API_KEY_PREFIX: AI_CONFIG.API_KEY.substring(0, 10) + '...'
            });
            return true;
        }
        return false;
    }
    
    // Try immediately (in case AI_CONFIG is already loaded)
    if (applyOpenAIConfig()) {
        return;
    }
    
    // If not loaded yet, wait for it
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait
    
    const checkConfig = setInterval(() => {
        attempts++;
        if (applyOpenAIConfig()) {
            clearInterval(checkConfig);
        } else if (attempts >= maxAttempts) {
            clearInterval(checkConfig);
            console.error('❌ Failed to load AI_CONFIG after', maxAttempts * 100, 'ms');
        }
    }, 100);
    
    // Also try on DOMContentLoaded as backup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyOpenAIConfig();
        });
    } else {
        // DOM already loaded, try one more time
        setTimeout(applyOpenAIConfig, 50);
    }
})();
