// Mengambil referensi elemen DOM
const form = document.getElementById('formdata');
const saveButton = document.getElementById('saveButton');
const productTable = document.getElementById('productTable').querySelector('tbody');

let productCount = 0; // Untuk nomor urut produk
let editIndex = null; // Menyimpan index baris yang sedang diedit

// Fungsi untuk menambahkan atau memperbarui produk
saveButton.addEventListener('click', function () {
    const kodeProduk = document.getElementById('kodeproduk').value.trim();
    const namaProduk = document.getElementById('nameProduk').value.trim();
    const harga = document.getElementById('harga').value.trim();
    const satuan = document.getElementById('satuan').value;
    const kategori = document.getElementById('kategori').value;
    const gambar = document.getElementById('gambar').value.trim();
    const stokAwal = document.getElementById('stokawal').value.trim();

    if (!kodeProduk || !namaProduk || !harga || !satuan || !kategori || !gambar || !stokAwal) {
        alert("Mohon isi semua data!");
        return;
    }

    const productData = {
        kodeProduk,
        namaProduk,
        harga,
        satuan,
        kategori,
        gambar,
        stokAwal
    };

    if (editIndex === null) {
        addProduct(productData);
    } else {
        updateProduct(editIndex, productData);
    }

    form.reset(); // Mengosongkan form
    editIndex = null; // Reset edit index
    saveButton.innerText = 'Simpan';
});


// Fungsi untuk menambahkan produk ke tabel
function addProduct(data) {
    productCount++;
    const row = productTable.insertRow();

    // Tentukan warna latar belakang berdasarkan stok awal
    const stokBgColor = data.stokAwal < 5 ? "red" : "green";
    const textColor = "white"; 

    row.innerHTML = `
        <td>${productCount}</td>
        <td>${data.kodeProduk}</td>
        <td>${data.namaProduk}</td>
        <td>${data.harga}</td>
        <td>${data.satuan}</td>
        <td>${data.kategori}</td>
        <td><img src="${data.gambar}" alt="Gambar Produk" width="50" height="50"></td>
        <td style="background-color: ${stokBgColor}; color: ${textColor}; font-weight: bold; text-align: center;">${data.stokAwal}</td>
        <td>
            <div style="display: flex; gap: 10px;">
                <button class="editButton" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Edit</button>
                <button class="deleteButton" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Hapus</button>
            </div>
        </td>
    `;

    // Event listener untuk tombol Edit
    row.querySelector('.editButton').addEventListener('click', function () {
        editIndex = row.rowIndex - 1;
        loadProductToForm(data, row.rowIndex);
    });

    // Event listener untuk tombol Hapus
    row.querySelector('.deleteButton').addEventListener('click', function () {
        deleteProduct(row.rowIndex);
    });
}

// Fungsi untuk memperbarui data produk
function updateProduct(index, data) {
    const row = productTable.rows[index];

    // Tentukan warna latar belakang baru berdasarkan stok yang diperbarui
    const stokBgColor = data.stokAwal < 5 ? "red" : "green";

    row.cells[1].innerText = data.kodeProduk;
    row.cells[2].innerText = data.namaProduk;
    row.cells[3].innerText = data.harga;
    row.cells[4].innerText = data.satuan;
    row.cells[5].innerText = data.kategori;
    row.cells[6].innerHTML = `<img src="${data.gambar}" alt="Gambar Produk" width="50" height="50">`;
    row.cells[7].style.backgroundColor = stokBgColor;
    row.cells[7].style.color = "white";
    row.cells[7].style.fontWeight = "bold";
    row.cells[7].style.textAlign = "center";
    row.cells[7].innerText = data.stokAwal;

    alert("Data produk berhasil diperbarui!");
}

// Fungsi untuk memuat data produk ke dalam form
function loadProductToForm(data, rowIndex) {
    document.getElementById('kodeproduk').value = data.kodeProduk;
    document.getElementById('nameProduk').value = data.namaProduk;
    document.getElementById('harga').value = data.harga;
    document.getElementById('satuan').value = data.satuan;
    document.getElementById('kategori').value = data.kategori;
    document.getElementById('gambar').value = data.gambar;
    document.getElementById('stokawal').value = data.stokAwal;

    saveButton.innerText = 'Perbarui';
}

// Fungsi untuk menghapus produk dari tabel
function deleteProduct(rowIndex) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        productTable.deleteRow(rowIndex - 1);
        productCount--;

        // Update nomor urut
        Array.from(productTable.rows).forEach((row, index) => {
            row.cells[0].innerText = index + 1;
        });

        alert("Produk berhasil dihapus!");
    }
}
