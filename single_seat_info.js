// localStorage.clear()

$(document).ready(function () {


    //判斷使否有登入
    var user_id="01057104"
    
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

    //處理座位代號
    console.log(localStorage)
    // console.log($("#single_seat_id").text())
    // console.log(localStorage.getItem("now_single"))
    $("#single_seat_id").text(localStorage.getItem("now_single"))
    
    //處理時間
    var NowDate=new Date();
    var y=NowDate.getFullYear();
    var m=NowDate.getMonth()+1;
    var d=NowDate.getDate();
    $("#single_date").text(y+"/"+m+"/"+d)

    //處理表格時間
    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
    for (let index = 0; index < 4; index++) {
        tempDate = new Date();  // Augest 20, 2020
        // console.log(addDaysToDate(tempDate, index));
        var MaxDate=addDaysToDate(tempDate, index);
        y=MaxDate.getFullYear();
        m=MaxDate.getMonth()+1;
        d=MaxDate.getDate();
        $("#day"+index).text(m+"/"+d)
    }
    //跑單一座位每天狀態
    //輸入資料
    //seat id $("#single_seat_id").text()
    //Date $day+index.text() 在上面的迴圈
    for (let index = 0; index < 0; index++) {
        
        
    }


    //預約座位
    // Json{
    //     "user_id":String,  
    //     "seat_id":int, $("#single_seat_id").text()
    //     "date": String, $("#reserve_date").val()
    //     "start_time": int, $("#startTime").val()
    //     "end_time": int, $("#endTime").val()
    // }

    //當確認預約被按下
    $("check_btn").click(function () {
        //先post資料
        // Date:String, y+'-'+m+'-'+d
        // Start_time:int, parseInt($("#startTime").val())
        // End_time:int, parseInt($("#endTime").val())
        $.ajax({
            method: 'POST',
            url: '/open/hello-world',
            data: JSON,
          })
             .done(function(msg) {
                //已經成功預約
               alert('Data Saved: ' + msg);
             })
                //失敗處理
             .fail(function(msg) {
                alert('Failed: ' + msg);});
    })
       

        
    
})
