# Uttori Wiki Default Theme

This is the default theme for [Uttori Wiki](https://github.com/uttori/uttori-wiki). Styles are written in SCSS. JavaScript scripts are compiled with Babel and compressed. Templates are [EJS](https://ejs.co/).

# Instructions

It's highly recommended that you fork this repo (you should probably start off with it being private for security purposes) and make changes, add `favicon.png, favicon.png, favicon.png` and any other files you need in the `public` folder.

There is a convenient `custom.scss` file to add any custom styles like a background.

Optionally add a [reCaptcha](https://www.google.com/recaptcha/intro/v3.html) key to the `src/scripts/config.js` file.

Run the make script by running `npm run make` so everything compiles to the public folder, commit this.

Clone that forked repo inside your Uttori Wiki `themes` folder, ensure your repository name (or the folder name if you rename it) is set to be value for the Uttori Wiki config key `theme_name`.

# Namesake

> ウットリ, うっとり: When you become enraptured by beauty. In rapture, in ecstasy, captivated. A rapt stare.

# Contributors

 - [Matthew Callis](https://github.com/MatthewCallis) - rewrite, refactor, testing of UttoriWiki
 - [Wade Kallhoff](https://github.com/wkallhof) - original author of Hazel

# License
  [GPL-3.0](LICENSE)
