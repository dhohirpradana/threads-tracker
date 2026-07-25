# Changelog

All notable changes to this project will be documented in this file.

## [1.0.5] - 2026-07-25

### 🚀 Improved
- **Refactor kode inject.js** dengan arsitektur modular yang lebih baik
- **Optimasi performa** dengan DOM caching untuk mengurangi DOM queries berulang
- **Implementasi DocumentFragment** untuk rendering list yang lebih cepat
- **Separation of concerns** dengan pembagian logika ke modules (utils, dataManager, uiManager, scrollManager, actions)
- **Memory management** yang lebih baik dengan cleanup URL.revokeObjectURL

### ✨ Added
- Konstanta konfigurasi terpusat di `CONFIG` object
- State management yang lebih terstruktur
- Build script untuk automasi packaging
- .gitignore untuk pengelolaan repository
- CHANGELOG untuk dokumentasi perubahan

### 🔧 Enhanced
- Manifest v3 compliance dengan host_permissions yang lebih spesifik
- Support untuk threads.net dan threads.com
- Metadata tambahan (author, homepage_url)
- Code organization yang lebih maintainable

## [1.0.4] - Previous Release

### Features
- Auto-scroll dengan random delay 5-7 detik
- Tracking unfollowers di Threads
- Export daftar ke file .txt
- Modal viewer untuk daftar unfollowers
- Support desktop dan Android (Quetta Browser)
