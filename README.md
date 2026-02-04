# Notes App Backend

Aplikasi backend untuk pengelolaan catatan (Notes) yang dibangun menggunakan Node.js dan Express.js sebagai bagian dari kelas Backend Fundamental di Dicoding. Proyek ini menggunakan PostgreSQL sebagai database dan mendukung operasi CRUD lengkap.

## 🚀 Fitur

- **Tambah Catatan**: Membuat catatan baru dengan judul, isi, dan tag.
- **Daftar Catatan**: Mengambil semua catatan yang tersimpan (tersedia filter berdasarkan judul).
- **Detail Catatan**: Melihat informasi detail catatan berdasarkan ID.
- **Perbarui Catatan**: Mengubah konten catatan yang sudah ada.
- **Hapus Catatan**: Menghapus catatan berdasarkan ID.
- **Validasi Input**: Menggunakan Joi schema untuk memastikan data yang masuk valid.
- **Penanganan Error**: Sistem error handling global yang konsisten.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Migrasi Database**: [node-pg-migrate](https://salsita.github.io/node-pg-migrate/)
- **Validasi**: [Joi](https://joi.dev/)
- **ID Generator**: [nanoid](https://github.com/ai/nanoid)

## 📋 Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

- Node.js (v14 atau lebih baru)
- PostgreSQL

## ⚙️ Konfigurasi

1. Salin file `.env.example` (jika ada) atau buat file `.env` baru di root direktori.
2. Atur variabel lingkungan berikut sesuai dengan konfigurasi database Anda:

```env
# Server Configuration
HOST=localhost
PORT=5000

# Database Configuration
PGUSER=developer
PGHOST=localhost
PGPASSWORD=supersecretpassword
PGDATABASE=notesapp
PGPORT=5432
```

## 🚀 Cara Menjalankan

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Migrasi Database
Pastikan database PostgreSQL sudah dibuat sesuai dengan nama di `.env`, lalu jalankan migrasi:
```bash
npm run migrate up
```

### 3. Menjalankan Server

**Mode Pengembangan (dengan nodemon):**
```bash
npm run start:dev
```

**Mode Produksi:**
```bash
npm run start:prod
```

Server akan berjalan di `http://localhost:5000` (atau port yang Anda tentukan).

## 🛣️ API Endpoints

| Method     | Endpoint     | Deskripsi                               |
| :--------- | :----------- | :-------------------------------------- |
| **POST**   | `/notes`     | Menambahkan catatan baru                |
| **GET**    | `/notes`     | Mengambil semua catatan                 |
| **GET**    | `/notes/:id` | Mengambil detail catatan berdasarkan ID |
| **PUT**    | `/notes/:id` | Memperbarui catatan berdasarkan ID      |
| **DELETE** | `/notes/:id` | Menghapus catatan berdasarkan ID        |

## 🧪 Pengujian

Tersedia skrip pengujian API sederhana menggunakan `test.js`. Pastikan server sudah berjalan sebelum menjalankan tes:

```bash
node test.js
```

Skrip ini akan menguji skenario berikut:
- Menambah catatan (Payload valid & tidak valid).
- Mengambil semua catatan.
- Mengambil detail catatan berdasarkan ID.
- Memperbarui catatan.
- Menghapus catatan.
- Verifikasi status 404 untuk catatan yang sudah dihapus.

## 📂 Struktur Proyek

```text
.
├── migrations/         # File migrasi database
├── src/
│   ├── exceptions/     # Custom error classes
│   ├── middlewares/    # Express middlewares (Validation, Error Handling)
│   ├── routes/         # Definisi rute API
│   ├── server/         # Inisialisasi Express app
│   ├── services/       # Logika bisnis (Controller, Repository, Validator)
│   ├── utils/          # Fungsi utilitas (Response formatter)
│   └── server.js       # Entry point aplikasi
├── .env                # Variabel lingkungan
└── package.json        # Konfigurasi npm dan dependensi
```

## 📝 Lisensi
Proyek ini dilisensikan di bawah [ISC License](https://opensource.org/licenses/ISC).
