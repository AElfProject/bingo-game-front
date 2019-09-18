# bingo-game-front

## Table of Contents

- [Introduction](#Introduction)
- [Required knowledge](#Required-knowledge)
- [Quick start](#Quick-start)  
  - [Install](#Install)
  - [Start with mock data](#Start-with-mock-data)
  - [Start with Api proxy service](#Start-with-Api-proxy-service)
- [Develop](#Develop)
  - [Coding Standards](#Coding-Standards)
  - [Use Api](#Use-Api)
  - [I18n](#I18n)
  - [Project Flow](#Project-Flow)
    - [register](#register)
    - [Login](#Login)
    - [Play](#Play)
    - [Mnemonic](#Mnemonic)
    - [QrcodeExport](#QrcodeExport)

## Introduction

This is a Bingo Game based on [aelf-sdk](https://github.com/AElfProject/aelf-sdk.js)  
You can learn basic usage of [aelf](https://github.com/AElfProject/AElf)

## Required knowledge

- [AElf-sdk](https://github.com/AElfProject/aelf-sdk.js)
- React
- React-router
- Redux
- React-redux

## Quick start

- This project uses node and npm. Go check them out if you don't have them locally installed.

- This project relies on aelf chain with bingo-game contract.  
  If you don't know how to build an aelf chain or don't hava a ready-made aelf chain, you can refer to our [Official Documents](https://docs.aelf.io/main/main/setup)-Tutorials-'How to dev a DAPP'-Setup Env

- You can change the aelf chain addres in `./src/page/bingo/common/constans.js`

### Install

#### Npm

```bash
npm install
```

#### Yarn

```bash
yarn
```

### Start with mock data

**If you don't have Api, you can run the project in this way and use the local mock data in `mock/*` to test the program**

#### Npm

```bash
npm run dev
```

#### Yarn

```bash
yarn run dev
```

#### How to set mock data

Set the correspondence between the file storing the mock data and Api path:

```text
build/mock.json
```

The json file that stores the mock data is located here:

```text
mock/
```

Restart the project, and then you can use mock data.


### Start with Api proxy service

**If the Api proxy service is launch, you can run the project this way to joint test program**

#### Npm

```bash
npm run test
```

#### Yarn

```bash
yarn run test
```

You can change the Api proxy service address in `./build/proxy.json` "target" field.


Open [http://0.0.0.0:9527/index.html](http://0.0.0.0:9527/index.html) in your browser

## Develop

### Coding Standards

- Airbnb JavaScript Style Guide

### Use Api

- Put Api path in `./src/common/constants.js`
- Use `request` function in `./src/common/request.js` to send Api

_We also recommend you send Api by dispatch_

### I18n
Internationalization with [react-i18next](https://react.i18next.com)  
Learn how to use in [Official Documents](https://react.i18next.com)
- Change configuration : `./src/pages/bingo/common/i18n.js`
- Add text : `./src/pages/bingo/common/langs.js`

### Project Flow

**Notice: after registration, some account information save in Storage.<br>
You can check it in F12 -> Application**

When entering the project, the program will automatically detect the existence of an account.
- Account exists, enter the login page.
- Account doesn't exist, enter the registration page.  
You can view the logic of the code in `./src/pages/bingo/components/Auth`

#### register
  If there is no wallet address and keystore in "Local Storage".
  1. Enter the correct account information.
  2. Create a new wallet by `AElf.wallet.createNewWallet()`
  3. Save the name and wallet address in the DB by 'Register'Api.
  4. Dispatch action. save wallet, name, count in redux's store.
  5. Get encrypted keystore by `AElf.wallet.keyStore.getKeystore`
  6. save keystore and wallet's address in 'Local Storage', and save wallet in 'Session Storage'. Use this data to determine if an account exists or whether log in.
  7. Register bingoGame contract with this wallet.
  8. Show address, count in Modal.
  9. Enter 'play' page.

#### Login
  If there is already wallet's address and keystore in 'Local Storage', but don't have wallet info in `Session Storage' enter login page.
  1. Get wallet's in 'Local Storage', show in not editable address input item. 
  2. Get password from the user.
  3. Get Keystore from 'local Session'.
  4. Get Mnemonic by `AElf.wallet.keyStore.unlockKeystore(keyStore, password)`
  5. Get wallet by `AElf.wallet.getWalletByMnemonic(mnemonic)`
  6. Save wallet in redux's store and 'Session Storage'.
  7. Enter 'play' page.

#### Play
  1. Get Token Contract and BingoGame Contarct through AElf method.
  2. Get number of cards through Token Contract.
  3. Get Top Records and Personal Records.
  4. Page display
  5. Click play button, get result by `bingoGameContract.Play({value})`, then send result to DB by Api.
  6. Show play result in Modal

#### Mnemonic
  Get mnemonic from 'Session Storage' and show

#### QrcodeExport
  Save Keystore in QRcode.
  Use [qrcode.react](https://www.npmjs.com/package/qrcode.react) achieve.
