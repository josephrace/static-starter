# Static Starter [![Build Status](https://travis-ci.org/josephrace/static-starter.svg?branch=master)](https://travis-ci.org/josephrace/static-starter)

A simple starter configuration to make building static HTML websites easier by using templates, partials, environment variables, and build steps for linting, minification etc.

## Tools
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Gulp](https://gulpjs.com/)
- [SASS](http://sass-lang.com/)
- [ESLint](http://eslint.org/)
- [Browsersync](https://www.browsersync.io/)
- [PostCSS](http://postcss.org/)
- [Travis CI](https://travis-ci.org/)

## Development

Install dependencies with `npm install` then run  `npm start` to launch a Browsersync server and have Gulp watch your file changes.

## Deployment

Before creating a production build you should set the value of the `homepage` field in `package.json` to URL of where you want your site to be e.g. 'https://myusername.github.io/my-app' or 'http://mysite.com'

Run `npm run build` when you want to create a production-ready version of the site.  You can upload the contents of the `dist` directory to a web server manually or make use of the `.travis.yml` CI config to deploy to a GitHub Pages site (you will need your own Travis CI account and follow the steps [here](https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token) to set a GitHub token).
