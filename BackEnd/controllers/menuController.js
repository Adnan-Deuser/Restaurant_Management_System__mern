const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '../../FrontEnd/src/constants/index.jsx');

exports.addCategory = (req, res, next) => {
    try {
        const { name, icon, color1, color2 } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Category Name is required" });

        let content = fs.readFileSync(constantsPath, 'utf-8');
        
        // Convert name to camelCase for the array variable
        const varName = name.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
             return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        
        // Add new empty array export before export const menus
        const newArrayStr = `\nexport const ${varName} = [];\n\n`;
        content = content.replace(/export const menus = \[/, newArrayStr + 'export const menus = [');
        
        // Determine new ID for menus
        const menuMatch = content.match(/export const menus = \[\s*([\s\S]*?)\n\]/);
        if (menuMatch) {
            const menuContent = menuMatch[1];
            const matches = [...menuContent.matchAll(/{ id: (\d+),/g)];
            const maxId = matches.length > 0 ? Math.max(...matches.map(m => parseInt(m[1]))) : 0;
            const newId = maxId + 1;
            
            const newItem = `\n{ id: ${newId}, name: "${name}", bgColor: "linear-gradient(135deg, ${color1 || '#222'}, ${color2 || '#444'})", icon: "${icon || '🍽️'}", items: ${varName} }`;
            
            // Insert before the last bracket
            content = content.replace(/export const menus = \[\s*([\s\S]*?)\]/, (match, p1) => {
                 let inner = p1.trimEnd();
                 if (inner && !inner.endsWith(',')) inner += ',';
                 return `export const menus = [\n${inner}${newItem}\n]`;
            });
        }
        
        fs.writeFileSync(constantsPath, content);
        res.status(200).json({ success: true, message: "Category Added manually to constants file!" });
    } catch(err) {
        next(err);
    }
}

exports.addDish = (req, res, next) => {
    try {
         const { categoryName, name, price, categoryType } = req.body; 
         if (!categoryName || !name || !price || !categoryType) {
             return res.status(400).json({ success: false, message: "All fields are required" });
         }
         
         let content = fs.readFileSync(constantsPath, 'utf-8');
         
         // Find the variable name mapped to this category name in menus
         // Example: name: "Starters" -> items: startersItem
         const varRegex = new RegExp(`name:\\s*"${categoryName}"[^}]+items:\\s*([a-zA-Z0-9_]+)`);
         const varMatch = content.match(varRegex);
         
         if (!varMatch) {
             return res.status(404).json({ success: false, message: `Could not map category name '${categoryName}' to a variable array in index.jsx` });
         }
         
         const categoryVarName = varMatch[1];
         
         // Find max id in that array to assign new id
         const arrayRegex = new RegExp(`export const ${categoryVarName} = \\s*\\[([\\s\\S]*?)\\];?`);
         const match = content.match(arrayRegex);
         if (!match) {
             return res.status(404).json({ success: false, message: `Category array ${categoryVarName} not found in index.jsx` });
         }
         
         const innerContent = match[1];
         const idMatches = [...innerContent.matchAll(/id:\s*(\d+)/g)];
         const newId = idMatches.length > 0 ? Math.max(...idMatches.map(m => parseInt(m[1]))) + 1 : 1;
         
         const newDishStr = `\n  {\n    id: ${newId},\n    name: "${name}",\n    price: ${price},\n    category: "${categoryType}"\n  }`;
         
         content = content.replace(arrayRegex, (fullMatch, p1) => {
              let inner = p1.trimEnd();
              if (inner && !inner.endsWith(',')) inner += ',';
              return `export const ${categoryVarName} = [${inner}${newDishStr}\n];`;
         });
         
         fs.writeFileSync(constantsPath, content);
         res.status(200).json({ success: true, message: "Dish Added manually to constants file!" });
    } catch(err) {
         next(err);
    }
}
