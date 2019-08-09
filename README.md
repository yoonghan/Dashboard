# Dashboard based on Material-ui
Dashboard on system monitoring. Found that menu are a very troublesome function
hence added a searchable screen.

The screen works with [DashboardGraphQL project](https://github.com/yoonghan/DashboardGraphQL/)

![alt text](gitimg/screenshot1.png?raw=true)
![alt text](gitimg/screenshot2.png?raw=true)

## Install
1. Git clone the project and execute the following of the project.

```
npm run install
```

2. Git clone DashboardGraphQL, and execute the following of the project.

```
npm run install
npm run start
```

## Execute
Open 2 terminals with each running
```
  npm run start
```
```
  npm run dev
```

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
2. import javascript polyfill for promises.

# For external hosting.
1. If there are needs for external hosting (e.g. html with different /js folder). Change webpack.config.js publicPath: "/js/", to the correct directory.
2. Build with command

```
npm run prod
```

3. Incase one is lazy t change webpack.config.js, one can directly change it via dist/bundle.js and rename "/js/" to the desired url.
4. Remember to change public/html/index.html to the correct .js and use production version of react.
5. Update package.json of API-URL. *NOTE:* not using dotenv to do this.
