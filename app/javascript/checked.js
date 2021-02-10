function check() {
  //表示されている全てのメモを取り出している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post){
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true"); 
    //メモをクリックした場合の処理を定義している
    post.addEventListener('click', () => {
      //どのメモをクリックしたのかカスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      //Ajaxに必要なオブジエクトの生成
      const XHR = new XMLHttpRequest();
      //openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスのタイプを指定
      XHR.responseType = "json";
      //sendでリクエストを送信
      XHR.send();
      //レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          //レスポンスのHTTPデータを解析し、該当するエラーメッセージをalertに表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //エラーが出た場合return null以降の処理が行われない。(処理の終了)
          return null;
        }
        //XHR.response.postでレスポンスされてきたJSONにアクセスできる
        //レスポンスされたデータをitemに代入
        const item = XHR.response.post;
        //既読状態であれば、灰色に変わるCSSを適用するためのカスタムデータを追加している
        if (item.checked === true){
          post.setAttribute("data-check", "true");
          //未読状態であれば、カスタムデータを削除している
        }else if (item.checked === false){
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);