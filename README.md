# Back End - Technical Test

## Run Project

Create .env file in the root directory :

```sh
cp .env.example .env
```

or

```sh
copy .env.example .env
```

Fill the .env file with the following :

```sh
PORT=<PORT> # 9000
URL_MONGODB_DEV=<URL_MONGODB_DEV> # mongodb://localhost:27017/<DB_NAME>
URL_MONGODB_TEST=<URL_MONGODB_TEST> # mongodb://localhost:27017/<DB_NAME_TEST>
```

Then, run the following command to install the dependencies :

```sh
npm install
```

Run the following command to start the server :

```sh
npm run dev
```

To run the test, run the following command :

```sh
npm run test
```

or

```sh
npm run test:watch
```

## API Documentation

```sh
http://localhost:<PORT>/api-docs
```
