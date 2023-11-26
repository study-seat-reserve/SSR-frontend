
$(document).ready(function () {

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

    //日期設定
    //設定最小今天
    var NowDate=new Date();
    var y=NowDate.getFullYear();
    var m=NowDate.getMonth()+1;
    var d=NowDate.getDate();
    $("#search_date").attr("min",y+'-'+m+'-'+d)
    //設定最大三天後
    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
    var tmpDate = new Date();  // Augest 20, 2020
    console.log(addDaysToDate(tmpDate, 3));
    var MaxDate=addDaysToDate(tmpDate, 3);
    y=MaxDate.getFullYear();
    m=MaxDate.getMonth()+1;
    d=MaxDate.getDate();
    $("#search_date").attr("max",y+'-'+m+'-'+d)

    //時間設定
    $('.timepicker').timepicker({
        timeFormat: 'H:mm',
        interval: 30,
        minTime: '8',
        maxTime: '21',
        defaultTime: '8',
        startTime: '8',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        change: give_val
    });
    //設定開始最小時間
    // console.log($("#endTime").timepicker().format())
    function give_val() {
        console.log("開始"+$("#startTime").val());
        console.log("結束"+$("#endTime").val());
        
        if(parseInt($("#startTime").val())<parseInt($("#endTime").val())){
            set_seat();
        }
    }
    function set_seat() {
        console.log("set_seat")
        //先post資料
        // Date:String, y+'-'+m+'-'+d
        // Start_time:int, parseInt($("#startTime").val())
        // End_time:int, parseInt($("#endTime").val())
        $.ajax({
            method: "POST",
            url: "some.php",
            data: { name: "John", location: "Boston" }
          })
            .done(function( msg ) {
              alert( "Data Saved: " + msg );
            });
        //這邊要get資料
        // "seats": [{
        //     "seat_id": int,
        //     "status": String
        //     },]
        // }
        $.ajax({
            method: "GET",
            url: 'https://randomuser.me/api/',
        })
        .done(function (msg) {
            console.log(msg)
        })

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
    }

    //
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

