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

First of all, you need an aelf chain with bingo-game contract.  
If you don't know how to build an aelf chain or don't hava a ready-made aelf chain, you can refer to our [Official Documents](https://docs.aelf.io/main/main/setup)-Tutorials-How to dev a DAPP-Setup Env

### Npm

```bash
npm install
npm run dev
```

### Yarn

```bash
yarn
yarn run dev
```

then open [http://0.0.0.0:9527/index.html](http://0.0.0.0:9527/index.html) in your browser

**Notice: after registration, some account information store in Storage.<br>
you can check it in F12 -> Application**

## Develop

```text
/src
```

- src/common/
  _Global static variables and methods_
  - constants.js  
    _Api path, Session Variable name, Regular expression_
  - request.js  
    _function to send an Api_
- src/pages/
  - bingo/
    - actions/  
      _redux-actions_
    - common/  
      _common useful function for pages,such as: language switching_
    - components/  
      _Generic Component_
    - coontainers/  
      _Actual pages_
    - reducers/  
      _redux-reducer_

### Use Api

**you must calling Api by dispatch an action**

1. in your page, trigger function
2. in actions, dispatch a server_request, and then request api,if api returns correctly dipatch server_success, else dispatch server_fail
3. in reducers, storage returned data.

### Rules

Using Airbnb encoding rules

## How to mock data

set mock data and api path Mapping:

```text
build/mock.json
```

add mock data to a JSON file, and put the file in:

```text
build/
```

rebuild the project, and then you can use mock data.
