
$(document).ready(function () {
    console.log("test")
    var NowDate=new Date();
    var mon=NowDate.getMonth();
    var d=NowDate.getDate();
    var h=NowDate.getHours();
    var m=NowDate.getMinutes();
    //現在時間
    console.log(NowDate)
    //需要回傳值，先用temp

    $.ajax({
        method: "GET",
        url: 'https://randomuser.me/api/'
    })
    .done(function (msg) {
        console.log(msg)
    })
    //拿到資料
    // {
    //     "user_id":"0296232f-bef6-4e9c-ad7c-50f61d43dbfb",
    //     "seat_id":1,
    //     "date":"2023-11-27",
    //     "start_time":180000,
    //     "end_time":190000
    // }

    //判斷使否有登入
    var user_id=""
    
    if(user_id==""){
      $("#sign_button").attr("href","sign-in.html")
    }
    else{
      $("#sign_button").text(user_id+"(登出)")
      $("#sign_button").attr("href","#")
    }
    $("#sign_button").click(function () {
      if(user_id!=""){
        user_id=""
        $("#sign_button").text("登入/註冊")
        $("#sign_button").attr("href","sign-in.html")
      }
    })


    //status
    // Available,
    // Unavailable,
    // Borrowed,
    var data=["Available","Unavailable","Borrowed"]
    //這迴圈跑所有座位該有的值
    for (let i = 1; i <= 217; i++) {
        temp=Math.floor(Math.random()*3)
        switch (data[temp]) {
            case "Available": {
                $(".seat"+i).css("background-color","#00c0EF")
              break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
            }
            case "Unavailable": {
                $(".seat"+i).css("background-color","green")
              break;
            }
            case "Borrowed":{
                $(".seat"+i).css("background-color","#808080")
            }
            default: {
              break;
            }
          }
      }

      localStorage.clear()
    //座位href設定
    $(".seat_controll").attr("href","single_seat_info.html")
    //找出點擊的座位
    $(".seat_controll").click(function () {
    var temp_seatID= $(this).text();
    console.log(temp_seatID.trim());
    localStorage.setItem("now_single", temp_seatID.trim())
    })

})