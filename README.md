# Threads Tracker Extension

Chrome Extension untuk membantu melihat akun **Threads yang belum melakukan follow back (Non Mutual)** secara langsung di halaman Threads.

Extension akan muncul otomatis saat Anda membuka Threads dan menampilkan daftar akun yang Anda follow tetapi belum mengikuti Anda kembali.

[![Version](https://img.shields.io/badge/version-1.0.5-blue.svg)](https://github.com/dhohirpradana/threads-tracker/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Fitur

- ✅ Menampilkan daftar akun **Non Mutual** secara otomatis
- ✅ Tidak perlu membuka popup atau menu extension
- ✅ Berjalan langsung di halaman Threads
- ✅ Menggunakan sesi login Threads yang sudah ada
- ✅ Mendukung browser desktop dan Android (Quetta Browser)
- ✅ **Export daftar ke file .txt**
- ✅ **Auto-scroll dengan delay random (5-7 detik)**
- ✅ **UI yang clean dan user-friendly**
- ✅ **Optimasi performa dengan DOM caching**
- ✅ **Memory management yang baik**

---

## 🚀 Quick Start

### Option 1: Download Release (Recommended)
Download file ZIP terbaru dari [Releases](https://github.com/dhohirpradana/threads-tracker/releases), ekstrak, dan load ke browser.

### Option 2: Build dari Source
```bash
# Clone repository
git clone https://github.com/dhohirpradana/threads-tracker.git
cd threads-tracker

# Build extension
npm run build

# Hasilnya ada di folder dist/
```

---

# Instalasi (Desktop)

## 1. Download Extension

Buka halaman **Releases** dan download file ZIP terbaru:

https://github.com/dhohirpradana/threads-tracker/releases

Ekstrak file ZIP hingga muncul folder:

```
dist/
```

---

## 2. Buka Halaman Extension Chrome

Buka:

```
chrome://extensions/
```

Lalu aktifkan **Developer mode**.

---

## 3. Install Extension

Klik **Load unpacked**.

Pilih folder:

```
dist/
```

Jika berhasil, Threads Tracker akan muncul pada daftar Extensions.

---

# Instalasi (Android)

Extension juga dapat digunakan melalui **Quetta Browser**.

https://play.google.com/store/apps/details?id=net.quetta.browser&hl=id

## 1. Install Quetta Browser

Download dan install **Quetta Browser** dari Google Play Store.

---

## 2. Login ke Threads

Buka Quetta Browser, kemudian login ke akun Threads Anda.

---

## 3. Download Extension

Download file ZIP terbaru dari halaman Releases:

https://github.com/dhohirpradana/threads-tracker/releases

---

## 4. Load Extension

Masuk ke menu **Extensions** di Quetta Browser, lalu pilih **Load Extension** (atau **Load Unpacked**, tergantung versi).

Pilih folder hasil ekstrak ZIP (`dist`).

### Tampilan Quetta Browser

<p align="center">
  <img src="screenshots/android-quetta.png" alt="Quetta Browser Extension" width="350">
</p>

---

## 5. Refresh Threads

Buka atau refresh halaman Threads.

Extension akan berjalan otomatis dan menampilkan daftar akun yang **belum mengikuti Anda kembali (Non Mutual)**.

---

## 🛠️ Development

### Prerequisites
- Node.js (untuk build script)
- Git

### Build Commands
```bash
# Build extension
npm run build

# Build dan create ZIP
npm run zip
```

### Project Structure
```
non-mutual/
├── src/                    # Source files
│   ├── manifest.json       # Extension manifest
│   ├── content.js          # Content script loader
│   ├── inject.js           # Main logic (optimized)
│   └── icon*.png          # Icons
├── dist/                   # Build output (generated)
├── build.js               # Build script
├── package.json           # NPM configuration
├── CHANGELOG.md           # Version history
├── OPTIMIZATION.md        # Optimization details
└── README.md              # This file
```

---

# Cara Menggunakan

1. Login ke akun Threads.
2. Buka:

```
https://www.threads.com
```

3. Refresh halaman jika extension baru saja dipasang.

4. Tunggu beberapa saat hingga proses selesai.

Extension akan membaca data Following dan Followers, kemudian hanya menampilkan akun yang belum mengikuti Anda kembali.

---

# Update Extension

Jika terdapat versi terbaru:

1. Download ZIP terbaru dari halaman Releases.
2. Ganti folder extension yang lama.
3. Reload extension pada browser.

---

# Troubleshooting

### Panel tidak muncul

- Pastikan extension sudah aktif.
- Refresh halaman Threads.
- Pastikan sudah login ke Threads.

---

### Data belum muncul

Proses membutuhkan waktu beberapa saat, terutama jika jumlah Following cukup banyak.

---

### Data tidak lengkap

Kemungkinan disebabkan oleh:

- Koneksi internet tidak stabil.
- Threads belum selesai memuat seluruh daftar akun.
- Halaman ditutup sebelum proses selesai.

---

## 📈 Performance

Extension ini telah dioptimasi dengan:
- **DOM Caching** - Mengurangi DOM queries hingga 60-70%
- **DocumentFragment** - Rendering list 50-70% lebih cepat
- **Memory Management** - Cleanup yang proper
- **Modular Architecture** - Code yang maintainable

Lihat detail lengkap di [OPTIMIZATION.md](OPTIMIZATION.md)

---

## 🔄 Update Log

### Version 1.1.0 (Latest)
- ✨ Refactor kode dengan arsitektur modular
- 🚀 Optimasi performa signifikan
- 📦 Build automation dengan NPM scripts
- 📝 Dokumentasi lengkap

Lihat [CHANGELOG.md](CHANGELOG.md) untuk history lengkap.

---

# Keamanan

Extension ini:

- ✅ Tidak meminta username atau password.
- ✅ Tidak mengirim data ke server eksternal.
- ✅ Berjalan sepenuhnya di browser Anda.
- ✅ Menggunakan sesi login Threads yang sudah aktif.

---

## 🤝 Contributing

Contributions are welcome! Silakan:
1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/dhohirpradana/threads-tracker/issues)
- **Repository:** [GitHub Repo](https://github.com/dhohirpradana/threads-tracker)
- **Releases:** [Download Latest](https://github.com/dhohirpradana/threads-tracker/releases)

---

## ⭐ Show Your Support

Jika extension ini membantu Anda, jangan lupa kasih ⭐ di GitHub!

---

**Made with ❤️ by [dhohirpradana](https://github.com/dhohirpradana)**
