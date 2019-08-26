# bingo-game-front

## Introduction

This is a Bingo Game based on [aelf-sdk](https://github.com/AElfProject/aelf-sdk.js)  
You can learn basic usage of [aelf](https://github.com/AElfProject/AElf)

## Required knowledge

- [aelf-sdk](https://github.com/AElfProject/aelf-sdk.js)
- react
- react-router
- redux
- react-redux

## Quick start

- This project uses node and npm. Go check them out if you don't have them locally installed.

- This project relies on aelf chain with bingo-game contract.
  If you don't know how to build an aelf chain or don't hava a ready-made aelf chain, you can refer to our [Official Documents](https://docs.aelf.io/main/main/setup)-Tutorials-'How to dev a DAPP'-Setup Env

- You can change the aelf chain addres in `./src/page/bingo/common/constans.js`



### Start with Api
#### Npm

```bash
npm install
npm run test
```

#### Yarn

```bash
yarn
yarn run test
```

You can change the Api mapping address in `./build/proxy.json`

### Start with mock data
#### Npm

```bash
npm install
npm run dev
```

#### Yarn

```bash
yarn
yarn run dev
```

#### How to set mock data

set mock data and api path Mapping:

```text
build/mock.json
```

add mock data to a JSON file, and put the file in:

```text
build/
```

rebuild the project, and then you can use mock data.


then open [http://0.0.0.0:9527/index.html](http://0.0.0.0:9527/index.html) in your browser

**Notice: after registration, some account information store in Storage.<br>
you can check it in F12 -> Application**

## Develop

### Rules

Using Airbnb coding rules
> A mostly reasonable approach to JavaScript

### Use Api

- put path in `./src/common/constants.js`
- use request function in `./src/common/request.js` to send Api

_We also recommand you send Api by dispatch_

