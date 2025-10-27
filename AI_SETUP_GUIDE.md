# AI Organic Verification Setup Guide

## Overview
This guide will help you connect Google Gemini AI to the AI Organic Verification system.

## Files Created
1. `ai-verification.html` - Main verification page with chat interface
2. `ai-config.js` - Configuration file for API settings
3. Navigation links added to existing pages

## Setup Steps

### 1. Configure Your Gemini API
Edit the `ai-config.js` file and replace these values:

```javascript
const AI_CONFIG = {
    // Google Gemini API endpoint
    API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/',

    // Your Google Gemini API key (keep this secure!)
    API_KEY: 'YOUR_GEMINI_API_KEY_HERE',

    // Gemini model name - gemini-1.5-flash or gemini-1.5-pro for vision capabilities
    MODEL_NAME: 'gemini-1.5-flash',
    // ... rest of config
};
```

### 2. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key" or "Create API Key"
3. Copy the key and paste it in `ai-config.js` as `API_KEY`

### 3. Choose Your Model
Google Gemini offers several models:
- **gemini-1.5-flash** - Fast, efficient, great for image analysis (recommended)
- **gemini-1.5-pro** - Most capable model with advanced reasoning
- **gemini-1.0-pro-vision** - Legacy vision model

Update `MODEL_NAME` in the config to use your preferred model

### 4. Test the System
1. Open `ai-verification.html` in your browser
2. Try the chat interface or upload an image
3. Check the browser console for any errors
4. Verify the API call is working with Gemini

## Features

### AI Chat Interface
- **Chat with AI**: Ask questions about organic produce, nutrition, and farming
- **Image Analysis**: Upload images for organic vs conventional classification
- **Real-time Responses**: Instant AI responses via Gemini
- **Heatmap Generation**: Visual analysis showing key indicators

### AI Analysis
- **Image Upload**: Upload via chat or drag & drop
- **Multiple Images**: Analyze several images in sequence
- **Real-time Analysis**: Instant results with progress indicators
- **Detailed Reports**: Confidence scores, analysis, and recommendations
- **Report Generation**: Download detailed PDF/Markdown reports

### Results Display
- **Confidence Score**: 0-100% organic likelihood
- **Visual Indicators**: Color-coded progress bars
- **Detailed Analysis**: What the AI observed
- **Key Findings**: Bullet points of important observations
- **Recommendations**: Pass/Review/Fail with explanations
- **Expert Review Flag**: Automatic flagging for uncertain cases

### Privacy & Security
- **Client-side Processing**: Images processed locally before API call
- **No Storage**: Images not stored on your server
- **Secure API**: Direct connection to Google Gemini with your API key
- **HTTPS Only**: All API calls use encrypted connections

## Customization

### Modify Analysis Criteria
Edit the `SYSTEM_PROMPT` in `ai-config.js` to change what the AI looks for:

```javascript
SYSTEM_PROMPT: `You are an expert in organic agriculture...
Your custom instructions here...`
```

### Adjust Thresholds
Change the confidence thresholds:

```javascript
THRESHOLDS: {
    PASS: 70,    // 70%+ confidence = pass
    REVIEW: 40,  // 40-69% confidence = review
    FAIL: 0      // <40% confidence = fail
}
```

### Styling
The page uses Tailwind CSS and matches your existing PlatePilot design. You can modify colors, layout, or add new features as needed.

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Check your API key is correct in `ai-config.js`
   - Ensure you've enabled the Generative Language API in Google Cloud
   - Verify the API key has proper permissions

2. **CORS Errors**
   - Gemini API supports direct browser calls (no CORS issues)
   - If you still face issues, check your browser console for specific errors

3. **Model Not Found**
   - Check your model name is correct: `gemini-1.5-flash` or `gemini-1.5-pro`
   - Ensure the model is available in your region
   - Try with `gemini-1.5-flash` first (most reliable)

4. **Image Upload Issues**
   - Check file size (Gemini supports up to 20MB images)
   - Ensure image format is supported (JPG, PNG, WebP, HEIC)
   - Check browser console for base64 encoding errors

5. **Rate Limiting**
   - Free tier: 15 requests per minute
   - If exceeded, wait a moment and try again
   - Consider upgrading to paid tier for higher limits

### Debug Mode
Add this to see detailed API responses:

```javascript
// In ai-config.js, add this before the API call
console.log('API Request:', requestBody);
console.log('API Response:', response);
```

## Next Steps

1. **Backend Integration**: Consider moving API calls to a backend server for better security (hide API key)
2. **Database Storage**: Store analysis results and chat history for future reference
3. **User Accounts**: Link verifications to user profiles
4. **Expert Dashboard**: Create a panel for human experts to review flagged items
5. **Analytics**: Track verification patterns and improve the system
6. **Advanced Features**:
   - Batch processing for multiple images
   - Comparison mode for before/after analysis
   - Integration with certification databases

## API Limits & Pricing

### Free Tier (Google Gemini)
- 15 requests per minute
- 1,500 requests per day
- Perfect for development and small-scale testing

### Paid Tier
- Higher rate limits
- More requests per day
- Priority support
- Visit [Google AI Pricing](https://ai.google.dev/pricing) for details

## Support
- Check browser console for error messages
- Verify all configuration values in `ai-config.js`
- Ensure your Gemini API key is active
- Visit [Google AI Studio](https://makersuite.google.com/) for API management
- Contact: platepilot.11@gmail.com for PlatePilot-specific issues
