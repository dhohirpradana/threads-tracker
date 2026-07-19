# Threads Tracker Extension

Chrome Extension sederhana untuk membantu melihat akun **Threads yang belum melakukan follow back (Non Mutual)** secara langsung di halaman Threads.

Extension akan muncul otomatis saat Anda membuka Threads dan menampilkan daftar akun yang Anda follow tetapi belum mengikuti Anda kembali.

---

## ✨ Fitur

- Menampilkan daftar akun **Non Mutual** secara otomatis.
- Tidak perlu membuka popup atau menu extension.
- Berjalan langsung di halaman Threads.
- Menggunakan sesi login Threads yang sudah ada.
- Mudah dipasang tanpa konfigurasi tambahan.

---

# Instalasi

## 1. Download Extension

Download project dari GitHub:

**Repository:**

```text
https://github.com/dhohirpradana/threads-tracker
```

Atau menggunakan Git:

```bash
git clone https://github.com/dhohirpradana/threads-tracker.git
```

Jika mengunduh ZIP, ekstrak terlebih dahulu hingga menjadi sebuah folder.

---

## 2. Buka Halaman Extension Chrome

Buka Chrome lalu masuk ke:

```
chrome://extensions/
```

Atau melalui:

**⋮ → Extensions → Manage Extensions**

---

## 3. Aktifkan Developer Mode

Di pojok kanan atas, aktifkan **Developer mode**.

---

## 4. Install Extension

Klik **Load unpacked**.

Kemudian pilih folder:

```
dist/
```

Contoh struktur project:

```
threads-tracker/
├── src/
├── dist/
│   ├── manifest.json
│   ├── content.js
│   ├── inject.js
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── build.js
└── package.json
```

Pastikan yang dipilih adalah folder **dist**
Jika berhasil, extension akan muncul pada daftar Extensions.

---

# Cara Menggunakan

1. Login ke akun Threads Anda.

2. Buka halaman:

```
https://www.threads.com
```

3. Tidak perlu melakukan apa pun.

Extension akan otomatis berjalan dan menampilkan panel **Threads Tracker** di halaman Threads.

4. Tunggu beberapa saat hingga proses selesai.

Extension akan mengambil data Following dan Followers, kemudian hanya menampilkan akun yang **belum mengikuti Anda kembali (Non Mutual)**.

---

# Update Extension

Jika terdapat pembaruan di GitHub:

1. Pull repository atau download versi terbaru.
2. Buka:

```
chrome://extensions/
```

3. Klik tombol **Reload** pada extension **Threads Tracker**.

Selesai.

---

# Troubleshooting

### Panel tidak muncul

- Pastikan extension sudah aktif.
- Refresh halaman Threads.
- Pastikan Anda sudah login ke Threads.

---

### Data belum muncul

Proses membutuhkan waktu beberapa saat, terutama jika jumlah Following cukup banyak.

Silakan tunggu hingga proses selesai.

---

### Data tidak lengkap

Kemungkinan disebabkan oleh:

- Koneksi internet tidak stabil.
- Threads belum selesai memuat seluruh daftar akun.
- Halaman ditutup atau di-refresh sebelum proses selesai.

---

# Keamanan

Extension ini:

- ✅ Tidak meminta username atau password.
- ✅ Tidak mengirim data ke server eksternal.
- ✅ Berjalan sepenuhnya di browser Anda.
- ✅ Menggunakan sesi login Threads yang sudah aktif.

---

# Repository

GitHub:

**https://github.com/dhohirpradana/threads-tracker**

---

Semoga extension ini dapat membantu Anda mengelola daftar Following dengan lebih mudah.