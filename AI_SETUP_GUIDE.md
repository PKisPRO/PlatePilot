# AI Organic Verification Setup Guide

## Overview
This guide will help you connect your custom GPT model to the AI Organic Verification system.

## Files Created
1. `ai-verification.html` - Main verification page
2. `ai-config.js` - Configuration file for API settings
3. Navigation links added to existing pages

## Setup Steps

### 1. Configure Your GPT API
Edit the `ai-config.js` file and replace these values:

```javascript
const AI_CONFIG = {
    // Replace with your OpenAI API endpoint
    API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
    
    // Replace with your actual OpenAI API key
    API_KEY: 'YOUR_OPENAI_API_KEY_HERE',
    
    // Replace with your custom model name (if you created one)
    MODEL_NAME: 'gpt-4-vision-preview', // or your custom model name
    // ... rest of config
};
```

### 2. Get Your OpenAI API Key
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key and paste it in `ai-config.js`

### 3. Custom GPT Model (Optional)
If you created a custom GPT model:
1. Go to [OpenAI GPTs](https://chat.openai.com/gpts)
2. Find your custom model
3. Note the model name/ID
4. Replace `MODEL_NAME` in the config

### 4. Test the System
1. Open `ai-verification.html` in your browser
2. Upload a test image of produce
3. Check the browser console for any errors
4. Verify the API call is working

## Features

### AI Analysis
- **Image Upload**: Drag & drop or click to browse
- **Multiple Images**: Upload several images at once
- **Real-time Analysis**: Instant results with progress indicators
- **Detailed Reports**: Confidence scores, analysis, and recommendations

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
- **Secure API**: Direct connection to OpenAI with your API key

## Customization

### Modify Analysis Criteria
Edit the `SYSTEM_PROMPT` in `ai-config.js` to change what the AI looks for:

```javascript
SYSTEM_PROMPT: `Your custom instructions here...`
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
   - Check your API key is correct
   - Ensure you have credits in your OpenAI account
   - Verify the API key has the right permissions

2. **CORS Errors**
   - If hosting locally, you may need a proxy server
   - Consider using a backend API to handle OpenAI calls

3. **Model Not Found**
   - Check your model name is correct
   - Ensure you have access to the model
   - Try with `gpt-4-vision-preview` first

4. **Image Upload Issues**
   - Check file size (max 10MB)
   - Ensure image format is supported (JPG, PNG, WebP)
   - Check browser console for errors

### Debug Mode
Add this to see detailed API responses:

```javascript
// In ai-config.js, add this before the API call
console.log('API Request:', requestBody);
console.log('API Response:', response);
```

## Next Steps

1. **Backend Integration**: Consider moving API calls to a backend server for better security
2. **Database Storage**: Store analysis results for future reference
3. **User Accounts**: Link verifications to user profiles
4. **Expert Dashboard**: Create a panel for human experts to review flagged items
5. **Analytics**: Track verification patterns and improve the system

## Support
If you need help with setup or customization, check the browser console for error messages and ensure all configuration values are correct.
