# HappyValleyService

##事前準備

### node.jsグローバルスコーププラグインのインストール
 npm -g install パッケージ名

 - express-generator
 - sequelize-cli
 - mocha

### プロジェクトをローカルにクローン(VisualStudio)

### Databaseの初期化(すでにできているものにはやらないで下さい)
 ローカルのテスト環境構築用の手順です。

 1. sequelize db:migration
 1. mocha master-loader.js

### ORM.jsの検証
 1. mocha orm-test.js 
