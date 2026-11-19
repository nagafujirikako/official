
$(function () {

  const pc = window.matchMedia("(min-width: 768px)");

  function kirikae() {

    if (pc.matches) {

      // ーーーーーーーーーー未練の歌ーーーーーーーーーー
      $('#miren .cd')
        .on('mouseover', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 0
          }, 500);
        })
        .on('mouseover', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 1,
            'width': '19%',
            'top': '42%',
            'left': '6%'
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 1
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 0
          }, 500);
        });


      // ーーーーーーーーーーーぐるぐるーーーーーーーーーー
      $('#guruguru .cd')
        .on('mouseover', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 0
          }, 500);
        })
        .on('mouseover', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 1,
            'width': '24%',
            'top': '70%',
            'left': '25%'
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 1
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 0
          }, 500);
        });


      // ーーーーーーーーーーーーー今日もーーーーーーーーーーー
      $('#kyoumo .cd')
        .on('mouseover', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 0
          }, 500);
        })
        .on('mouseover', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 1,
            'width': '19%',
            'top': '30%',
            'left': '49%'
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.mae').stop(true).animate({
            opacity: 1
          }, 500);
        })
        .on('mouseout', function () {
          $(this).find('.ato').stop(true).animate({
            opacity: 0
          }, 500);
        });

    } else {

      $("#miren .cd, #guruguru .cd, #kyoumo .cd")
        .off("mouseover mouseout")
        .find(".mae, .ato")
        .stop(true)
        .removeAttr("style");

    }

  }

  kirikae();

  pc.addEventListener("change", kirikae);



  // ーーーーーーーーーー スマホ用の歌詞画面 ーーーーーーーーーー

  $(".kyokumei a[data-sp]").on("click", function (e) {

    // パソコンでは今までどおり
    if (window.innerWidth > 767) return;

    // スマホではLightboxを開かない
    e.preventDefault();
    e.stopPropagation();

    // スマホ用の歌詞画像を取得
    const image = $(this).attr("data-sp");

    // 画像を入れて表示する
    $("#sp-kashi").attr("src", image);
    $("#sp-scroll").scrollTop(0);
    $("#sp-modal").show();

  });



  // ーーーーーーーーーー ×ボタンで歌詞を閉じる ーーーーーーーーーー

  $("#sp-close").on("click", function () {
    $("#sp-modal").hide();
  });



  // ーーーーーーーーーー 自動スクロール ーーーーーーーーーー

  let timer = null;

  $("#sp-play").on("click", function () {

    // 再生中なら一時停止
    if (timer !== null) {

      clearInterval(timer);
      timer = null;
      $(this).text("▶ 自動スクロール");

    } else {

      // 停止中なら再生
      timer = setInterval(function () {

        const scroll = $("#sp-scroll")[0];

        // 0.1秒ごとに1px下へ
        scroll.scrollTop += 1;

        // 一番下まで来たら停止
        if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {

          clearInterval(timer);
          timer = null;
          $("#sp-play").text("▶ 自動スクロール");

        }

      }, 110);

      $("#sp-play").text("⏸ 一時停止");

    }

  });



  // ーーーーーーーーーー お問い合わせフォーム ーーーーーーーーーー

  $(".contact-form").on("submit", function (e) {

    // 通常のページ移動を止める
    e.preventDefault();

    const form = this;
    const button = $(form).find('button[type="submit"]');
    const message = $("#form-message");

    // 送信中は二重送信を防ぐ
    button.prop("disabled", true).text("送信中...");
    message.text("");

    // Formspreeに送信
    $.ajax({

      url: form.action,
      method: "POST",
      data: $(form).serialize(),
      dataType: "json",

      headers: {
        "Accept": "application/json"
      },


      // ーーーーー 送信成功 ーーーーー
      success: function () {

        // 入力欄と送信ボタンを消す
        $(form).find(".form-item, button").hide();

        // 完了メッセージだけ表示する
        message.html("お問い合わせありがとうございました。<br>送信が完了しました！");

      },


      // ーーーーー 送信失敗 ーーーーー
      error: function () {

        message.html("送信できませんでした。<br>時間をおいて再度お試しください。");

      },


      // ーーーーー 送信処理終了 ーーーーー
      complete: function () {

        button.prop("disabled", false).text("送信する →");

      }

    });

  });

});
