# aoyagi design

青柳和貴のポートフォリオ。GitHub Pagesで公開する、ビルド不要の静的サイトです。

## プレビュー

```sh
python -m http.server 8765 --bind 127.0.0.1
```

ブラウザーで `http://127.0.0.1:8765` を開きます。`index.html` を直接開くこともできますが、動作確認にはHTTPサーバーを推奨します。

## ファイル

- `index.html`：掲載内容、制作領域の線画、メタ情報
- `assets/style.css`：配色、文字組み、レスポンシブレイアウト
- `assets/atelier.css`：制作姿勢・制作領域のレイアウトとアニメーション
- `assets/main.js`：スクロール、視差、制作領域の切り替え、動きの設定
- `assets/vendor/`：固定バージョンのライブラリとMITライセンス
- `logo.png`：既存のロゴ（変更なし）
- `CNAME`：既存のカスタムドメイン設定（変更なし）

## 表現と依存関係

- Lenis 1.3.26：マウス／トラックパッドでの滑らかなスクロール
- Vanilla Tilt 1.8.1：制作領域の図版の傾き、最大4度。ジャイロは無効
- 制作領域：6つのdetails要素とSVGの線画。開いた領域に合わせて図版と説明を切り替えます
- 動き：見出しの順次表示、円弧の回転、ロゴの浮遊、線画の描画と各領域固有の動き、経歴の線の進行
- 繰り返す図版アニメーションは画面外や非表示タブでは停止します
- 視差：スクロール位置から計算する小さな縦移動。別のスクロールライブラリは追加しません
- 欧文：FontshareのGambetta。和文：しっぽり明朝B1、Zen Kaku Gothic New。注記：Space Mono
- Google Fonts／Fontshareに接続できなくてもシステムフォントにフォールバックします
- JavaScriptが使えなくても本文・制作領域の開閉・ページ内リンクを利用できます
- OSの動きを減らす設定を尊重します。ヘッダーのボタンで動きを抑える選択も可能です
- モーション設定のみlocalStorageに保存します。利用できない環境でも動作します
- Google Analyticsは既存のIDを維持し、本番のホスト名でのみ読み込みます

## 内容の更新

### 制作姿勢と制作領域

`#approach` に制作姿勢の短い文章を、`#fields` 内の `details.field-entry` に各領域の説明を置いています。`data-field` とSVGの `data-diagram` が対応します。図版は各分野を表す模式図で、実際の製品・作品の画像ではありません。動画・サムネイルは掲載していません。

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
