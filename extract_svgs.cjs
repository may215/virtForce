const fs = require('fs');

try {
  let readme = fs.readFileSync('README.md', 'utf8');

  // The regex to match <p align="center"> ... <svg ... </svg> ... </p>
  const regex = /<p align="center">\s*<svg([\s\S]*?)<\/svg>\s*<\/p>/g;

  let count = 1;
  const names = ['canvas', 'sandbox', 'crawler', 'multica'];

  readme = readme.replace(regex, (match) => {
    const name = names[count - 1] || `diagram-${count}`;
    const filename = `assets/${name}.svg`;
    
    // Extract just the svg part
    const svgMatch = match.match(/<svg[\s\S]*?<\/svg>/);
    if (svgMatch) {
      fs.writeFileSync(filename, svgMatch[0]);
      console.log(`Saved ${filename}`);
    }
    
    count++;
    return `<p align="center">\n  <img src="./assets/${name}.svg" alt="${name} diagram" width="100%" />\n</p>`;
  });

  fs.writeFileSync('README.md', readme);
  console.log('README.md updated');
} catch (e) {
  console.error(e);
}
