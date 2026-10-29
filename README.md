# Experts Handyman Service — website

Static website (vanilla HTML / CSS / JS, no build step) for **Experts Handyman Service**,
a family-owned handyman and remodeling company in Playa del Rey, California.

- Entry point: `index.html`
- Styles: `assets/css/styles.css`
- Scripts: `assets/js/main.js`
- Images: `images/source/`
- Favicon: `assets/favicon.svg`

## Pages

| Path | File |
| --- | --- |
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/service/` | `service/index.html` |
| `/kitchen-and-bathroom-remodeling/` | `kitchen-and-bathroom-remodeling/index.html` |
| `/cabinet-restoration-system/` | `cabinet-restoration-system/index.html` |
| `/tv-installation/` | `tv-installation/index.html` |
| `/window-door-repair/` | `window-door-repair/index.html` |
| `/interior-and-exterior-painting/` | `interior-and-exterior-painting/index.html` |
| `/interior-and-exterior-painting-2/` | `interior-and-exterior-painting-2/index.html` |
| `/gallery/` | `gallery/index.html` |
| `/testimonials/` | `testimonials/index.html` |
| `/video/` | `video/index.html` |
| `/contact/` | `contact/index.html` |
| `/bussiness-card/` | `bussiness-card/index.html` |
| `/privacy-policies/` | `privacy-policies/index.html` |
| `/terms-and-conditions/` | `terms-and-conditions/index.html` |
| `/bafg_gallery/project/` | `bafg_gallery/project/index.html` |
| `/bafg_gallery/new/` | `bafg_gallery/new/index.html` |
| `/portfolio-cat/home-clean/` | `portfolio-cat/home-clean/index.html` |
| `/portfolio-cat/office/` | `portfolio-cat/office/index.html` |
| `/portfolio-cat/sparkle-clean/` | `portfolio-cat/sparkle-clean/index.html` |

`/review` is provided by the hosting platform and is linked from the footer,
the testimonials page and the contact page.

## Forms

Both forms (the home page quote request and the contact page form) POST to the
LeadrVision endpoint and work with or without JavaScript. Each one carries
`_form`, `_page` and a `_gotcha` honeypot, and shows an inline
"Thanks, your message was sent" confirmation when `?submitted=1` is present or
when the fetch submission returns `{"ok": true}`.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.
