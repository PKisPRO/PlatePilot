// Language Selector Component
class LanguageSelector {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.languages = {
            // Indian Languages
            'hi': { name: 'हिंदी', nativeName: 'हिंदी', flag: '🇮🇳' },
            'bn': { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
            'te': { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
            'mr': { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
            'ta': { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
            'gu': { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
            'kn': { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
            'ml': { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
            'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
            'or': { name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
            'as': { name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
            'sa': { name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' },
            'ur': { name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
            'ne': { name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
            'si': { name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
            'my': { name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲' },
            'th': { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
            'km': { name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭' },
            'lo': { name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦' },
            'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
            'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
            'ms': { name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
            'tl': { name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
            'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
            'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
            'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
            'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
            'he': { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
            'fa': { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
            'tr': { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
            'ru': { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
            'uk': { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
            'pl': { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
            'cs': { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
            'sk': { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
            'hu': { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
            'ro': { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
            'bg': { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
            'hr': { name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
            'sr': { name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
            'sl': { name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
            'et': { name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
            'lv': { name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
            'lt': { name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
            'fi': { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
            'sv': { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
            'no': { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
            'da': { name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
            'nl': { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
            'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
            'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
            'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
            'pt': { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
            'it': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
            'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' }
        };
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageSelector();
        this.applyLanguage(this.currentLanguage);
    }

    async loadTranslations() {
        // Load translations from the translations.js file
        if (typeof window.translations !== 'undefined') {
            this.translations = window.translations;
        } else {
            // Fallback to basic translations
            this.translations = this.getBasicTranslations();
        }
    }

    getBasicTranslations() {
        return {
            en: {
                home: 'Home',
                recipes: 'Recipes',
                leaderboard: 'Leaderboard',
                shareRecipe: 'Share Recipe',
                games: 'Games',
                secretRecipes: 'Secret Recipes',
                dietPlanner: 'Diet Planner',
                exploreRecipes: 'Explore Recipes',
                startMealPlanning: 'Start Meal Planning',
                whyChoosePlatePilot: 'Why Choose PlatePilot?',
                healthyRecipes: 'Healthy Recipes',
                interactiveGames: 'Interactive Games',
                personalizedPlans: 'Personalized Plans',
                readyToStart: 'Ready to Start Your Healthy Journey?',
                getStarted: 'Get Started',
                whatOurUsersSay: 'What Our Users Say',
                quickLinks: 'Quick Links',
                contact: 'Contact',
                followUs: 'Follow Us',
                allRightsReserved: 'All rights reserved.',
                language: 'Language',
                // Marketplace additions
                marketplaceTitle: 'Organic Marketplace',
                marketplaceDesc: 'Browse verified organic fruits and vegetables grown by rural farmers and communities. Support healthy living and fair trade!',
                type: 'Type',
                quantity: 'Quantity',
                price: 'Price',
                organicBadge: '2x Market Rate (Organic)',
                farmer: 'Farmer',
                addToCart: 'Add to Cart',
                buyNow: 'Buy Now'
            },
            hi: {
                home: 'होम',
                recipes: 'व्यंजन',
                leaderboard: 'लीडरबोर्ड',
                shareRecipe: 'व्यंजन साझा करें',
                games: 'खेल',
                secretRecipes: 'गुप्त व्यंजन',
                dietPlanner: 'आहार योजनाकार',
                exploreRecipes: 'व्यंजन खोजें',
                startMealPlanning: 'भोजन योजना शुरू करें',
                whyChoosePlatePilot: 'प्लेटपायलट क्यों चुनें?',
                healthyRecipes: 'स्वस्थ व्यंजन',
                interactiveGames: 'इंटरैक्टिव खेल',
                personalizedPlans: 'व्यक्तिगत योजनाएं',
                readyToStart: 'अपनी स्वस्थ यात्रा शुरू करने के लिए तैयार हैं?',
                getStarted: 'शुरू करें',
                whatOurUsersSay: 'हमारे उपयोगकर्ता क्या कहते हैं',
                quickLinks: 'त्वरित लिंक',
                contact: 'संपर्क',
                followUs: 'हमें फॉलो करें',
                allRightsReserved: 'सर्वाधिकार सुरक्षित।',
                language: 'भाषा',
                // Marketplace additions
                marketplaceTitle: 'जैविक बाज़ार',
                marketplaceDesc: 'ग्रामीण किसानों और समुदायों द्वारा उगाई गई प्रमाणित जैविक फल और सब्ज़ियाँ देखें। स्वस्थ जीवन और निष्पक्ष व्यापार का समर्थन करें!',
                type: 'प्रकार',
                quantity: 'मात्रा',
                price: 'मूल्य',
                organicBadge: '2x बाज़ार दर (जैविक)',
                farmer: 'किसान',
                addToCart: 'कार्ट में डालें',
                buyNow: 'अभी खरीदें'
            }
            // Add more languages here...
        };
    }

    createLanguageSelector() {
        // Create language selector HTML
        const languageSelectorHTML = `
            <div class="language-selector relative">
                <button id="languageBtn" class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <span id="currentLanguageFlag">${this.languages[this.currentLanguage].flag}</span>
                    <span id="currentLanguageName" class="hidden md:inline">${this.languages[this.currentLanguage].name}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="languageDropdown" class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden z-50 max-h-96 overflow-y-auto">
                    <div class="p-2">
                        <input type="text" id="languageSearch" placeholder="Search languages..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <div id="languageList" class="space-y-1">
                            ${this.generateLanguageOptions()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert language selector into navigation
        const nav = document.querySelector('nav .container .flex.justify-between');
        if (nav) {
            const darkModeBtn = nav.querySelector('button[onclick="toggleDarkMode()"]');
            if (darkModeBtn) {
                darkModeBtn.insertAdjacentHTML('beforebegin', languageSelectorHTML);
            }
        }

        // Add event listeners
        this.addEventListeners();
    }

    generateLanguageOptions() {
        return Object.entries(this.languages)
            .map(([code, lang]) => `
                <button class="language-option w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 ${code === this.currentLanguage ? 'bg-green-100 dark:bg-green-900' : ''}" data-lang="${code}">
                    <span class="text-lg">${lang.flag}</span>
                    <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white">${lang.nativeName}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${lang.name}</div>
                    </div>
                    ${code === this.currentLanguage ? '<span class="text-green-500">✓</span>' : ''}
                </button>
            `)
            .join('');
    }

    addEventListeners() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageSearch = document.getElementById('languageSearch');
        const languageOptions = document.querySelectorAll('.language-option');

        // Toggle dropdown
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        });

        // Language search
        languageSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            languageOptions.forEach(option => {
                const langCode = option.dataset.lang;
                const lang = this.languages[langCode];
                const matches = lang.name.toLowerCase().includes(searchTerm) || 
                              lang.nativeName.toLowerCase().includes(searchTerm);
                option.style.display = matches ? 'flex' : 'none';
            });
        });

        // Language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const langCode = option.dataset.lang;
                this.changeLanguage(langCode);
                languageDropdown.classList.add('hidden');
            });
        });
    }

    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);
        this.applyLanguage(langCode);
        this.updateLanguageSelector();
    }

    applyLanguage(langCode) {
        const translations = this.translations[langCode] || this.translations.en;
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Update page title and meta description
        this.updatePageMeta(langCode, translations);

        // Update HTML lang attribute
        document.documentElement.lang = langCode;
    }

    updateLanguageSelector() {
        const currentLanguageFlag = document.getElementById('currentLanguageFlag');
        const currentLanguageName = document.getElementById('currentLanguageName');
        
        if (currentLanguageFlag && currentLanguageName) {
            const lang = this.languages[this.currentLanguage];
            currentLanguageFlag.textContent = lang.flag;
            currentLanguageName.textContent = lang.name;
        }

        // Update selected state in dropdown
        document.querySelectorAll('.language-option').forEach(option => {
            const langCode = option.dataset.lang;
            if (langCode === this.currentLanguage) {
                option.classList.add('bg-green-100', 'dark:bg-green-900');
                option.querySelector('span:last-child').textContent = '✓';
            } else {
                option.classList.remove('bg-green-100', 'dark:bg-green-900');
                option.querySelector('span:last-child').textContent = '';
            }
        });
    }

    updatePageMeta(langCode, translations) {
        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && translations.pageTitle) {
            titleElement.textContent = translations.pageTitle;
        }

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && translations.pageDescription) {
            metaDescription.setAttribute('content', translations.pageDescription);
        }
    }
}

// Initialize language selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageSelector = new LanguageSelector();
}); 