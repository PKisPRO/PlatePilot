# PlatePilot Language System

## Overview
PlatePilot now supports 50+ languages with a comprehensive internationalization system. The language system includes support for major Indian languages and international languages, making the platform accessible to users worldwide.

## Supported Languages

### Indian Languages (Primary Focus)
1. **Hindi** (हिंदी) - hi
2. **Bengali** (বাংলা) - bn
3. **Telugu** (తెలుగు) - te
4. **Marathi** (मराठी) - mr
5. **Tamil** (தமிழ்) - ta
6. **Gujarati** (ગુજરાતી) - gu
7. **Kannada** (ಕನ್ನಡ) - kn
8. **Malayalam** (മലയാളം) - ml
9. **Punjabi** (ਪੰਜਾਬੀ) - pa
10. **Odia** (ଓଡ଼ିଆ) - or
11. **Assamese** (অসমীয়া) - as
12. **Sanskrit** (संस्कृतम्) - sa
13. **Urdu** (اردو) - ur
14. **Nepali** (नेपाली) - ne
15. **Sinhala** (සිංහල) - si

### International Languages
16. **English** - en
17. **Chinese** (中文) - zh
18. **Japanese** (日本語) - ja
19. **Korean** (한국어) - ko
20. **Arabic** (العربية) - ar
21. **French** (Français) - fr
22. **German** (Deutsch) - de
23. **Spanish** (Español) - es
24. **Portuguese** (Português) - pt
25. **Italian** (Italiano) - it
26. **Russian** (Русский) - ru
27. **Turkish** (Türkçe) - tr
28. **Dutch** (Nederlands) - nl
29. **Swedish** (Svenska) - sv
30. **Norwegian** (Norsk) - no
31. **Danish** (Dansk) - da
32. **Finnish** (Suomi) - fi
33. **Polish** (Polski) - pl
34. **Czech** (Čeština) - cs
35. **Hungarian** (Magyar) - hu
36. **Romanian** (Română) - ro
37. **Bulgarian** (Български) - bg
38. **Croatian** (Hrvatski) - hr
39. **Serbian** (Српски) - sr
40. **Slovenian** (Slovenščina) - sl
41. **Estonian** (Eesti) - et
42. **Latvian** (Latviešu) - lv
43. **Lithuanian** (Lietuvių) - lt
44. **Hebrew** (עברית) - he
45. **Persian** (فارسی) - fa
46. **Thai** (ไทย) - th
47. **Vietnamese** (Tiếng Việt) - vi
48. **Indonesian** (Bahasa Indonesia) - id
49. **Malay** (Bahasa Melayu) - ms
50. **Filipino** (Filipino) - tl

## Implementation Details

### Files Structure
```
├── language-selector.js      # Main language selector component
├── translations.js           # Core translations (English, Hindi, Bengali, etc.)
├── translations-extended.js  # Extended Indian languages
├── translations-more.js      # International languages
└── LANGUAGE_SYSTEM_README.md # This documentation
```

### How to Use

#### 1. Include Language System in HTML
Add these script tags to your HTML files:
```html
<!-- Language System -->
<script src="translations.js"></script>
<script src="translations-extended.js"></script>
<script src="translations-more.js"></script>
<script src="language-selector.js"></script>
```

#### 2. Add Translation Attributes
Add `data-translate` attributes to HTML elements:
```html
<a href="index.html" data-translate="home">Home</a>
<h1 data-translate="heroTitle">Your Journey to Healthy Living Starts Here</h1>
<p data-translate="heroSubtitle">Discover delicious recipes...</p>
```

#### 3. Language Selector Placement
The language selector will automatically be inserted into the navigation bar. It includes:
- Flag icons for each language
- Native language names
- Search functionality
- Dropdown with all available languages

### Translation Keys

#### Navigation
- `home` - Home page link
- `recipes` - Recipes page link
- `leaderboard` - Leaderboard page link
- `shareRecipe` - Share Recipe page link
- `games` - Games page link
- `secretRecipes` - Secret Recipes page link
- `dietPlanner` - Diet Planner page link

#### Hero Section
- `heroTitle` - Main hero title
- `heroSubtitle` - Hero subtitle
- `exploreRecipes` - Explore Recipes button
- `startMealPlanning` - Start Meal Planning button

#### Features Section
- `whyChoosePlatePilot` - Section title
- `healthyRecipes` - Healthy Recipes feature
- `interactiveGames` - Interactive Games feature
- `personalizedPlans` - Personalized Plans feature
- `accessRecipes` - Recipe access description
- `learnNutrition` - Nutrition learning description
- `customizedPlans` - Customized plans description

#### Call to Action
- `readyToStart` - CTA title
- `joinPlatePilot` - CTA description
- `getStarted` - Get Started button

#### Testimonials
- `whatOurUsersSay` - Testimonials section title
- `testimonial1` - First testimonial
- `testimonial2` - Second testimonial
- `testimonial3` - Third testimonial

#### Footer
- `tagline` - Company tagline
- `quickLinks` - Quick Links section
- `contact` - Contact section
- `followUs` - Follow Us section
- `email` - Email contact
- `phone` - Phone contact
- `facebook` - Facebook link
- `twitter` - Twitter link
- `instagram` - Instagram link
- `copyright` - Copyright text

### Features

#### 1. Language Persistence
- Selected language is saved in localStorage
- Language preference persists across browser sessions

#### 2. Search Functionality
- Users can search for languages by name
- Supports both English and native language names

#### 3. Responsive Design
- Language selector works on mobile and desktop
- Dropdown adapts to screen size

#### 4. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

#### 5. Performance
- Lazy loading of translations
- Efficient DOM updates
- Minimal impact on page load time

### Adding New Languages

#### 1. Add Language to Language Selector
In `language-selector.js`, add the new language to the `languages` object:
```javascript
'lng': { name: 'Language Name', nativeName: 'Native Name', flag: '🏳️' }
```

#### 2. Add Translations
In the appropriate translations file, add the new language:
```javascript
'lng': {
    home: 'Translation for Home',
    recipes: 'Translation for Recipes',
    // ... add all translation keys
}
```

#### 3. Test the Implementation
- Verify the language appears in the dropdown
- Test all translations work correctly
- Check for proper text direction (RTL for Arabic, Hebrew, etc.)

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Future Enhancements
1. **Auto-detection**: Detect user's browser language
2. **Regional variants**: Support for regional language variants
3. **Dynamic loading**: Load translations on demand
4. **Translation management**: Admin interface for managing translations
5. **Voice support**: Text-to-speech for accessibility

### Contributing
To add new languages or improve existing translations:
1. Fork the repository
2. Add your translations
3. Test thoroughly
4. Submit a pull request

### Support
For questions or issues with the language system, please contact the development team.

---

**Note**: This language system is designed to be scalable and maintainable. All translations are stored in separate files for easy management and updates. 