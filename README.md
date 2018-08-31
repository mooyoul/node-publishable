# node-publishable

[![Build Status](https://travis-ci.org/mooyoul/node-publishable.svg?branch=master)](https://travis-ci.org/mooyoul/node-publishable)
[![Coverage Status](https://coveralls.io/repos/github/mooyoul/node-publishable/badge.svg?branch=master)](https://coveralls.io/github/mooyoul/node-publishable?branch=master)
[![codecov.io](https://codecov.io/github/mooyoul/node-publishable/coverage.svg?branch=master)](https://codecov.io/github/mooyoul/node-publishable?branch=master)
[![Dependency Status](https://david-dm.org/mooyoul/node-publishable.svg)](https://david-dm.org/mooyoul/node-publishable)
[![devDependency Status](https://david-dm.org/mooyoul/node-publishable/dev-status.svg)](https://david-dm.org/mooyoul/node-publishable#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/mooyoul/node-publishable/badge.svg)](https://snyk.io/test/github/mooyoul/node-publishable)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://mooyoul.mit-license.org/)

Checks if a package is publishable to NPM registry


## Sponsor

- [Vingle](https://www.vingle.net) - Vingle, Very Community. Love the things that you love. - [We're hiring!](https://careers.vingle.net/#/engineering/backend)


## Install

```bash
$ npm install publishable
```
 
 
## Usage

```typescript
import publishable = require("publishable");

await publishable("package-name", "version"); // returns `boolean`
```

## Changelog

#### 0.2.0

- Add `.npmrc` support
- Add scoped package support
- Add private package support

#### 0.1.0

- Initial commit

## Debugging

Set `DEBUG` environment variable to `publishable`.
You will be able to see debug messages on your console.

> $ env DEBUG='publishable' node your-app.js
 

## Testing

```bash
$ npm run test
```

... OR

```bash
$ npm run lint # Check lint
$ npm run coverage # Run test & generate code coverage report
```



## Build

```bash
$ npm run build
```


## License
[MIT](LICENSE)

See full license on [mooyoul.mit-license.org](http://mooyoul.mit-license.org/)
