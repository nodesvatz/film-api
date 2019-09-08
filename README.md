# film_api
Rest API
If you want to run your own local instance, follow the installation instructions provided below.

## Installation
```
npm i
```
or
```
yarn install
```
After all dependencies have been installed, you will need to make sure to have mongoDB configured on your computer as outlined in the next section.

If you already have mongoDB setup, you can initialize the app by running the following yarn command.
```
For stage/prod:
1) npm run build
2) npm run copyDocs - copy swagger docs to build folder
3) npm run start

For dev:
1) npm run dev

For test:
1) npm run test(run integration, unit tests)
```
It will launch the application at `http://localhost:5000` and you are now ready to navigate the core functions of your practice through the app. 

## mongoDB
For the app to render locally you will need mongoDB installed on your computer. Depending on your operating system, the installation proccess will be different. You can find more information on installing mongoDB per specific operating systems cited in the official documentation.
```
https://docs.mongodb.com/manual/installation/
```

## Film Api is Built With
* [Javascript](https://www.javascript.com/) - programming language
* [mongoDB](https://www.mongodb.com/) - native driver
* [Express.js](https://expressjs.com/) - routing framework
* [Node.js](https://nodejs.org/en/) - javascript runtime

## NPM Packages Used
* [Express](https://www.npmjs.com/package/express) - Routing framework
* [body-parser](https://www.npmjs.com/package/body-parser) - Request parsing middleware
* [morgan](https://www.npmjs.com/package/morgan) - Logging middleware
* [express-open-api-validate](https://www.npmjs.com/package/express-openapi-validate) - Validator
* [mocha](https://www.npmjs.com/package/mocha) - Test framework 
* [babel](https://www.npmjs.com/package/@babel/core) - Transpiler
* [nodemon](https://www.npmjs.com/package/nodemon) - Hot reloading

