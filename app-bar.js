class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="app-bar">
                <h1 class="app-title">My notes</h1>
            </header>
        `;
    }
}

customElements.define("app-bar", AppBar);
export default AppBar; // Tambahkan ini