# Gemini Models Update - Only Gemini 1.5 Flash & Pro

## ✅ Changes Made

The PlatePilot AI system now **only supports** these two Gemini models:

1. **Gemini 1.5 Flash** - ~15 requests per minute (RPM)
   - Default model (recommended for faster responses)
   - Minimum 4 seconds between requests

2. **Gemini 1.5 Pro** - ~2 requests per minute (RPM)
   - More powerful but slower
   - Minimum 30 seconds between requests

## 📝 Configuration

### Current Default Model
The system is configured to use **`gemini-1.5-flash`** by default in `ai-config.js`:

```javascript
MODEL_NAME: 'gemini-1.5-flash', // Default: Gemini 1.5 Flash (15 RPM)
```

### How to Switch Models

To use **Gemini 1.5 Pro** instead, edit `ai-config.js` and change:

```javascript
MODEL_NAME: 'gemini-1.5-pro', // Use Gemini 1.5 Pro (2 RPM)
```

## 🔒 Rate Limiting

The system now automatically enforces rate limits based on the selected model:

- **Gemini 1.5 Flash**: Automatically waits 4 seconds between requests (15 RPM limit)
- **Gemini 1.5 Pro**: Automatically waits 30 seconds between requests (2 RPM limit)

Rate limiting is applied to:
- Image analysis requests
- Chat message requests
- All API calls to Gemini

## ⚠️ Invalid Models

If an invalid model name is detected (anything other than `gemini-1.5-flash` or `gemini-1.5-pro`), the system will:
1. Log a warning in the browser console
2. Automatically fall back to `gemini-1.5-flash`
3. Continue processing the request

## 📊 Model Comparison

| Model | RPM | Min Interval | Use Case |
|-------|-----|--------------|----------|
| **Gemini 1.5 Flash** | 15 | 4 seconds | Fast responses, high volume |
| **Gemini 1.5 Pro** | 2 | 30 seconds | More powerful analysis, lower volume |

## 🔍 Files Updated

1. **`ai-config.js`**
   - Updated `MODEL_NAME` to `gemini-1.5-flash`
   - Added `RATE_LIMITS` configuration
   - Added `enforceRateLimit()` function
   - Added model validation

2. **`ai-verification.html`**
   - Updated image analysis to use validated model names
   - Updated chat function with rate limiting
   - Added model validation throughout
   - Updated report generation to use correct model name

## 🚀 Testing

After uploading these changes to GitHub:

1. Open the AI Verification page
2. Upload an image or send a chat message
3. Check the browser console (F12) to see:
   - Which model is being used
   - Rate limit information
   - Any warnings about invalid models

## 📝 Notes

- The old model `gemini-2.0-flash-exp` has been removed
- All references to other Gemini models have been updated
- Rate limiting prevents API quota errors
- The system gracefully handles invalid model names
