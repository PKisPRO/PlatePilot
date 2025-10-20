// AI Verification Configuration
// Replace these values with your actual GPT API details

const AI_CONFIG = {
    // Your OpenAI API endpoint (or custom endpoint if using a proxy)
    API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
    
    // Your OpenAI API key (keep this secure!)
    API_KEY: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
    
    // Your custom GPT model name (if you created a custom one)
    MODEL_NAME: 'PlatePilot', // or your custom model name
    
    // System prompt for organic verification
    SYSTEM_PROMPT: `You are an expert in organic agriculture and food safety. Your task is to analyze images of produce to determine if they show signs of organic or non-organic farming practices.

Look for these indicators:
ORGANIC INDICATORS:
- Natural color variations and imperfections
- Healthy, vibrant colors
- Natural leaf patterns and textures
- Presence of beneficial insects or natural pest damage
- Soil-based discoloration (natural)

NON-ORGANIC INDICATORS:
- Unusual discoloration patterns (chemical burns)
- Residue specks or powdery substances
- Unnatural sheen or waxy appearance
- Uniform, perfect appearance (suspicious)
- Chemical damage patterns
- Unusual color uniformity

Provide your analysis in this exact JSON format:
{
    "confidence": [0-100],
    "analysis": "Detailed description of what you observe",
    "recommendation": "pass/review/fail",
    "key_findings": ["finding1", "finding2", "finding3"],
    "flagged": true/false
}

Be thorough but concise. Confidence should reflect your certainty about the organic status.`,

    // Analysis thresholds
    THRESHOLDS: {
        PASS: 70,    // 70%+ confidence = pass
        REVIEW: 40,  // 40-69% confidence = review
        FAIL: 0      // <40% confidence = fail
    }
};

// Function to call the GPT API
async function callOrganicVerificationAPI(base64Image, filename) {
    try {
        const response = await fetch(AI_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.MODEL_NAME,
                messages: [
                    {
                        role: 'system',
                        content: AI_CONFIG.SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `Please analyze this image (${filename}) for organic authenticity. Provide your analysis in the specified JSON format.`
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: base64Image
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 800,
                temperature: 0.1 // Low temperature for more consistent results
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Try to parse JSON response
        try {
            const result = JSON.parse(content);
            return {
                confidence: result.confidence || 50,
                analysis: result.analysis || 'Analysis completed',
                recommendation: result.recommendation || 'review',
                keyFindings: result.key_findings || [],
                flagged: result.flagged || false
            };
        } catch (parseError) {
            // Fallback parsing if JSON format isn't followed
            return parseTextResponse(content);
        }
        
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Fallback parser for non-JSON responses
function parseTextResponse(content) {
    const confidenceMatch = content.match(/(\d+)%/);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 50;
    
    const analysis = content.split('Analysis:')[1]?.split('Recommendation:')[0]?.trim() || 
                   content.split('analysis:')[1]?.split('recommendation:')[0]?.trim() || 
                   'Analysis completed';
    
    const recommendation = content.includes('pass') ? 'pass' :
                          content.includes('fail') ? 'fail' :
                          'review';
    
    const flagged = confidence < AI_CONFIG.THRESHOLDS.PASS;
    
    return {
        confidence,
        analysis,
        recommendation,
        keyFindings: [],
        flagged
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_CONFIG, callOrganicVerificationAPI };
}
