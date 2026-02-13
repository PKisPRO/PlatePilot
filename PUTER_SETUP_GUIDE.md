# Puter.js Setup Guide - FREE Gemini API Access

## Overview

This guide explains how to use **Puter.js** for free, unlimited access to Google Gemini API models without requiring any API keys or sign-ups!

## Benefits of Puter.js

✅ **No API Keys Required** - Works immediately without any setup  
✅ **Free for Developers** - Users cover their own usage costs (User-Pays model)  
✅ **Multiple Gemini Models** - Access to latest Gemini models  
✅ **Image Analysis Support** - Perfect for organic verification  
✅ **No Usage Limits** - Unlimited access  

## Available Models

The following Gemini models are available via Puter.js:

- `gemini-3-pro-preview` - Latest Pro model (most capable)
- `gemini-2.5-pro` - Pro model with advanced reasoning
- `gemini-2.5-flash` - Fast and efficient (recommended)
- `gemini-2.5-flash-lite` - Lightweight version
- `gemini-2.0-flash` - Previous generation flash
- `gemini-2.0-flash-lite` - Lightweight version
- `gemini-1.5-flash` - Stable flash model

## Quick Start

### Option 1: Use the Pre-configured File

Simply replace your current AI config with the Puter.js version:

```html
<!-- Instead of: -->
<script src="ai-config.js"></script>
<script src="ai-config-local.js"></script>

<!-- Use: -->
<script src="https://js.puter.com/v2/"></script>
<script src="ai-config-puter.js"></script>
```

### Option 2: Manual Integration

1. **Include Puter.js in your HTML:**
```html
<script src="https://js.puter.com/v2/"></script>
```

2. **Use Puter.js in your code:**
```javascript
// Wait for Puter.js to load
await new Promise(resolve => {
    if (typeof puter !== 'undefined') resolve();
    else {
        const check = setInterval(() => {
            if (typeof puter !== 'undefined') {
                clearInterval(check);
                resolve();
            }
        }, 100);
    }
});

// Make API call
const response = await puter.ai.chat(
    "Your prompt here",
    imageUrl, // Optional: image URL or data URL
    {
        model: 'gemini-2.5-flash',
        stream: false
    }
);
```

## Example: Image Analysis

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://js.puter.com/v2/"></script>
</head>
<body>
    <img src="your-image.jpg" id="image">
    <div id="result"></div>
    
    <script>
        async function analyzeImage() {
            // Wait for Puter.js
            while (typeof puter === 'undefined') {
                await new Promise(r => setTimeout(r, 100));
            }
            
            const imageUrl = document.getElementById('image').src;
            
            const response = await puter.ai.chat(
                "Analyze this image for organic authenticity",
                imageUrl,
                { model: 'gemini-2.5-flash' }
            );
            
            document.getElementById('result').textContent = response;
        }
        
        analyzeImage();
    </script>
</body>
</html>
```

## Migration from Direct Gemini API

If you're currently using `ai-config.js` with direct Gemini API calls:

1. **Replace the script includes:**
   - Remove: `<script src="ai-config.js"></script>`
   - Remove: `<script src="ai-config-local.js"></script>` (if using)
   - Add: `<script src="https://js.puter.com/v2/"></script>`
   - Add: `<script src="ai-config-puter.js"></script>`

2. **The API interface remains the same:**
   - `callOrganicVerificationAPI(base64Image, filename)` works the same way
   - `AI_CONFIG` object structure is compatible
   - No changes needed to your existing code!

## How It Works

Puter.js uses a "User-Pays" model:
- **Developers**: Get free access, no API keys needed
- **Users**: Cover their own usage costs when they use the feature
- **No Limits**: Unlimited API calls
- **No Sign-ups**: Works immediately

## Troubleshooting

### Puter.js not loading?
- Check your internet connection
- Ensure the script tag is in the `<head>` or before your code
- Check browser console for errors

### API calls failing?
- Wait for Puter.js to fully load before making calls
- Use `waitForPuter()` function from `ai-config-puter.js`
- Check that the model name is correct

### Image analysis not working?
- Ensure images are in base64 data URL format: `data:image/jpeg;base64,...`
- Or use a publicly accessible image URL
- Check that Puter.js supports the image format

## Resources

- [Puter.js Gemini API Documentation](https://developer.puter.com/tutorials/free-gemini-api/)
- [Puter.js Main Documentation](https://developer.puter.com/)
- [Puter.js Playground](https://playground.puter.com/)

## Comparison: Direct API vs Puter.js

| Feature | Direct Gemini API | Puter.js |
|---------|------------------|----------|
| API Key Required | ✅ Yes | ❌ No |
| Setup Required | ✅ Yes | ❌ No |
| Cost for Developer | 💰 Pay per use | 🆓 Free |
| Cost for Users | 🆓 Free | 💰 Pay per use |
| Usage Limits | ⚠️ API quotas | ✅ Unlimited |
| Models Available | ✅ All | ✅ All |
| Image Support | ✅ Yes | ✅ Yes |

## Recommendation

**Use Puter.js if:**
- You want to avoid API key management
- You want unlimited usage
- You're okay with users covering their own costs
- You want zero setup time

**Use Direct API if:**
- You want to cover all costs yourself
- You need more control over API configuration
- You have existing API keys and quotas

---

**Note**: The `ai-config-puter.js` file is ready to use and maintains compatibility with your existing `callOrganicVerificationAPI()` function calls.

