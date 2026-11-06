# Ommer — Personal Portfolio

A two-page student portfolio built with HTML, CSS and JavaScript.

- `index.html` contains Ommer’s introduction, portrait and link to the second page.
- `about.html` contains his biography and the skills he is developing.
- `styles.css` contains the shared editorial styling and responsive layout.
- `script.js` controls the optional opening sequence.
- `assets/ommer-professional-v1.jpg` is the homepage portrait.

## Edit or publish

Edit the text in the corresponding HTML file. To change the portrait, upload the new photo to `assets/` and update the image’s `src`, `alt`, `width` and `height` in `index.html`.

GitHub Pages publishes from the root of `main`. For Cloudflare Pages Direct Upload, deploy a ZIP whose root contains `index.html`, `about.html` and their assets.

The terminal appears on the first visit of a browser session. Use **Skip intro** or open `index.html?opening=none` to go directly to the homepage. The footer lets visitors replay the intro. The earlier opening concepts remain available in `openings.html`.
