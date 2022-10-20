# Nodejs OTP Authentication (Twilio and Typescript)

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 8.0.0

# Environment vars

This project uses the following environment variables:

| Name                | Description                | Default Value |
| ------------------- | -------------------------- | ------------- |
| MONGO_URI           | MongoDB Connection URI     | "\*"          |
| ACCOUNT_SID         | Twilio Account SID         | "\*"          |
| AUTH_TOKEN          | Twilio Auth Token          | "\*"          |
| TWILIO_PHONE_NUMBER | Twilio Trial Number        | "\*"          |
| TWILIO_SERVICE_SID  | Twilio Message Service SID | "\*"          |
| JWT_SECRET          | JWT Authentication secret  | "\*"          |

# Getting started

- Clone the repository

```
git clone  https://github.com/MunavvarSinan/Nodejs_otp_authentication.git
```

- Install dependencies

```
cd <project_name>
yarn install
```

- Executes Typescript commands on every successful compilation

```
yarn watch
```

- Build and run the project

```
yarn dev
```

Navigate to `http://localhost:4000`

- API Document Postman

  Postman API Documentation : https://documenter.getpostman.com/view/21138324/2s847JuCx1

# TypeScript + Node

The main Objective of this repositary is to showcase the Nodejs express Authentication API with Twilio for otp verification

## Getting TypeScript

Add Typescript to project `yarn`.

```
yarn add -D typescript
```

## Project Structure

The folder structure of this app is explained below:

| Name                | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **dist**            | Contains the distributable (or output) from your TypeScript build.                               |
| **node_modules**    | Contains all npm dependencies                                                                    |
| **src**             | Contains source code that will be compiled to the dist dir                                       |
| **src/server**      | Contains source code for the server and database connections and initialization                  |
| **src/app**         | Contains all other functions of the API                                                          |
| **src/controllers** | Controllers define functions to serve various express routes.                                    |
| **src/middlewares** | Express middlewares which process the incoming requests before handling them down to the routes  |
| **src/routes**      | Contain all express routes, separated by module/area of application                              |
| **src/models**      | Models define schemas that will be used in storing and retrieving data from Application database |
| **src/interfaces**  | Contains all the interfaces required for all of the endpoints                                    |
| **src**/index.ts    | Entry point to express app                                                                       |
| package.json        | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json       | Config settings for compiling source code only written in TypeScript                             |

## Building the project

### Configuring TypeScript compilation

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true
  },

  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts", "test", "node_modules"]
}
```

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| `start`    | Runs full build and runs node on dist/index.js. Can be invoked with `yarn start` |
| `dev`      | Runs full build before starting all watch tasks. Can be invoked with `yarn dev`  |
| `watch`    | Executes COMMAND on every successful compilation. `yarn watch`                   |

### Using the debugger in VS Code

Node.js debugging in VS Code is easy to setup and even easier to use.
Press `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.
