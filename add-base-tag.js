const fs = require('fs');
const path = require('path');

// The directory containing your HTML files
const htmlDir = './'; // Adjust this to your HTML files' directory
const baseHref = '/stemassiut/'; // Base path for GitHub Pages

// Function to add <base> tag to an HTML file
function addBaseTag(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('<base')) {
        console.log(`Base tag already exists in ${filePath}`);
        return;
    }

    // Regex to find the <head> tag
    const updatedContent = content.replace(
        /<head>/i,
        `<head>\n    <base href="${baseHref}">`
    );

    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Added base tag to ${filePath}`);
}

// Recursively process all files in a directory
function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            processDirectory(filePath); // Recurse into subdirectory
        } else if (file.endsWith('.html')) {
            addBaseTag(filePath); // Add base tag to HTML file
        }
    });
}

// Start processing the directory
processDirectory(htmlDir);