# GAS slack channels to spreadsheet

// 建設予定地

## 概要

Slackのチャンネル一覧をspreadsheetに出力するGAS。

## 初期設定

```sh
npm install
```

```sh
$ clasp login
$ clasp create --rootDir src/ --title "gas-slack-channels-to-spreadsheet" --type sheets
$ mv src/.clasp.json .clasp.json
```

既存のスプレッドシートが存在する場合はGASプロジェクトをスプレッドシートに紐付ける形で作成し、`.clasp.json.sample`を`.clasp.json`にリネームする。  
`.clasp.json`内の`scriptId`をGASプロジェクトのIDに置き換え、`parentId`をスプレッドシートのIDに置き換える。
