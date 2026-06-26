const fs = require('fs');

let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');
content = content.replace(/onClick={onEnterDashboard}/g, 'onClick={() => onEnterDashboard()}');
fs.writeFileSync('src/components/LandingPage.tsx', content);
console.log('done');
