# aoyagi design

青柳和貴のポートフォリオ。GitHub Pagesで公開する、ビルド不要の静的サイトです。

## プレビュー

```sh
python -m http.server 8765 --bind 127.0.0.1
```

ブラウザーで `http://127.0.0.1:8765` を開きます。`index.html` を直接開くこともできますが、動作確認にはHTTPサーバーを推奨します。

## ファイル

- `index.html`：掲載内容、作品リンク、メタ情報
- `assets/style.css`：配色、文字組み、レスポンシブレイアウト
- `assets/main.js`：スクロール、視差、カードの傾き、動きの設定
- `assets/images/`：現サイトで公開されていた動画2本のサムネイル
- `assets/vendor/`：固定バージョンのライブラリとMITライセンス
- `logo.png`：既存のロゴ（変更なし）
- `CNAME`：既存のカスタムドメイン設定（変更なし）

## 表現と依存関係

- Lenis 1.3.26：マウス／トラックパッドでの滑らかなスクロール
- Vanilla Tilt 1.8.1：作品画像の傾き、最大3.5度。ジャイロは無効
- 視差：スクロール位置から計算する小さな縦移動。別のスクロールライブラリは追加しません
- 欧文：FontshareのGambetta。和文：しっぽり明朝B1、Zen Kaku Gothic New。注記：Space Mono
- Google Fonts／Fontshareに接続できなくてもシステムフォントにフォールバックします
- JavaScriptが使えなくても本文・作品リンク・ページ内リンクを利用できます
- OSの動きを減らす設定を尊重します。ヘッダーのボタンで動きを抑える選択も可能です
- モーション設定のみlocalStorageに保存します。利用できない環境でも動作します
- Google Analyticsは既存のIDを維持し、本番のホスト名でのみ読み込みます

## 内容の更新

### 作品

`#works .works-grid` 内の `article.work-card` を追加・編集します。実際の作品画像、タイトル、制作年、公開URLを設定してください。画像の幅・高さも実ファイルに合わせます。未公開のアプリ・CAD作品をダミーの実績として掲載していません。

### お問い合わせ

連絡先は未確定のため「準備中」です。公開先が決まったら `#contact .contact-detail` を実際の連絡手段へ更新してください。仮のメールアドレスやリンクはありません。

### 公開

`index.html`、`assets/`、`logo.png`、`CNAME` を同じ階層のままGitHub Pagesの公開ブランチへ反映します。`CNAME` を消さないでください。変更を公開ブランチにマージするまでは現サイトには反映されません。

## 参考

- https://lenis.dev/
- https://paralux.co.jp/blog/143
- https://micku7zu.github.io/vanilla-tilt.js/
- https://www.fontshare.com/fonts/gambetta
- https://fontpairings.net/
- https://fontjoy.com/
