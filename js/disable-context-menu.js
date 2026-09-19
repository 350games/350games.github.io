(() => {
    // Catch the event before any individual game control can handle it.
    document.addEventListener("contextmenu", (event) => event.preventDefault(), { capture: true });
})();
