type Dialogue = {
  s: string
}

export const getEengineerDialogues = (): Dialogue[] => [
  { s: 'アプリの改修おっそ' },
  { s: '納期管理よわよわ' },
  { s: 'commit logが `fix` ばっかり' },
  { s: 'ドキュメントすかすか' },
  { s: 'テストカバレッジ0%' },
  { s: 'PoEAAエアプ' },
  { s: 'ストレートネック' },
  { s: 'OSSタダ乗り' },
  { s: '自分の無能を開発環境のせいにしてる' },
  { s: 'パスワード定期的に変更してる' },
  { s: 'GC走るタイミング分かってない' },
  { s: '文系' },
  { s: '英語力' },
  { s: 'a11y考慮してない' },
  { s: 'localstorageにaccess_token入れてる' },
  { s: 'swap切ってる' },
  { s: '継承の例にAnimalを出す(t)' },
  { s: '年末年始にコード全く書いてない(t)' },
  // { s: 'Python使ってる(t)' },
  { s: 'アイカツを観たことがない(t)' },
  { s: 'イベントで焼きそば焼いてる' },
]

export const get陰キャDialogues = (): Dialogue[] => [
  { s: 'コミュ障' },
  { s: '初対面だけ饒舌' },
  { s: '徐々に疎遠になる' },
  { s: '話題のレパートリーが少ない' },
  { s: '後輩の方が馴染んでる' },
  {
    s:
      Math.random() > 0.5
        ? '三人以上だと喋らない'
        : '三人で話してると疎外感覚える',
  },
  { s: 'たまに発言してもスルーされる' },
  { s: '相槌がワンパターン' },
  { s: '仕事の距離感はわかるけどプライベートの距離感が分からない' },
  { s: '喋っても声が通らず聞き返される' },
  { s: '当たり障りのない返事しかない' },
  { s: '自分を出さない' },
  { s: '質問攻めしかできない' },
  { s: 'また遊ぼうって言ったのに二度目が無い' },
  { s: '自分から遊びに誘わない' },
  { s: '人生経験が浅いから会話が広げられない' },
  { s: '次第に相手の嫌な所が見えてきて面倒になる' },
  {
    s:
      Math.random() > 0.5
        ? '一日の終わりに脳内反省会して鬱になる'
        : '会話したあと脳内反省会',
  },
  { s: '沈黙が続くと咳払いで誤魔化す' },
  { s: '喋って無いだけなのに聞き上手だと思われてる' },
  { s: '人間関係リセット癖ある' },
  { s: 'steamのライブラリがソロゲーばっかり' },
]

export const getこどおじDialogues = (): Dialogue[] => [
  { s: '勉強机使ってる' },
  { s: '彼女いない' },
  { s: '親の車乗ってる' },
  { s: '自炊能力ゼロ' },
  { s: 'ATMの使い方知らない' },
  { s: '野菜の選び方知らない' },
  { s: '不動産屋行ったこと無い' },
  { s: '洗濯機の回し方知らない' },
  { s: 'アイロンできない' },
  { s: '裁縫できない' },
  { s: '宅配ボックス知らない' },
  { s: 'トイレ掃除したことない' },
  { s: '毎朝親に起こしてもらってる' },
  { s: '寝坊すると親に逆ギレ' },
  { s: '親に買い物に行かせてる' },
  { s: '携帯電話代親に出してもらってる' },
  { s: '光熱費払ったこと無い' },
  { s: '家計における毎月の固定費の見積もりができない' },
  { s: '実家にサーバーとルーター置いてる' },
  { s: '宅配便親に受け取らせてる' },
  { s: '自室を親に掃除させてる' },
  { s: 'ガソリン代親に請求してる' },
  { s: '自室が電源タップだらけ' },
  { s: '老後2000万問題' },
]

// https://rollbar.com/blog/top-10-javascript-errors/
export const getJavascriptDialogues = (): Dialogue[] => [
  { s: '`Uncaught TypeError: Cannot read property`' },
  { s: '`TypeError: ‘undefined’ is not an object`' },
  { s: '`TypeError: null is not an object`' },
  { s: '`(unknown): Script error`' },
  { s: '`TypeError: Object doesn’t support property`' },
  { s: '`TypeError: ‘undefined’ is not a function`' },
  { s: '`Uncaught RangeError`' },
  { s: '`TypeError: Cannot read property ‘length’`' },
  { s: '`Uncaught TypeError: Cannot set property`' },
  { s: '`ReferenceError: event is not defined`' },
  { s: '`UnhandledPromiseRejectionWarning: Error: unhandled`' }, // node v15+
]

export const getGamerDialogues = (): Dialogue[] => [
  { s: 'noob' },
  { s: 'very noob' },
  { s: 'gg noob' },
  { s: 'uninstall plz' },
  { s: '0/10/3' },
  { s: 'stop trolling' },
  { s: 'report plz' },
  { s: 'pro' },
]
