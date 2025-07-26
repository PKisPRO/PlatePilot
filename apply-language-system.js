// Script to automatically apply language system to all HTML files
// This script can be run to add language support to existing HTML files

const fs = require('fs');
const path = require('path');

// Function to add language system scripts to HTML files
function addLanguageSystemToHTML(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if language system is already added
        if (content.includes('language-selector.js')) {
            console.log(`Language system already exists in ${filePath}`);
            return;
        }
        
        // Add language system scripts after Tailwind CSS
        const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';
        const languageScripts = `
    <!-- Language System -->
    <script src="translations.js"></script>
    <script src="translations-extended.js"></script>
    <script src="translations-more.js"></script>
    <script src="language-selector.js"></script>`;
        
        content = content.replace(tailwindScript, tailwindScript + languageScripts);
        
        // Add data-translate attributes to common elements
        content = addTranslationAttributes(content);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Language system added to ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

// Function to add data-translate attributes to common elements
function addTranslationAttributes(content) {
    // Navigation links
    content = content.replace(
        /<a href="index\.html"[^>]*>Home<\/a>/g,
        '<a href="index.html" data-translate="home">Home</a>'
    );
    content = content.replace(
        /<a href="recipes\.html"[^>]*>Recipes<\/a>/g,
        '<a href="recipes.html" data-translate="recipes">Recipes</a>'
    );
    content = content.replace(
        /<a href="leaderboard\.html"[^>]*>Leaderboard<\/a>/g,
        '<a href="leaderboard.html" data-translate="leaderboard">Leaderboard</a>'
    );
    content = content.replace(
        /<a href="upload-recipe\.html"[^>]*>Share Recipe<\/a>/g,
        '<a href="upload-recipe.html" data-translate="shareRecipe">Share Recipe</a>'
    );
    content = content.replace(
        /<a href="games\.html"[^>]*>Games<\/a>/g,
        '<a href="games.html" data-translate="games">Games</a>'
    );
    content = content.replace(
        /<a href="secret-recipes\.html"[^>]*>Secret Recipes<\/a>/g,
        '<a href="secret-recipes.html" data-translate="secretRecipes">Secret Recipes</a>'
    );
    content = content.replace(
        /<a href="diet-planner\.html"[^>]*>Diet Planner<\/a>/g,
        '<a href="diet-planner.html" data-translate="dietPlanner">Diet Planner</a>'
    );
    
    // Footer links
    content = content.replace(
        /<h4[^>]*>Quick Links<\/h4>/g,
        '<h4 data-translate="quickLinks">Quick Links</h4>'
    );
    content = content.replace(
        /<h4[^>]*>Contact<\/h4>/g,
        '<h4 data-translate="contact">Contact</h4>'
    );
    content = content.replace(
        /<h4[^>]*>Follow Us<\/h4>/g,
        '<h4 data-translate="followUs">Follow Us</h4>'
    );
    
    // Footer content
    content = content.replace(
        /Email: platepilot\.11@gmail\.com/g,
        '<span data-translate="email">Email: platepilot.11@gmail.com</span>'
    );
    content = content.replace(
        /Phone: \+91 9251681626/g,
        '<span data-translate="phone">Phone: +91 9251681626</span>'
    );
    content = content.replace(
        /Facebook/g,
        '<span data-translate="facebook">Facebook</span>'
    );
    content = content.replace(
        /Twitter/g,
        '<span data-translate="twitter">Twitter</span>'
    );
    content = content.replace(
        /Instagram/g,
        '<span data-translate="instagram">Instagram</span>'
    );
    
    // Copyright
    content = content.replace(
        /&copy; 2024 PlatePilot\. All rights reserved\./g,
        '<span data-translate="copyright">&copy; 2024 PlatePilot. All rights reserved.</span>'
    );
    
    return content;
}

// Function to find all HTML files in a directory
function findHTMLFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...findHTMLFiles(fullPath));
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main execution
function main() {
    console.log('🚀 Starting language system application...\n');
    
    const currentDir = process.cwd();
    const htmlFiles = findHTMLFiles(currentDir);
    
    console.log(`Found ${htmlFiles.length} HTML files:`);
    htmlFiles.forEach(file => console.log(`  - ${path.relative(currentDir, file)}`));
    console.log('');
    
    let processedCount = 0;
    let skippedCount = 0;
    
    for (const file of htmlFiles) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            
            if (content.includes('language-selector.js')) {
                console.log(`⏭️  Skipping ${path.relative(currentDir, file)} (already has language system)`);
                skippedCount++;
            } else {
                addLanguageSystemToHTML(file);
                processedCount++;
            }
        } catch (error) {
            console.error(`❌ Error reading ${file}:`, error.message);
        }
    }
    
    console.log('\n📊 Summary:');
    console.log(`  ✅ Processed: ${processedCount} files`);
    console.log(`  ⏭️  Skipped: ${skippedCount} files`);
    console.log(`  📁 Total: ${htmlFiles.length} files`);
    
    if (processedCount > 0) {
        console.log('\n🎉 Language system has been successfully applied!');
        console.log('\n📝 Next steps:');
        console.log('  1. Test the language selector on your pages');
        console.log('  2. Add more data-translate attributes as needed');
        console.log('  3. Customize translations for your specific content');
        console.log('  4. Test with different languages');
    } else {
        console.log('\nℹ️  No files were processed. All files may already have the language system.');
    }
}

// Run the script if called directly
if (require.main === module) {
    main();
}

module.exports = {
    addLanguageSystemToHTML,
    addTranslationAttributes,
    findHTMLFiles
}; 