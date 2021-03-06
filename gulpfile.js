`use strict`;

/**
 * GULPJS DEPENDENCIES
 */
const gulp = require(`gulp`),
  todo = require(`gulp-todo`),
  jsdoc = require(`gulp-jsdoc3`),
  jsmin = require(`gulp-jsmin`),
  concat = require(`gulp-concat`),
  eslint = require(`gulp-eslint`),
  rename = require(`gulp-rename`),
  deleteLines = require(`gulp-delete-lines`),
  insertLines = require(`gulp-insert-lines`),
  babel = require(`gulp-babel`),
  paths = {
    js: {
      toast: `./js/sweetToast.js`,
      toastES5: `./js/`,
      dist: `./dist/`
    },
    doc: {
      readme: `./README.md`,
      jsdocConfig: `./jsdocConfig/jsdoc.json`,
      dist: `./doc/`
    },
    engines: {
      kitkoin: `./../kitkoin/lib/`
    }
  },
  linterObtions = {
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "es6": true,
      "node": true
    },
    "rules": {
      "comma-dangle": 0,
      "no-cond-assign": 0,
      "no-console": 0,
      "no-constant-condition": 0,
      "no-control-regex": 0,
      "no-debugger": 0,
      "no-dupe-args": 0,
      "no-dupe-keys": 0,
      "no-duplicate-case": 0,
      "no-empty-character-class": 0,
      "no-empty": 0,
      "no-ex-assign": 0,
      "no-extra-boolean-cast": 0,
      "no-extra-parens": 0,
      "no-extra-semi": 0,
      "no-func-assign": 0,
      "no-inner-declarations": 0,
      "no-invalid-regexp": 0,
      "no-irregular-whitespace": 0,
      "no-negated-in-lhs": 0,
      "no-obj-calls": 0,
      "no-regex-spaces": 0,
      "no-sparse-arrays": 0,
      "no-unreachable": 0,
      "use-isnan": 0,
      "valid-jsdoc": 1,
      "valid-typeof": 0,
      "no-unexpected-multiline": 0,
      "accessor-pairs": 0,
      "block-scoped-var": 0,
      "complexity": 0,
      "consistent-return": 0,
      "curly": [1, "all"],
      "default-case": 1,
      "dot-notation": 0,
      "dot-location": 0,
      "eqeqeq": 0,
      "guard-for-in": 0,
      "no-alert": 1,
      "no-caller": 0,
      "no-div-regex": 0,
      "no-else-return": 0,
      "no-empty-label": 0,
      "no-eq-null": 0,
      "no-eval": 0,
      "no-extend-native": 0,
      "no-extra-bind": 0,
      "no-fallthrough": 0,
      "no-floating-decimal": 0,
      "no-implicit-coercion": 0,
      "no-implied-eval": 0,
      "no-invalid-this": 0,
      "no-iterator": 0,
      "no-labels": 0,
      "no-lone-blocks": 0,
      "no-loop-func": 0,
      "no-multi-spaces": 1,
      "no-multi-str": 0,
      "no-native-reassign": 0,
      "no-new-func": 0,
      "no-new-wrappers": 0,
      "no-new": 0,
      "no-octal-escape": 0,
      "no-octal": 0,
      "no-param-reassign": 0,
      "no-process-env": 0,
      "no-proto": 0,
      "no-redeclare": 0,
      "no-return-assign": 0,
      "no-script-url": 0,
      "no-self-compare": 0,
      "no-sequences": 0,
      "no-throw-literal": 0,
      "no-unused-expressions": 0,
      "no-useless-call": 0,
      "no-void": 0,
      "no-warning-comments": 0,
      "no-with": 0,
      "radix": 0,
      "vars-on-top": 0,
      "wrap-iife": 0,
      "yoda": 0,
      "strict": [1, "global"],
      "init-declarations": 0,
      "no-catch-shadow": 0,
      "no-delete-var": 0,
      "no-label-var": 0,
      "no-shadow-restricted-names": 0,
      "no-shadow": 0,
      "no-undef-init": 1,
      "no-undef": 1,
      "no-undefined": 0,
      "no-unused-vars": 1,
      "no-use-before-define": 0,
      "callback-return": 0,
      "handle-callback-err": 0,
      "no-mixed-requires": 0,
      "no-new-require": 0,
      "no-path-concat": 0,
      "no-process-exit": 0,
      "no-restricted-modules": 0,
      "no-sync": 0,
      "array-bracket-spacing": [1, "always", {
        "singleValue": true,
        "objectsInArrays": true,
        "arraysInArrays": true
      }],
      "brace-style": 0,
      "camelcase": [1, {
        "properties": "always"
      }],
      "comma-spacing": 0,
      "comma-style": 0,
      "computed-property-spacing": 0,
      "consistent-this": 0,
      "eol-last": 0,
      "func-names": 0,
      "func-style": 0,
      "id-length": 0,
      "indent": 0,
      "key-spacing": 0,
      "lines-around-comment": 0,
      "linebreak-style": 0,
      "max-nested-callbacks": 0,
      "new-cap": 0,
      "new-parens": 0,
      "newline-after-var": 0,
      "no-array-constructor": 0,
      "no-continue": 0,
      "no-inline-comments": 0,
      "no-lonely-if": 0,
      "no-mixed-spaces-and-tabs": 0,
      "no-multiple-empty-lines": 0,
      "no-nested-ternary": 0,
      "no-new-object": 0,
      "no-spaced-func": 0,
      "no-ternary": 0,
      "no-trailing-spaces": 0,
      "no-underscore-dangle": 0,
      "no-unneeded-ternary": 0,
      "object-curly-spacing": 0,
      "one-var": 0,
      "operator-assignment": 0,
      "operator-linebreak": 0,
      "padded-blocks": 0,
      "quote-props": 0,
      "quotes": 0,
      "id-match": 0,
      "semi-spacing": 0,
      "semi": 0,
      "sort-vars": 0,
      "space-after-keywords": 0,
      "space-before-blocks": 0,
      "space-before-function-paren": 0,
      "space-in-parens": 0,
      "space-infix-ops": 0,
      "space-return-throw-case": 0,
      "space-unary-ops": 0,
      "spaced-comment": 0,
      "wrap-regex": 0,
      "arrow-parens": 0,
      "arrow-spacing": 0,
      "constructor-super": 1,
      "generator-star-spacing": 0,
      "no-class-assign": 0,
      "no-const-assign": 0,
      "no-this-before-super": 0,
      "no-var": 0,
      "object-shorthand": 0,
      "prefer-const": 0,
      "prefer-spread": 0,
      "prefer-reflect": 0,
      "require-yield": 0,
      "max-depth": 0,
      "max-len": 0,
      "max-params": 0,
      "max-statements": 0,
      "no-bitwise": 0,
      "no-plusplus": 0
    },
    "globals": {
      "gAssetManager": true,
      "gLabelManager": true,
      "gTranslations": true,
      "gIsSpinning": true
    },
    "globals": [`jQuery`, `$`, `PIXI`],
    "envs": [`browser`]
  };

gulp.task(`lint`, () => {
  gulp.src([paths.js.toast])
    .pipe(eslint(linterObtions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(`to-do`, (cb) => {
  gulp.src(paths.js.toast)
    .pipe(todo({
      verbose: true
    }))
    .pipe(gulp.dest(`./`))
    .on(`end`, cb);
});

gulp.task(`doc`, (cb) => {
  var config = require(paths.doc.jsdocConfig);
  gulp.src(paths.js.toast, {
      read: false
    })
    .pipe(jsdoc(config, cb));
});


gulp.task(`watch`, () => {
  gulp.watch([paths.js.toast], [`concatSweetToast`, `doc`, `to-do`]);
});


gulp.task(`concatSweetToast`, () => {
  gulp.src(paths.js.toast)
    .pipe(babel({
      presets: [`es2015`]
    }))
    .pipe(gulp.dest(paths.js.dist))
    .pipe(concat(`sweetToast.min.js`))
    .pipe(jsmin())
    .pipe(gulp.dest(paths.js.dist))
    .pipe(gulp.dest(paths.engines.kitkoin));
});

gulp.task(`default`, [`lint`, `concatSweetToast`, `to-do`, `doc`, `watch`]);