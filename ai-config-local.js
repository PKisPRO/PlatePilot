// API Configuration - DO NOT COMMIT TO GITHUB
// This file contains sensitive information and should be kept local

const LOCAL_API_CONFIG = {
    API_KEY: 'AIzaSyBU6KJ6oYeuxGqCY8dh_bJ8N_E-X9iJY3s',
    API_TYPE: 'gemini' // Using Google Gemini API
};

// Override the API configuration immediately when script loads
(function() {
    // Function to apply Gemini configuration
    function applyGeminiConfig() {
        if (typeof AI_CONFIG !== 'undefined') {
            // Switch to Gemini API with new key
            AI_CONFIG.API_KEY = LOCAL_API_CONFIG.API_KEY;
            AI_CONFIG.API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
            AI_CONFIG.MODEL_NAME = 'gemini-2.0-flash-exp'; // Latest Gemini 2.0 with enhanced vision capabilities
            AI_CONFIG.API_TYPE = 'gemini';
            console.log('✅ Gemini API configuration loaded successfully', {
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
    if (applyGeminiConfig()) {
        return;
    }
    
    // If not loaded yet, wait for it
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait
    
    const checkConfig = setInterval(() => {
        attempts++;
        if (applyGeminiConfig()) {
            clearInterval(checkConfig);
        } else if (attempts >= maxAttempts) {
            clearInterval(checkConfig);
            console.error('❌ Failed to load AI_CONFIG after', maxAttempts * 100, 'ms');
        }
    }, 100);
    
    // Also try on DOMContentLoaded as backup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyGeminiConfig();
        });
    } else {
        // DOM already loaded, try one more time
        setTimeout(applyGeminiConfig, 50);
    }
})();
