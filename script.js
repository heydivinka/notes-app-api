import "./styles.css";
import "./note-form.js";
import "./note-item.js";
import "./app-bar.js";
import Swal from "sweetalert2";

const API_URL = "https://notes-api.dicoding.dev/v2/notes";

async function loadNotes() {
    const notesContainer = document.getElementById("notes-container");

    if (!notesContainer) {
        console.error("❌ ERROR: Element #notes-container tidak ditemukan!");
        return;
    }

    notesContainer.innerHTML = "<p>Loading...</p>"; // Tampilkan indikator loading

    try {
        const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
        const result = await response.json();

        console.log("📥 Data dari API:", result); // Debugging API response

        // Hapus indikator loading setelah berhasil
        notesContainer.innerHTML = "";

        if (!result.data || result.data.length === 0) {
            notesContainer.innerHTML = "<p>Belum ada catatan.</p>";
            return;
        }

        result.data.forEach(note => {
            const noteItem = document.createElement("note-item");
            noteItem.setAttribute("id", note.id);
            noteItem.setAttribute("title", note.title);
            noteItem.setAttribute("body", note.body);
            notesContainer.appendChild(noteItem);
        });

    } catch (error) {
        notesContainer.innerHTML = "<p>Gagal memuat catatan!</p>";
        console.error("❌ ERROR: Gagal memuat catatan:", error);
    }
}


// ✅ Fungsi untuk menyimpan catatan ke API
async function saveNote(title, body) {
    if (!title || !body) {
        Swal.fire("Oops!", "Judul dan isi tidak boleh kosong!", "warning");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body })
        });

        if (!response.ok) {
            throw new Error("❌ ERROR: Gagal menambahkan catatan ke API");
        }

        Swal.fire("Sukses!", "Catatan berhasil ditambahkan!", "success");
        await loadNotes();
    } catch (error) {
        Swal.fire("Error", "Gagal menambahkan catatan!", "error");
        console.error("❌ ERROR: Gagal menambahkan catatan:", error);
    }
}

// ✅ Fungsi untuk menghapus catatan dari API
async function deleteNote(noteId) {
    try {
        await fetch(`${API_URL}/${noteId}`, { method: "DELETE" });
        Swal.fire("Deleted!", "Catatan berhasil dihapus.", "success");
        await loadNotes();
    } catch (error) {
        Swal.fire("Error", "Gagal menghapus catatan!", "error");
        console.error("❌ ERROR: Gagal menghapus catatan:", error);
    }
}

// ✅ Event Listener untuk Tambah & Hapus Catatan
document.addEventListener("note-added", async (event) => {
    const { title, body } = event.detail;
    await saveNote(title, body);
});

document.addEventListener("note-deleted", async (event) => {
    const { noteId } = event.detail;
    await deleteNote(noteId);
});

// ✅ Load catatan saat aplikasi dimulai
window.onload = () => {
    console.log("🚀 Aplikasi dimulai! Memuat catatan...");
    loadNotes();
};
