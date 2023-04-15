# GAS slack channels to spreadsheet

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

## GASのプロパティ設定

GASのプロパティに作成したSlack BOTのトークンを`SLACK_TOKEN`として設定する。

## Slack BOTの作成

`manifest.yml`を使用してBOTを作成する。
