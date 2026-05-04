const https = require('https');

https.get('https://www.inciaku.com/tr/akunu-bul/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // Look for API endpoints, json objects, etc.
        const scriptTags = data.match(/<script[\s\S]*?>[\s\S]*?<\/script>/gi) || [];
        
        console.log("Found", scriptTags.length, "script tags.");
        
        let foundData = false;
        scriptTags.forEach(tag => {
            if (tag.includes('models') || tag.includes('brands') || tag.includes('ajax') || tag.includes('api')) {
                // print a snippet of the tag
                console.log("Interesting Script Tag Snippet: ");
                console.log(tag.substring(0, 500));
                console.log("----------------------------");
                foundData = true;
            }
        });
        
        // Also look for AJAX URLs
        const urls = data.match(/https?:\/\/[^"'\s]+/g) || [];
        const apiUrls = urls.filter(url => url.includes('api') || url.includes('ajax') || url.includes('json') || url.includes('get'));
        console.log("API/AJAX URLs found:");
        console.log([...new Set(apiUrls)]);
    });
}).on('error', err => {
    console.error("HTTP Error:", err.message);
});
