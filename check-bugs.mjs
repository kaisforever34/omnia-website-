const fs = require('fs');

function analyzeFile(file, content) {
  const issues = [];
  
  // Find all imports
  const importLines = content.split('\n').filter(l => l.trim().startsWith('import'));
  importLines.forEach(line => {
    // Named imports
    const namedMatch = line.match(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/);
    if (namedMatch) {
      namedMatch[1].split(',').forEach(name => {
        const cleanName = name.trim().split(/\s+as\s+/)[0].trim();
        if (!cleanName) return;
        // Count usage in content excluding the import line
        const regex = new RegExp(cleanName, 'g');
        const matches = content.split('\n').filter(l => l.trim() !== line.trim()).join('\n').match(regex) || [];
        if (matches.length === 0) issues.push('UNUSED_IMPORT: ' + cleanName + ' in ' + file);
      });
    }
    // Default imports
    const defaultMatch = line.match(/import\s+(\w+)\s+from\s*['"]([^'"]+)['"]/);
    if (defaultMatch && !line.includes('{')) {
      const name = defaultMatch[1];
      const regex = new RegExp(name, 'g');
      const matches = content.split('\n').filter(l => l.trim() !== line.trim()).join('\n').match(regex) || [];
      if (matches.length === 0) issues.push('UNUSED_IMPORT: ' + name + ' in ' + file);
    }
  });
  
  if (content.includes('console.log')) issues.push('CONSOLE_LOG in ' + file);
  return issues;
}

const files = [
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/pages/Home.jsx',
  'src/pages/Product.jsx',
  'src/pages/About.jsx',
  'src/pages/FAQ.jsx',
];

let total = 0;
files.forEach(f => {
  try {
    const c = fs.readFileSync(f, 'utf8');
    const issues = analyzeFile(f, c);
    if (issues.length > 0) {
      total += issues.length;
      console.log('\n' + f + ':');
      issues.forEach(i => console.log('  ' + i));
    }
  } catch(e) {
    console.log(f + ': READ_ERROR - ' + e.message);
  }
});

// Image references
console.log('\n--- IMAGE CHECK ---');
const imgFiles = ['src/pages/Home.jsx','src/pages/Product.jsx','src/pages/About.jsx','src/pages/FAQ.jsx'];
const knownImages = ['omnia-bottle.jpg','omnia-lifestyle.jpg','omnia-decorative.jpg','omnia-hero-bg.jpg'];
imgFiles.forEach(f => {
  const c = fs.readFileSync(f,'utf8');
  const refs = c.match(/src=["']\/images\/([^"']+)["']/g) || [];
  refs.forEach(r => {
    const name = r.match(/\/images\/([^"']+)$/)[1];
    const status = knownImages.includes(name) ? 'OK' : 'UNKNOWN';
    console.log('  ' + status + ': ' + name + ' in ' + f);
  });
});

// Aria labels check
console.log('\n--- ARIA CHECK ---');
['src/components/Navbar.jsx','src/pages/FAQ.jsx'].forEach(f => {
  const c = fs.readFileSync(f,'utf8');
  const buttons = (c.match(/<button/g)||[]).length;
  const ariaLabels = (c.match(/aria-label=/g)||[]).length;
  if (buttons > ariaLabels) console.log('  ' + f + ': ' + buttons + ' buttons, ' + ariaLabels + ' aria-labels (MISSING)');
});

console.log('\nTotal issues: ' + total);
