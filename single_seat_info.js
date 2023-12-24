// localStorage.clear()

$(document).ready(function () {

    //判斷使否有登入
    key=localStorage.getItem("Authorization");
    user=localStorage.getItem("user_name");
    console.log(key,user)
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
    //處理座位代號
    console.log(localStorage)
    // console.log($("#single_seat_id").text())
    // console.log(localStorage.getItem("now_single"))
    $("#single_seat_id").text(localStorage.getItem("now_single"))
    let now_seat=$("#single_seat_id").text();
    
    //8:10-20:00
    let set_hour=8,set_min=10

    while(set_hour!=21 || set_min!=0){
      let tbody = $("#time-table tbody");
      //處理最後
      if(set_hour==8 && set_min==10){
        // 創建新的行
        let newRow = $("<tr>");
        // 創建新的單元格，並添加內容和 id
        let cell1 = $("<td>").text(set_hour+":10");
        let cell2 = $("<td>").text("").attr("id","day0+"+set_hour*100);
        let cell3 = $("<td>").text("").attr("id","day1+"+set_hour*100);
        let cell4 = $("<td>").text("").attr("id","day2+"+set_hour*100);
        let cell5 = $("<td>").text('').attr("id","day3+"+set_hour*100);
        // 將單元格添加到新行
        newRow.append(cell1, cell2,cell3,cell4,cell5);
        // 將新行添加到 tbody
        tbody.append(newRow);
      }
      if (set_min==0) {
        // 創建新的行
        let newRow = $("<tr>");
        // 創建新的單元格，並添加內容和 id
        let cell1 = $("<td>").text(set_hour+":00");
        let cell2 = $("<td>").text("").attr("id","day0+"+set_hour*100);
        let cell3 = $("<td>").text("").attr("id","day1+"+set_hour*100);
        let cell4 = $("<td>").text("").attr("id","day2+"+set_hour*100);
        let cell5 = $("<td>").text('').attr("id","day3+"+set_hour*100);
        // 將單元格添加到新行
        newRow.append(cell1, cell2,cell3,cell4,cell5);
        // 將新行添加到 tbody
        tbody.append(newRow);
      }
      else if(set_min==30){
        // 創建新的行
        let newRow = $("<tr>");
        // 創建新的單元格，並添加內容和 id
        let cell1 = $("<td>").text(set_hour+":30");
        let cell2 = $("<td>").text("").attr("id","day0+"+set_hour*100+set_min);
        let cell3 = $("<td>").text("").attr("id","day1+"+set_hour*100+set_min);
        let cell4 = $("<td>").text("").attr("id","day2+"+set_hour*100+set_min);
        let cell5 = $("<td>").text('').attr("id","day3+"+set_hour*100+set_min);
        // 將單元格添加到新行
        newRow.append(cell1, cell2,cell3,cell4,cell5);
        // 將新行添加到 tbody
        tbody.append(newRow);
      }

      if(set_hour==20 && set_min==30){
        // 創建新的行
        let newRow = $("<tr>");
        // 創建新的單元格，並添加內容和 id
        let cell1 = $("<td>").text("20:50");
        let cell2 = $("<td>").text("").attr("id","day0+2050");
        let cell3 = $("<td>").text("").attr("id","day1+2050");
        let cell4 = $("<td>").text("").attr("id","day2+2050");
        let cell5 = $("<td>").text('').attr("id","day3+2050");
        // 將單元格添加到新行
        newRow.append(cell1, cell2,cell3,cell4,cell5);
        // 將新行添加到 tbody
        tbody.append(newRow);
      }

      if(set_min==10){
        set_min=30;
      }
      else if(set_min==0){
        set_min=30;
      }
      else{
        set_hour++;
        set_min=0;
      }
      
    }
    
    //處理時間
    var NowDate=new Date();
    var y=NowDate.getFullYear();
    var m=NowDate.getMonth()+1;
    var d=NowDate.getDate();
    var y1=NowDate.getFullYear();
    var m1=NowDate.getMonth()+1;
    var d1=NowDate.getDate();
    $("#single_date").text(y+"/"+m+"/"+d)

    //處理表格時間
    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
    //跑單一座位每天狀態
    //輸入資料
    //seat id $("#single_seat_id").text()
    //Date $day+index.text() 在上面的迴圈
          
    for (let index = 0; index < 4; index++) {
      //從今天開始算
      tempDate = new Date();
      //往後四天
      var MaxDate=addDaysToDate(tempDate, index);
      y1=MaxDate.getFullYear();
      m1=MaxDate.getMonth()+1;
      d1=MaxDate.getDate();
      //表格上的日期
      $("#day"+index).text(m1+"/"+d1)
      let single_date_start=new Date(y1+'-'+m1+'-'+d1)
      let single_date_end=new Date(y1+'-'+m1+'-'+d1+"T23:00:00")
      let eco_data=now_seat+'/'+single_date_start.getTime()/1000+'/'+single_date_end.getTime()/1000
      console.log(index+" "+"/api/show_reservations/"+eco_data)
      $.ajax({
        method: "GET",
        // <date>/<seat_id>
        url: "/api/show_reservations/"+eco_data,
      })
        .done(function( msg ) {
          console.log(msg)
          if(msg.length!=2){
            //array就是我們要用的
            let array=JSON.parse(msg)
            for (let index = 0; index < array.length; index++) {
              let s=array[index][0].toString();
              let e=array[index][1].toString();
              console.log(s,e)
              let ss=s.slice(0, 2) + ":" + s.slice(2,4);
              let ee=e.slice(0, 2) + ":" + e.slice(2,4);
              console.log(ss,ee)
            }
          }
        })  
        
    }
    //預約時間設定
    //日期設定
    //設定最小今天
    var NowDate=new Date();
    var y=NowDate.getFullYear();
    var m=NowDate.getMonth()+1;
    var d=NowDate.getDate();
    var yy=NowDate.getFullYear();
    var mm=NowDate.getMonth()+1;
    var dd=NowDate.getDate();
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
    //開始時間設定
    $("#check_startTime").append("<option>8:10</option>")
    $("#check_startTime").append("<option>8:30</option>")
    let starth=8,startm=30;
    while(starth!=20 || startm!=30){
      if(startm==0){
        startm=30;
      }
      else{
        starth++;
        startm=0;
      }
      if (startm==0) {
        $("#check_startTime").append("<option>"+starth+":00</option>")
      }
      else{
        $("#check_startTime").append("<option>"+starth+":30</option>")
      }
    }
    //結束時間設定
    $("#check_endTime").append("<option>8:30</option>")
    let endh=8,endm=30;
    while(endh!=20 || endm!=30){
      if(endm==0){
        endm=30;
      }
      else{
        endh++;
        endm=0;
      }
      if (endm==0) {
        $("#check_endTime").append("<option>"+endh+":00</option>")
      }
      else{
        $("#check_endTime").append("<option>"+endh+":30</option>")
      }
    }
    //當確認預約被按下
    $("#check_btn").click(function () {
        //先post資料
        // Date:String, y+'-'+m+'-'+d
        // Start_time:int, parseInt($("#startTime").val())
        // End_time:int, parseInt($("#endTime").val())
        let reg={
          "seat_id": null,
          "start_time": null,
          "end_time":null,
        }
        
        console.log($("#check_endTime").val())
        let temp=$("#search_date").val()
        reg["seat_id"]=$("#single_seat_id").text();
        reg["start_time"]=Date.parse(temp+"T"+$("#check_startTime").val())/1000
        reg["end_time"]=Date.parse(temp+"T"+$("#check_endTime").val())/1000
        
        console.log(reg)
          $.ajax({
            headers: {
              'Authorization':'Bearer '+ key
            },
            type: "POST",
            url: "/api/reserve",
            contentType: 'application/json',
            data: JSON.stringify(reg)
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
