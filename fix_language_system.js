const fs = require('fs');
const path = require('path');

// Function to properly add language system to a page
function fixLanguageSystem(filePath) {
    console.log(`🔧 Fixing language system for: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Add language scripts after tailwind config
    if (!content.includes('language-selector.js')) {
        const scriptInsertion = `    <!-- Language System -->
    <script src="translations.js"></script>
    <script src="translations-extended.js"></script>
    <script src="translations-more.js"></script>
    <script src="language-selector.js"></script>`;
        
        content = content.replace(
            /(\s*<\/script>\s*)(<\/head>)/,
            `$1${scriptInsertion}$2`
        );
    }
    
    // 2. Fix navigation with proper data-translate attributes
    const navWithTranslate = `                <div class="hidden md:flex items-center space-x-8">
                    <a href="index.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.home">Home</a>
                    <a href="recipes.html" class="text-green-600 dark:text-green-400 font-medium" data-translate="nav.recipes">Recipes</a>
                    <a href="upload-recipe.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.share_recipe">Share Recipe</a>
                    <a href="games.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.games">Games</a>
                    <a href="secret-recipes.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.secret_recipes">Secret Recipes</a>
                    <a href="diet-planner.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.diet_planner">Diet Planner</a>
                    <!-- Language Selector will be inserted here by JavaScript -->
                    <button onclick="toggleDarkMode()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        <span class="dark:hidden">🌙</span>
                        <span class="hidden dark:inline">☀️</span>
                    </button>
                </div>`;
    
    content = content.replace(
        /<div class="hidden md:flex items-center space-x-8">[\s\S]*?<\/div>/,
        navWithTranslate
    );
    
    // 3. Fix mobile menu with data-translate attributes
    const mobileMenuWithTranslate = `            <!-- Mobile Menu -->
            <div id="mobileMenu" class="md:hidden hidden pb-4">
                <div class="flex flex-col space-y-4">
                    <a href="index.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.home">Home</a>
                    <a href="recipes.html" class="text-green-600 dark:text-green-400 font-medium" data-translate="nav.recipes">Recipes</a>
                    <a href="upload-recipe.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.share_recipe">Share Recipe</a>
                    <a href="games.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.games">Games</a>
                    <a href="secret-recipes.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.secret_recipes">Secret Recipes</a>
                    <a href="diet-planner.html" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors" data-translate="nav.diet_planner">Diet Planner</a>
                </div>
            </div>`;
    
    content = content.replace(
        /<!-- Mobile Menu -->[\s\S]*?<\/div>/,
        mobileMenuWithTranslate
    );
    
    // 4. Remove incorrect data-translate attributes
    content = content.replace(/data-translate="recipe\.overnight_oats\.description"/g, '');
    content = content.replace(/data-translate="recipe\.chickpea_curry\.description"/g, '');
    content = content.replace(/data-translate="recipe\.vegetable_biryani\.description"/g, '');
    
    // 5. Add proper data-translate attributes to footer elements
    content = content.replace(
        /<h3 class="text-xl font-bold mb-4">PlatePilot<\/h3>/,
        '<h3 class="text-xl font-bold mb-4" data-translate="footer.tagline">PlatePilot</h3>'
    );
    
    content = content.replace(
        /<h4 class="font-semibold mb-4">Quick Links<\/h4>/,
        '<h4 class="font-semibold mb-4" data-translate="footer.quick_links">Quick Links</h4>'
    );
    
    content = content.replace(
        /<h4 class="font-semibold mb-4">Contact<\/h4>/,
        '<h4 class="font-semibold mb-4" data-translate="footer.contact">Contact</h4>'
    );
    
    content = content.replace(
        /<h4 class="font-semibold mb-4">Follow Us<\/h4>/,
        '<h4 class="font-semibold mb-4" data-translate="footer.follow_us">Follow Us</h4>'
    );
    
    content = content.replace(
        /<li>Email: platepilot\.11@gmail\.com<\/li>/,
        '<li data-translate="footer.email">Email: platepilot.11@gmail.com</li>'
    );
    
    content = content.replace(
        /<li>Phone: \+91 9251681626<\/li>/,
        '<li data-translate="footer.phone">Phone: +91 9251681626</li>'
    );
    
    content = content.replace(
        /<a href="#" class="text-gray-400 hover:text-white transition-colors">Facebook<\/a>/,
        '<a href="#" class="text-gray-400 hover:text-white transition-colors" data-translate="footer.facebook">Facebook</a>'
    );
    
    content = content.replace(
        /<a href="#" class="text-gray-400 hover:text-white transition-colors">Twitter<\/a>/,
        '<a href="#" class="text-gray-400 hover:text-white transition-colors" data-translate="footer.twitter">Twitter</a>'
    );
    
    content = content.replace(
        /<a href="#" class="text-gray-400 hover:text-white transition-colors">Instagram<\/a>/,
        '<a href="#" class="text-gray-400 hover:text-white transition-colors" data-translate="footer.instagram">Instagram</a>'
    );
    
    content = content.replace(
        /<p>&copy; 2024 PlatePilot\. All rights reserved\.<\/p>/,
        '<p data-translate="footer.copyright">&copy; 2024 PlatePilot. All rights reserved.</p>'
    );
    
    // 6. Add language system initialization script
    const languageInitScript = `
        // Initialize language system
        document.addEventListener('DOMContentLoaded', function() {
            if (window.languageSelector) {
                window.languageSelector.init();
            }
        });
    `;
    
    if (!content.includes('languageSelector.init()')) {
        content = content.replace(
            /(\s*<\/script>\s*)(<\/body>)/,
            `$1${languageInitScript}$2`
        );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
}

// List of files to fix
const filesToFix = [
    'overnight-oats.html',
    'chickpea-curry.html',
    'vegetable-biryani.html',
    'quinoa-bowl.html',
    'mediterranean-salad.html',
    'lentil-soup.html',
    'idli-sambar.html',
    'dosa-chutney.html',
    'upma.html',
    'vegetable-pulao.html',
    'vegetable-stir-fry.html',
    'mushroom-risotto.html',
    'avocado-toast.html',
    'greek-yogurt-parfait.html',
    'chia-pudding.html',
    'super-green-smoothie.html',
    'golden-turmeric-latte.html',
    'tofu-scramble.html',
    'black-bean-tacos.html',
    'grilled-salmon.html',
    'quinoa-stuffed-bell-peppers.html',
    'sweet-potato-buddha-bowl.html',
    'tofu-stir-fry.html',
    'millet-khichdi.html',
    'rainbow-buddha-bowl.html',
    'quinoa-buddha-bowl.html',
    'vegetable-poha.html',
    'vegetable-pasta.html',
    'vegetable-soup.html',
    'avocado-mousse.html',
    'veggie-stir-fry.html',
    'diet-planner.html',
    'games.html',
    'recipes.html'
];

// Fix all files
console.log('🔧 Starting language system fixes...\n');

filesToFix.forEach(file => {
    if (fs.existsSync(file)) {
        fixLanguageSystem(file);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n🎉 Language system fixes completed!');
console.log('📋 Files processed:', filesToFix.length); 