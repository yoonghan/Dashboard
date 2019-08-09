# Dashboard based on Material-ui

## Install
```
npm run Install
```

## Execute
Open 2 terminals with each running
```
  npm run start
```
```
  npm run dev
```

## What's running
To check how your process will execute:

1. Open up src/index.tsx
2. Check inside each for the small sample.

## Issues on IE5

1. To enable IE 11, run with babelrc
```
["@babel/env", {
  "targets": {
    "browsers": [
      "Chrome >= 59",
      "FireFox >= 44",
      "Safari >= 7",
      "Explorer 11",
      "last 4 Edge versions"
    ]
  },
  "useBuiltIns": "entry"
}],
```
2. import javascript polyfill for promises

# For external hosting.
1. If there are needs for external hosting (e.g. html with different /js folder). Change webpack.config.js publicPath: "/js/", to the correct directory.
2. Build with command

```
npm run prod
```

3. Incase one is lazy t change webpack.config.js, one can directly change it via dist/bundle.js and rename "/js/" to the desired url.
4. Remember to change public/html/index.html to the correct .js and use production version of react.
