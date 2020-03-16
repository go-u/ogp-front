![](https://github.com/go-u/ogp-front/workflows/Test/badge.svg)
![](https://github.com/go-u/ogp-front/workflows/Staging/badge.svg)
![](https://github.com/go-u/ogp-front/workflows/Production/badge.svg)

<h1 align="center">OGP Gallery</h1>
<p align="center"><img src="https://github.com/go-u/ogp-index/blob/master/docs/systems.jpg" alt="Systems"></p>

## ハイライト
### :iphone: WebとAndroid/iOSアプリ版を同時リリース    

### :snowflake: CPU負荷を意識したコーディング(Object.freezeでリアクティブを制限)  
 
### :star2: 省メモリを意識したコーディング(モバイル版に仮想スクロールを実装)  
  
<img src="https://tangbc.github.io/github-images/virtual-scroll-list-how-works.gif">  
gif by tangbc/vue-virtual-scroll-list

## Web版(SPA)について
Vue製のフレームワークQuasarを利用して作成(QuasarはNuxtと同等以上の機能があります)
- [SPA部分のコード](https://github.com/go-u/ogp-front/tree/master/src)

## Android/iOSアプリ版について
アプリ版はCordova後継のCapacitorで開発しています。  
- [Androidのコード](https://github.com/go-u/ogp-front/tree/master/src-capacitor/android)
- [iOSのコード](https://github.com/go-u/ogp-front/tree/master/src-capacitor/ios)
- [拙作のCapacitorプラグインのリポジトリ(TypeScript/Java/Swiftを利用)](https://github.com/go-u/capacitor-keep-screen-on)
- [公式の掲載情報(Display > Keep Screen On に掲載)](https://capacitor.ionicframework.com/docs/community/plugins/#display)

## テストについて
ユニットテストのサンプル
- [許容できるパスワード強度の正規表現をテスト](https://github.com/go-u/ogp-front/blob/master/test/jest/__tests__/Regex.spec.js)

E2Eテストのサンプル
- [Firebaseを使ったログイン&ページ遷移が正常に行えるかのテスト](https://github.com/go-u/ogp-front/blob/master/test/cypress/integration/home/login_spec.js)  
  (上記ログインテストの様子は以下のCI/CDにて動画として自動保存しています)

## CI/CDについて
- [プッシュ時にユニットテスト](https://github.com/go-u/ogp-front/blob/master/.github/workflows/test.yml)
- [プルリク時にテスト環境に自動デプロイ&E2Eテストを実行](https://github.com/go-u/ogp-front/blob/master/.github/workflows/deploy_staging.yml)
- [マージ時にプロダクション環境に自動デプロイ](https://github.com/go-u/ogp-front/blob/master/.github/workflows/deploy_production.yml)
(テスト動画をGithubに自動保存しています)
