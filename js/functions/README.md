# FNAE function files

Every gameplay behavior has its own JavaScript file and is grouped by responsibility:

- `assets/` — assigning and preloading game resources
- `audio/` — click, volume, and looped-audio behavior
- `camera/` — monitor, flicker, health, repair, and camera controls
- `controls/` — one setup file per UI control or keyboard shortcut
- `ending/` — night-five and night-six sequences
- `enemy/` — enemy movement, lure behavior, and jumpscare
- `night/` — night lifecycle, timer, and phone call
- `power/` — power drain, bars, and the power cheat
- `scene/` — office/camera rendering and office-pan animation

`fnae.html` lists the shared data/state files first, then each function file, then
`js/main.js` to start the game. The files share the small `window.FNAE` namespace so
they can load directly from `file://` in a browser, matching the original standalone
HTML behavior without merging the functions back into one file.

`data/game-config.json` remains the readable configuration file. Its browser-readable
counterpart, `data/game-config.js`, exposes the same configuration for direct HTML
launches because browsers block JSON module imports from local `file://` pages.
