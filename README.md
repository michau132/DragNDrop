# DragNDrop


## Installation

1. [`clone`](https://github.com/michau132/DragNDrop.git) this repository and go into the project root
1. `yarn install` | `npm install` to install the website's npm dependencies

### Running locally

1. `yarn start | npm start` to start the hot-reloading development server 
1. `open http://localhost:3000` to open the site in your favorite browser - it should be done automaticlly


## Description
App which show name, type, size, geolocation of picture. It accepcts only images, on other files it would be an error. Files without geolocation also throws error. When image is loaded it shows on map position where picture was taken. It throws an error even if the size is bigger than 1MB.


## Tech stack
+ react
+ react-router
+ material-ui
+ styled components
+ [exif-js](https://github.com/exif-js/exif-js)

