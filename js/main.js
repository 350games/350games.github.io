(() => {
    const bootGame = () => {
        const { initializeGame } = window.FNAE || {};

        if (typeof initializeGame !== "function") {
            const error = new Error("FNAE function files did not finish loading.");
            document.body.dataset.fnaeReady = "error";
            document.body.dataset.fnaeError = error.message;
            console.error("FNAE failed to initialize.", error);
            return;
        }

        initializeGame()
            .then(() => {
                document.body.dataset.fnaeReady = "true";
            })
            .catch((error) => {
                document.body.dataset.fnaeReady = "error";
                document.body.dataset.fnaeError = error instanceof Error ? error.message : String(error);
                console.error("FNAE failed to initialize.", error);
            });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootGame, { once: true });
    } else {
        bootGame();
    }
})();
