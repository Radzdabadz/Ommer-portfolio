# Ommer — Personal Portfolio

A responsive student portfolio homepage built with HTML, CSS and JavaScript.

## Publish with GitHub Pages

1. Create a public GitHub repository named `ommer-portfolio`.
2. Upload the contents of this package directly into the repository root. `index.html` must be in the root, not inside another folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. Wait until Pages displays the published website address. For a repository named `ommer-portfolio`, it normally has the form `https://YOUR-USERNAME.github.io/ommer-portfolio/`.

No custom domain or paid hosting is required for a public repository using GitHub Free.

## Files

- `index.html` — the homepage and three opening experiments.
- `styles.css` — layout, colours, fonts and responsive styling.
- `script.js` — openings, keyboard controls and optional support exercise.
- `favicon.svg` — the browser icon.
- `openings.html` — a page for comparing opening designs.
- `.nojekyll` — serves the plain static files without Jekyll processing.

## Opening options

The terminal opening appears on the first visit in a browser session. Visitors may skip it. The footer can replay it.

- `index.html?opening=keycap` — Enter key.
- `index.html?opening=terminal` — terminal prompt.
- `index.html?opening=boot` — power-on screen.
- `index.html?opening=none` — go directly to the homepage.

## Personalise

Three photograph spaces are intentionally reserved. Replace their placeholder content with Ommer's selected photographs and descriptive alternative text, retaining the containers to preserve the design. Accomplishments can be added later.

Google Fonts are optional; local fonts provide a fallback. All site links and assets are relative, so this works under a GitHub Pages repository path. There is no login or server dependency.

## Change the wording

1. Open `index.html` in the repository and click the pencil (Edit) button.
2. Find the visible words to change, such as `A curious mind.` or `A student. An open mind.`.
3. Edit the words between HTML tags. Keep tags such as `<p>`, `<h1>`, `<em>` and `<br>` intact.
4. Choose **Commit changes**, commit to **main**, and wait for GitHub Pages to redeploy.

The terminal introduction and its button text are also in `index.html`. `script.js` controls behaviour; `styles.css` controls colours and layout.

## Add photographs

For an easy setup, upload three JPEGs to the repository root with these exact lowercase names: `ommer.jpg`, `learning.jpg` and `personal.jpg`. On the repository Code tab, use **Add file → Upload files**, wait for uploads to finish, then **Commit changes**.

Uploading alone does not insert the photos. In `index.html`, replace each complete placeholder container with the matching block below, keeping the surrounding figure and caption. Remove the old placeholder's `role` and `aria-label` with that container; the image's `alt` supplies its description.

Main portrait — replace the `portrait-space` container:

```html
<div class="portrait-space">
  <img src="ommer.jpg" alt="Portrait of Ommer">
</div>
```

Learning picture — replace the `gallery-space learning-space` container:

```html
<div class="gallery-space learning-space">
  <img src="learning.jpg" alt="Ommer learning or working">
</div>
```

Personal picture — replace the `gallery-space personal-space` container:

```html
<div class="gallery-space personal-space">
  <img src="personal.jpg" alt="Describe the chosen personal photograph">
</div>
```

Use the actual extension if uploading PNG or WebP instead. Match filename capitalisation exactly and write alt text that describes the real photo. The existing CSS crops these images inside their frames. Commit the edit to **main**; GitHub Pages will publish it automatically.

You can also send the photos and revised wording to the person maintaining the site for the changes to be applied directly.
