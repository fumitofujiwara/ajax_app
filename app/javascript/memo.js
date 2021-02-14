function memo() {
  //index.html.erbのなかの投稿するボタンの情報を取得
  const submit = document.getElementById("submit");
  //投稿するボタンがクリックされるた場合実行される関数を定義
  submit.addEventListener("click", (e) => {
  //フォームに入力された値を取得する
  const formData = new FormData(document.getElementById("form"));
  //非同期通信を実装されるために必要なXMLHttpRequestのオブジェクトを生成
  const XHR = new XMLHttpRequest();
  //XMLHttpRequestを初期化する記述。HTTPメソッド(POST),パス(/posts),非同期通信(true)
  XHR.open("POST", "/posts", true);
  //返却されるデータの記述
  XHR.responseType = "json";
  //7行目のformDataの送信
  XHR.send(formData);
  //レスポンスがあった場合の処理を記述
  XHR.onload = () => {
    if (XHR.status != 200) {
      //成功していないとエラー文を表示する
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      //エラー文が出るとその後の処理を中断する。
      return null;
    } 
    //レスポンスとして返却されたメモのレコードデータを取得
    const item = XHR.response.post;
    //index.html.erbよりid="list"の要素の取得
    const list = document.getElementById("list");
    //メモの入力フォームの取得
    const formText = document.getElementById("content");
    //メモとして描画する部分のHTMLを定義
    const HTML = `
     <div class="post" data-id=${item.id}>
      <div class="post-date">
       投稿日時:${item.created_at}
      </div>
      <div class="post-content">
      ${item.content}
      </div>
    </div>`;
    //index.html.erbの要素の直後に挿入する。
    list.insertAdjacentHTML("afterend", HTML);
    //メモの入力フォームに入力されたままの文字のリセット。空の文字列に上書きされる。
    formText.value = "";
   };
   //標準設定されているイベントを阻止するメソッド
   e.preventDefault();
  });
}
//ページ読み込み時に関数が実行される。
window.addEventListener('load', memo);