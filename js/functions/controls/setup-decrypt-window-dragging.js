(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupDecryptWindowDragging = function setupDecryptWindowDragging() {
    elements.decryptTitleBar.addEventListener("mousedown", (event) => {
        if (event.target.tagName === "BUTTON") return;

        state.isDraggingDecryptWindow = true;
        const rect = elements.decryptWindow.getBoundingClientRect();
        state.decryptDragOffsetX = event.clientX - rect.left;
        state.decryptDragOffsetY = event.clientY - rect.top;
    });

    document.addEventListener("mousemove", (event) => {
        if (!state.isDraggingDecryptWindow) return;

        elements.decryptWindow.style.left = `${event.clientX - state.decryptDragOffsetX}px`;
        elements.decryptWindow.style.top = `${event.clientY - state.decryptDragOffsetY}px`;
        elements.decryptWindow.style.transform = "none";
    });

    document.addEventListener("mouseup", () => {
        state.isDraggingDecryptWindow = false;
    });
}
})();
