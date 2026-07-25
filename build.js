const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Buat folder dist jika belum ada
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Daftar file yang perlu di-copy
const filesToCopy = [
    'manifest.json',
    'content.js',
    'inject.js',
    'icon16.png',
    'icon48.png',
    'icon128.png'
];

console.log('🚀 Memulai proses build...\n');

// Copy semua file dari src ke dist
filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, distPath);
        console.log(`✅ ${file} berhasil di-copy`);
    } else {
        console.warn(`⚠️  ${file} tidak ditemukan`);
    }
});

console.log('\n✨ Build selesai! File tersedia di folder "dist"');
