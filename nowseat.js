
$(document).ready(function () {
  //判斷使否有登入
  key=localStorage.getItem("Authorization");
  user=localStorage.getItem("user_name");
  // console.log(key,user)
  var user_id=user;
    
  if(user_id!=null){
    $("#sign_button").text(user_id+"(登出)")
  }
  else{
    $("#sign_button").text("登入/註冊")
  }
  $("#sign_button").click(function () {
    if(user_id!=null){
      localStorage.clear()
      $("#sign_button").text("登入/註冊")
    }
  })

    
    // var NowDate=new Date();
    // var mon=NowDate.getMonth();
    // var d=NowDate.getDate();
    // var h=NowDate.getHours();
    // var m=NowDate.getMinutes();
    //現在時間
    // console.log(NowDate)

    
    $.ajax({
        method: "GET",
        url: '/api/show_status' 
    })
    .done(function (msg) {
          // console.log(msg)
        let now_data=JSON.parse(msg);
        // console.log(now_data.seats[0].seat_id)
        // console.log(now_data.seats[0].status)
        //status
        // Available,
        // Unavailable,
        // Borrowed,
        //這迴圈跑所有座位該有的值
        for (let i = 0; i <216; i++) {
          let j=i+1
          
          switch (now_data.seats[i].status) {
              case "Available": {
                  $(".seat"+j).css("background-color","#00c0EF")
                break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
              }
              case "Unavailable": {
                  $(".seat"+j).css("background-color","green")
                break;
              }
              case "Borrowed":{
                  $(".seat"+j).css("background-color","#808080")
              }
              default: {
                break;
              }
            }
        }
    })
    //座位href設定
    $(".seat_controll").attr("href","single_seat_info.html")
    //找出點擊的座位
    $(".seat_controll").click(function () {
    var temp_seatID= $(this).text();
    console.log(temp_seatID.trim());
    localStorage.setItem("now_single", temp_seatID.trim())
    })

})