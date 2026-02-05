// AI Verification Configuration
// Replace these values with your actual Gemini API details

const AI_CONFIG = {
    // Google Gemini API base URL (don't include the model name here)
    API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',

    // Your Google Gemini API key (keep this secure!)
    API_KEY: 'AIzaSyAFdDnDZeMxyXDb8-HY9vz6H0_QkcqXlbw',

    // Gemini model name - use only Gemini 1.5 Flash or Gemini 1.5 Pro
    // Available models:
    // - 'gemini-1.5-flash' - ~15 requests per minute (RPM) - Recommended for faster responses
    // - 'gemini-1.5-pro' - ~2 requests per minute (RPM) - More powerful but slower
    MODEL_NAME: 'gemini-1.5-flash', // Default: Gemini 1.5 Flash (15 RPM)
    
    // Rate limiting configuration based on model RPM
    RATE_LIMITS: {
        'gemini-1.5-flash': {
            rpm: 15,                    // 15 requests per minute
            minInterval: 4000,           // 4 seconds minimum between requests (60s / 15 = 4s)
            description: 'Fast model with 15 RPM limit'
        },
        'gemini-1.5-pro': {
            rpm: 2,                     // 2 requests per minute
            minInterval: 30000,          // 30 seconds minimum between requests (60s / 2 = 30s)
            description: 'Powerful model with 2 RPM limit'
        }
    },
    
    // System prompt for organic verification
    SYSTEM_PROMPT: `You are a certified organic agriculture inspector and food safety expert specializing in visual produce analysis. Your role is to provide detailed, professional assessments of produce authenticity.'

ANALYSIS FRAMEWORK:

1. ORGANIC AUTHENTICITY INDICATORS (Look for these POSITIVE signs):
   - Natural color variations and characteristic imperfections
   - Vibrant, healthy pigmentation without artificial enhancement
   - Natural surface texture (matte finish, no excessive wax)
   - Signs of beneficial insects or minor pest damage (natural)
   - Soil residue or natural environmental marks
   - Size variations within normal range
   - Natural ripening patterns

2. CONVENTIONAL/SYNTHETIC INDICATORS (Look for these WARNING signs):
   - Artificial shine or excessive waxy coating
   - Chemical residue (white/grey powder, spots, or streaks)
   - Unnatural color uniformity or enhancement
   - Perfect appearance (suspiciously flawless)
   - Chemical burn patterns (brown spots with yellow halos)
   - Unusual surface texture (plastic-like, overly smooth)
   - Unnatural preservation signs

3. SCORING METHODOLOGY:
   - Confidence: Overall certainty of organic status (0-100%)
   - Discoloration: Chemical damage indicators (0=clean, 100=severe)
   - Residue: Surface chemical presence (0=none, 100=heavy)
   - Texture: Surface naturalness (0=natural, 100=artificial)
   - Color Uniformity: Artificial enhancement (0=varied, 100=uniform)
   - Natural Damage: Beneficial sign (0=none, 100=significant)

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
    "confidence": 85,
    "classification": "organic",
    "analysis": "Professional detailed analysis in 2-3 sentences describing specific observations about color, texture, surface characteristics, and any indicators found.",
    "recommendation": "pass",
    "key_findings": [
        "Specific observation 1",
        "Specific observation 2",
        "Specific observation 3"
    ],
    "flagged": false,
    "heatmap_data": {
        "discoloration_score": 15,
        "residue_score": 10,
        "texture_score": 20,
        "color_uniformity_score": 25,
        "natural_damage_score": 30
    },
    "professional_notes": "Additional technical observations for certification purposes"
}

RESPONSE GUIDELINES:
- Be specific and technical in your analysis
- Reference exact visual evidence you observe
- Use professional agricultural terminology
- Confidence threshold: >70% pass, 40-70% review, <40% fail
- Always provide actionable recommendations
- Keep analysis objective and evidence-based`,

    // Analysis thresholds
    THRESHOLDS: {
        PASS: 70,    // 70%+ confidence = pass
        REVIEW: 40,  // 40-69% confidence = review
        FAIL: 0      // <40% confidence = fail
    }
};

// Rate limiting tracker
let lastRequestTime = {};
const getRateLimit = (modelName) => {
    return AI_CONFIG.RATE_LIMITS[modelName] || AI_CONFIG.RATE_LIMITS['gemini-1.5-flash'];
};

// Function to enforce rate limiting
async function enforceRateLimit(modelName) {
    const rateLimit = getRateLimit(modelName);
    const now = Date.now();
    const lastTime = lastRequestTime[modelName] || 0;
    const timeSinceLastRequest = now - lastTime;
    
    if (timeSinceLastRequest < rateLimit.minInterval) {
        const waitTime = rateLimit.minInterval - timeSinceLastRequest;
        console.log(`⏳ Rate limit: Waiting ${Math.ceil(waitTime / 1000)}s before next request (${rateLimit.rpm} RPM limit)`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastRequestTime[modelName] = Date.now();
}

// Function to call the Gemini API
async function callOrganicVerificationAPI(base64Image, filename) {
    try {
        // Validate model name
        const modelName = AI_CONFIG.MODEL_NAME;
        if (modelName !== 'gemini-1.5-flash' && modelName !== 'gemini-1.5-pro') {
            console.warn(`⚠️ Invalid model: ${modelName}. Falling back to gemini-1.5-flash`);
            AI_CONFIG.MODEL_NAME = 'gemini-1.5-flash';
        }
        
        // Enforce rate limiting based on selected model
        await enforceRateLimit(AI_CONFIG.MODEL_NAME);
        
        // Extract base64 data and mime type
        const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 image format');
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        // Construct Gemini API URL with API key
        const apiUrl = `${AI_CONFIG.API_BASE_URL}/models/${AI_CONFIG.MODEL_NAME}:generateContent?key=${AI_CONFIG.API_KEY}`;

        const rateLimit = getRateLimit(AI_CONFIG.MODEL_NAME);
        console.log('🔍 Gemini API Request:', {
            url: apiUrl,
            mimeType: mimeType,
            imageDataLength: base64Data.length,
            model: AI_CONFIG.MODEL_NAME,
            rateLimit: `${rateLimit.rpm} RPM (${rateLimit.minInterval / 1000}s min interval)`,
            description: rateLimit.description
        });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${AI_CONFIG.SYSTEM_PROMPT}\n\nPlease analyze this image (${filename}) for organic authenticity. Provide your analysis in the specified JSON format.`
                            },
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: base64Data
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 800,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Gemini API Error:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('✅ Gemini API Response:', data);
        const content = data.candidates[0].content.parts[0].text;
        
        // Try to parse JSON response (handle markdown code blocks)
        try {
            let jsonContent = content;

            // Remove markdown code blocks if present
            if (content.includes('```json')) {
                jsonContent = content.match(/```json\s*([\s\S]*?)\s*```/)?.[1] || content;
            } else if (content.includes('```')) {
                jsonContent = content.match(/```\s*([\s\S]*?)\s*```/)?.[1] || content;
            }

            const result = JSON.parse(jsonContent.trim());
            return {
                confidence: result.confidence || 50,
                classification: result.classification || 'unknown',
                analysis: result.analysis || 'Analysis completed',
                recommendation: result.recommendation || 'review',
                keyFindings: result.key_findings || [],
                flagged: result.flagged || false,
                heatmapData: result.heatmap_data || {},
                professionalNotes: result.professional_notes || ''
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
        flagged,
        heatmapData: {}
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_CONFIG, callOrganicVerificationAPI };
}
