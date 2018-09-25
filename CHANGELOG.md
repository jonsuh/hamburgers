# Changelog

Changelog for Hamburgers.

## [1.1.3] - 9/25/2018
### Fixed
- `!important` for types that rely on `background-color: transparent`.

## [1.1.2] - 9/25/2018
### Fixed
- Change default value of `$hamburger-active-hover-opacity` to `$hamburger-hover-opacity`.
- Change default value of `$hamburger-active-hover-filter` to `$hamburger-hover-filter`.

## [1.1.0] - 9/24/2018
### Added
- Changing color of the hamburger in the active state thanks to @andreamaiolo [#20](https://github.com/jonsuh/hamburgers/pull/20)

### Fixed
- Removed `$hamburger-hover-transition-duration` and `$hamburger-hover-transition-timing-function`—types rely on custom timing, which render these useless.

## [0.9.3] - 1/15/2018
### Fixed
- Missing `@if` statements in `arrowturn` and `arrowturn-r` variants [#51](https://github.com/jonsuh/hamburgers/pull/51).
- Update docs with correct `yarn` install command [#45](https://github.com/jonsuh/hamburgers/pull/45).
- Correct `eyeglass-module` tag in `package.json` [#48](https://github.com/jonsuh/hamburgers/pull/48).

## [0.9.1] - 7/6/2017
### Added
- Add new types: `3dxy`, `3dxy-r`, `arrowturn`, `arrowturn-r`, `minus`

### Updated
- Include missing and new types in `dist/example.html`.
- Update dependencies and include `package-lock.json`.

## [0.8.1] - 3/16/2017
### Updated
- Faster animations.
- Improved accessibility documentation thanks to @scottaohara [#baf5b5e](https://github.com/jonsuh/hamburgers/pull/34/commits/baf5b5ea3cf9bba155c8e74dc5b95e48e3384c4d).

## [0.7.0] - 11/29/2016
### Added
- [Eyeglass](http://eyeglass.rocks/) support.

## [0.6.0] - 11/22/2016
### Fixed
- Fix `spin-r`’s `.is-active::after` rotation. See https://github.com/jonsuh/hamburgers/issues/28.

## [0.5.0] - 04/04/2016
### Fixed
- `Error: Import directives may not be used within control directives or mixins.` in certain cases like when compiling with Ruby Sass.  
Solution: `@import` all available types and instead nest Sass for each type in `@if` directive which checks to see if the type exists in `$hamburger-types`. e.g.:  
```scss
@if index($hamburger-types, 3dx) {
   .hamburger--3dx {
   }
}
```

## [0.4.0] - 03/28/2016
### Improved
- Customize the including/excluding of hamburger types in settings as `$hamburger-types` Sass list (e.g. If someone includes Hamburgers via npm or Bower, they don’t have to modify the source files in `node_modules` or `bower_components`.)

## [0.3.0] - 03/07/2016
### Fixed
- Top positioning bug for Elastic and Slider ([#13fa295](https://github.com/jonsuh/hamburgers/commit/13fa2958ad18a2e48763824d3a68fd18b03ec274)).

### Added
- 4 hamburger types (with reverse variants)

  ```
  hamburger--3dx
  hamburger--3dx-r
  hamburger--3dy
  hamburger--3dy-r
  hamburger--spring
  hamburger--spring-r
  hamburger--stand
  hamburger--stand-r
  ```

## [0.2.0] - 03/04/2016
### Added
- Supports and favors more accessible and semantic markup:

  ```
  <button class="hamburger" type="button">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
  ```

## [0.1.6] - 03/02/2016
### Added
- [Bower](http://bower.io/) support.

## [0.1.5] - 03/02/2016
### Added
- Ability to customize `border-radius` of hamburger layers.

## [0.1.3] - 03/02/2016
- Public release.
