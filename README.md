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



### Start with mock data

**When you don't have Api,you can run project by this way,to use mock data**

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


### Start with Api

**When the Api is developed,you can run project by this way,to debugging programme**

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

You can change the Api mapping address in `./build/proxy.json` "target" field.


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

### globalization
Use [react.i18next](https://react.i18next.com) achieve.  
Learn how to use in [Official Documents](https://react.i18next.com)
- change config in `./src/pages/bingo/common/i18n.js`
- put text in `./src/pages/bingo/common/langs.js`

### Logic
When entering the project,automatically detect if an account exists.
- exist, go into login page.
- nonexistent, go into register page.

You can refer this logic in `./src/pages/bingo/components/Auth`

#### register
  If there doesn't have wallet's address and keystore in 'Local Storage'.
  1. Enter the correct format account.
  2. create a new wallet by `AElf.wallet.createNewWallet()`
  3. Save name and wallet's address in the database through 'register' Api.
  4. dispatch action. store wallet, name, count in redux's store.
  5. Get encrypted keystore by `AElf.wallet.keyStore.getKeystore`
  6. store keystore and wallet's address in 'Local Storage',store wallet in 'Session Storage'. Use this data to determine if an account exists or whether log in.
  7. register bingoGame contract to this wallet.
  8. show address, count in Modal.
  9. go into 'play' page.

#### Login
  If there is already wallet's address and keystore in 'Local Storage',but don't have wallet info in `Session Storage' go into login page.
  1. Get wallet's in 'Local Storage',show in not editable address input item. 
  2. Get password from the user.
  3. get Keystore from 'local Session'.
  4. get Mnemonic by `AElf.wallet.keyStore.unlockKeystore(keyStore, password)`
  5. get wallet by `AElf.wallet.getWalletByMnemonic(mnemonic)`
  6. store wallet in redux's store and 'Session Storage'.
  7. go into 'play' page.

#### Play
  1. Get Token Contract and BingoGame Contarct through AElf method. through Token Contract, get Cards number.
  2. Get 'Top Records' and 'Personal Records'.
  3. When click play button, get result by `bingoGameContract.Play({value})`, then send result to DB by Api.

#### Mnemonic
  Get mnemonic from 'Session Storage' and show

#### QrcodeExport
  Store Keystore in QRcode.
  use [qrcode.react](https://www.npmjs.com/package/qrcode.react) achieve.
  