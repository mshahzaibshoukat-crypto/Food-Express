const fs = require('fs');

const sourcePath = 'C:\\Users\\MCC\\.gemini\\antigravity\\brain\\30a9ff8c-6f05-4510-80b6-1b3e9c5002a8\\onion_rings_1777835638298.png';
const destPath = './O.R.png';

try {
    fs.copyFileSync(sourcePath, destPath);
    console.log('✅ Onion Rings image successfully restored to O.R.png!');
} catch (error) {
    console.error('❌ Failed to copy image:', error.message);
}
