const fs = require('fs');
const path = require('path');

const mappings = {
  // Slate to Slack Dark Theme
  '#0f1115': '#1a1d21', // main background
  '#12151a': '#19171d', // sidebar
  '#16191f': '#222529', // hover/active/cards
  '#1c2128': '#222529', // cards/borders
  '#0a0d14': '#1a1d21',
  '#090b11': '#19171d',
  '#0c0e14': '#19171d',
  '#050608': '#222529',
  '#05060a': '#222529',
  '#020305': '#000000',
  '#161a22': '#222529',
  '#161a26': '#1164A3', // Active blue
  'bg-bg-density-dark': 'bg-[#121016]', // top nav
  'bg-bg-density-sidebar': 'bg-[#19171d]',
  'bg-bg-density-tab': 'bg-[#1164A3]', // active channel background
  'bg-bg-density-card': 'bg-[#222529]'
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [oldVal, newVal] of Object.entries(mappings)) {
    // For hex codes, we usually look for `[#hex]` but let's just do a string replace for all hex strings
    if (oldVal.startsWith('#')) {
      const regex = new RegExp(`\\[${oldVal}\\]`, 'gi');
      if (regex.test(content)) {
        content = content.replace(regex, `[${newVal}]`);
        changed = true;
      }
    } else {
      const regex = new RegExp(oldVal, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newVal);
        changed = true;
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  });
}

walk('./src');
console.log('Done');
