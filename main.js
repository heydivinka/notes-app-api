const STORAGE_KEY = "notes";

/**
 * Mengambil catatan dari API.
 * @returns {Array} Daftar catatan yang tersimpan.
 */
async function loadNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "<p>Loading...</p>"; // Indikator loading

    try {
        const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
        const result = await response.json();

        notesContainer.innerHTML = ""; // Hapus indikator loading

        result.data.forEach(note => {
            const noteItem = document.createElement("note-item");
            noteItem.setAttribute("title", note.title);
            noteItem.setAttribute("body", note.body);
            noteItem.setAttribute("category", "Umum"); // API tidak memiliki kategori
            notesContainer.appendChild(noteItem);
        });

    } catch (error) {
        notesContainer.innerHTML = "<p>Gagal memuat catatan!</p>";
        console.error("Error loading notes:", error);
    }
}

// Hapus data dummy karena sudah tidak diperlukan
