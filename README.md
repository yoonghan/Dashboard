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
