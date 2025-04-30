class NoteItem extends HTMLElement {
    static get observedAttributes() {
        return ["id", "title", "body"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="note-card">
                <h3>${this.getAttribute("title") || "Tanpa Judul"}</h3>
                <p>${this.getAttribute("body") || "Tanpa Isi"}</p>
                <button class="delete-btn">🗑 Hapus</button>
            </div>
        `;

        this.querySelector(".delete-btn").addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("note-deleted", {
                detail: { noteId: this.getAttribute("id") },
                bubbles: true,
            }));
            this.remove();
        });
    }
}

customElements.define("note-item", NoteItem);
