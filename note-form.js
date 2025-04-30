class NoteForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <form id="note-form">
                <input type="text" id="title" placeholder="Your Title" required>
                <textarea id="body" placeholder="Write your notes here" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;

        this.querySelector("#note-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = this.querySelector("#title").value;
            const body = this.querySelector("#body").value;

            this.dispatchEvent(new CustomEvent("note-added", {
                detail: { title, body },
                bubbles: true
            }));

            this.querySelector("#title").value = "";
            this.querySelector("#body").value = "";
        });
    }
}

customElements.define("note-form", NoteForm);
if (!customElements.get("note-form")) {
    customElements.define("note-form", NoteForm);
}
