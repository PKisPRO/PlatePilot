#!/bin/bash

# Script to apply language system to all recipe pages
echo "🌍 Applying language system to recipe pages..."

# List of recipe pages to update
recipe_pages=(
    "overnight-oats.html"
    "chickpea-curry.html"
    "vegetable-biryani.html"
    "quinoa-bowl.html"
    "mediterranean-salad.html"
    "lentil-soup.html"
    "idli-sambar.html"
    "dosa-chutney.html"
    "upma.html"
    "vegetable-pulao.html"
    "vegetable-stir-fry.html"
    "mushroom-risotto.html"
    "avocado-toast.html"
    "greek-yogurt-parfait.html"
    "chia-pudding.html"
    "super-green-smoothie.html"
    "golden-turmeric-latte.html"
    "tofu-scramble.html"
    "black-bean-tacos.html"
    "grilled-salmon.html"
    "quinoa-stuffed-bell-peppers.html"
    "sweet-potato-buddha-bowl.html"
    "tofu-stir-fry.html"
    "millet-khichdi.html"
    "rainbow-buddha-bowl.html"
    "quinoa-buddha-bowl.html"
    "vegetable-poha.html"
    "vegetable-pasta.html"
    "vegetable-soup.html"
    "avocado-mousse.html"
    "veggie-stir-fry.html"
)

# Language system scripts to add
language_scripts="    <!-- Language System -->
    <script src=\"translations.js\"></script>
    <script src=\"translations-extended.js\"></script>
    <script src=\"translations-more.js\"></script>
    <script src=\"language-selector.js\"></script>"

# Navigation with data-translate attributes
nav_with_translate="                <div class=\"hidden md:flex items-center space-x-8\">
                    <a href=\"index.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.home\">Home</a>
                    <a href=\"recipes.html\" class=\"text-green-600 dark:text-green-400 font-medium\" data-translate=\"nav.recipes\">Recipes</a>
                    <a href=\"upload-recipe.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.share_recipe\">Share Recipe</a>
                    <a href=\"games.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.games\">Games</a>
                    <a href=\"secret-recipes.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.secret_recipes\">Secret Recipes</a>
                    <a href=\"diet-planner.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.diet_planner\">Diet Planner</a>
                    <!-- Language Selector will be inserted here by JavaScript -->
                    <button onclick=\"toggleDarkMode()\" class=\"p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors\">
                        <span class=\"dark:hidden\">🌙</span>
                        <span class=\"hidden dark:inline\">☀️</span>
                    </button>
                </div>"

# Mobile menu with data-translate attributes
mobile_menu_with_translate="            <!-- Mobile Menu -->
            <div id=\"mobileMenu\" class=\"md:hidden hidden pb-4\">
                <div class=\"flex flex-col space-y-4\">
                    <a href=\"index.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.home\">Home</a>
                    <a href=\"recipes.html\" class=\"text-green-600 dark:text-green-400 font-medium\" data-translate=\"nav.recipes\">Recipes</a>
                    <a href=\"upload-recipe.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.share_recipe\">Share Recipe</a>
                    <a href=\"games.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.games\">Games</a>
                    <a href=\"secret-recipes.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.secret_recipes\">Secret Recipes</a>
                    <a href=\"diet-planner.html\" class=\"text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors\" data-translate=\"nav.diet_planner\">Diet Planner</a>
                </div>
            </div>"

# Function to update a recipe page
update_recipe_page() {
    local file="$1"
    local recipe_key="$2"
    
    echo "📝 Updating $file..."
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Add language scripts after tailwind config
    sed -i '' '/tailwind\.config = {/,/}/ {
        /}/ a\
'"$language_scripts"'
    }' "$file"
    
    # Update navigation with data-translate attributes
    sed -i '' '/<div class="hidden md:flex items-center space-x-8">/,/<\/div>/c\
'"$nav_with_translate"'
    ' "$file"
    
    # Update mobile menu with data-translate attributes
    sed -i '' '/<!-- Mobile Menu -->/,/<\/div>/c\
'"$mobile_menu_with_translate"'
    ' "$file"
    
    # Add data-translate to recipe title and description
    sed -i '' 's/<h1 class="[^"]*">[^<]*<\/h1>/<h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4" data-translate="recipe.'"$recipe_key"'.title">'"$(grep -o '<h1[^>]*>[^<]*</h1>' "$file" | sed 's/<[^>]*>//g')"'<\/h1>/' "$file"
    
    sed -i '' 's/<p class="[^"]*">[^<]*<\/p>/<p class="text-xl text-gray-600 dark:text-gray-300 mb-8" data-translate="recipe.'"$recipe_key"'.description">'"$(grep -o '<p class="[^"]*">[^<]*</p>' "$file" | head -1 | sed 's/<[^>]*>//g')"'<\/p>/' "$file"
    
    echo "✅ Updated $file"
}

# Update each recipe page
for page in "${recipe_pages[@]}"; do
    if [ -f "$page" ]; then
        # Extract recipe key from filename
        recipe_key=$(echo "$page" | sed 's/\.html$//' | sed 's/-/_/g')
        update_recipe_page "$page" "$recipe_key"
    else
        echo "⚠️  File $page not found, skipping..."
    fi
done

echo "🎉 Language system applied to recipe pages!"
echo "📋 Updated files:"
for page in "${recipe_pages[@]}"; do
    if [ -f "$page" ]; then
        echo "   ✅ $page"
    fi
done 