const fs = require('fs');
function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if(!file.includes('node_modules')) results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.js') || file.endsWith('.py') || file.endsWith('.ps1')) results.push(file);
        }
    });
    return results;
}
console.log(walk('C:/Users/LENOVO/Desktop/Sentric_Website').join('\n'));
