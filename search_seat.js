
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

    //日期設定
    //設定最小今天
    var NowDate=new Date();
    var y=NowDate.getFullYear();
    var m=NowDate.getMonth()+1;
    var d=NowDate.getDate();
    var yy=NowDate.getFullYear();
    var mm=NowDate.getMonth()+1;
    var dd=NowDate.getDate();
    m = m < 10 ? "0" + m : "" + m;
    d = d < 10 ? "0" + d : "" + d;
    // console.log(y+'-'+m+'-'+d)
    $("#search_date").attr("min",y+'-'+m+'-'+d)
    //設定最大三天後
    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }
    var tmpDate = new Date();  // Augest 20, 2020
    // console.log(addDaysToDate(tmpDate, 3));
    var MaxDate=addDaysToDate(tmpDate, 3);
    y=MaxDate.getFullYear();
    m=MaxDate.getMonth()+1;
    d=MaxDate.getDate();
    m = m < 10 ? "0" + m : "" + m;
    d = d < 10 ? "0" + d : "" + d;
    $("#search_date").attr("max",y+'-'+m+'-'+d)

    //開始時間設定
    $("#startTime").append("<option>8:10</option>")
    $("#startTime").append("<option>8:30</option>")
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
        $("#startTime").append("<option>"+starth+":00</option>")
      }
      else{
        $("#startTime").append("<option>"+starth+":30</option>")
      }
    }
    //結束時間設定
    $("#endTime").append("<option>8:30</option>")
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
        $("#endTime").append("<option>"+endh+":00</option>")
      }
      else{
        $("#endTime").append("<option>"+endh+":30</option>")
      }
    }
    $("#endTime").append("<option>20:50</option>")
    //確認查詢
    let select_s,select_e
    $("#startTime").change(function(){
      select_s = $(this).val(); 
    })
    $("#endTime").change(function(){
      select_e = $(this).val(); 
    })
   $("#search_btn").click(function(){
      let temp=$("#search_date").val()

      if(select_s==null){
        alert("請選擇開始時間")
        return
      }
      else if(select_e==null){
        alert("請選擇結束時間")
        return
      }
      else if(temp==""){
        alert("請選擇日期")
        return
      }
      
      let s=0,e=0,j=0
      
      for (let i = select_s.length-1; i >=0; i--) {
        if(select_s[i]!=":"){
          s+=select_s[i]*(10**j)
          // console.log(select_s[i],i)
          j++
        }
      }
      j=0
      for (let i = select_e.length-1; i >=0; i--) {
        if(select_e[i]!=":"){
          e+=select_e[i]*(10**j)
          // console.log(select_e[i],i)
          j++
        }
      }
      // console.log(s,e)
      // var e=Date.parse(select_e);
      // console.log(s)
      // console.log(e)
      
      if(s>=e){
        alert("開始時間不得大於結束時間")
      }
      // console.log("set_seat")
      //先post資料
      // Date:String, y+'-'+m+'-'+d
      // Start_time:int, parseInt($("#startTime").val())
      // End_time:int, parseInt($("#endTime").val())
      
      

      select_s=select_s.split(':').map(function (part) {
        return part.padStart(2, '0');
      }).join(':');
      select_e=select_e.split(':').map(function (part) {
        return part.padStart(2, '0');
      }).join(':');
      // console.log(select_s,select_e)
      let start_time=Date.parse(temp+'T'+select_s+":00") 
      let end_time=Date.parse(temp+'T'+select_e+":00") 
      
      // let eco=+start_time.getTime()+"/"+end_time.getTime()
      // console.log(temp+'T'+select_s+":00"+"Z")
      // console.log(temp+'T'+select_e+":00"+"Z")
      // console.log(start_time)
      // console.log(end_time)

      $.ajax({
          method: "GET",
          // <date>/<start_time>/<end_time>
          url: "/api/show_status/"+start_time/1000+"/"+end_time/1000,
          // contentType: 'application/json',
          // data:JSON.stringify({"start_time": start_time, "end_time": end_time,})
        })
      .done(function( msg ) {
          alert("查詢成功")
          // console.log(msg)
          let now_data=JSON.parse(msg);
        
    // console.log(now_data.seats[0].seat_id)
    // console.log(now_data.seats[0].status)
    //status
    // Available,
    // Unavailable,
    // Borrowed,
    //這迴圈跑所有座位該有的值
    for (let i = 0; i <217 ; i++) {
        let j=i+1;
      switch (now_data.seats[i].status) {
          case "Available": {
              $(".seat"+j).css("background-color","#00c0EF")
            break; // 如果這裡沒有 break，則會繼續跑後面的 statement（不需要判斷有沒有符合條件）
          }
          case "Unavailable": {
              $(".seat"+j).css("background-color","#808080")
            break;
          }
          case "Borrowed":{
              $(".seat"+j).css("background-color","green")
          }
          default: {
            break;
          }
        }
    }
      })
      .fail(function (error) {
        alert("查詢失敗，請注意查詢時間是否已過")
      })
    
    

   })
    //座位href設定
    $(".seat_controll").attr("href","single_seat_info.html")
    //找出點擊的座位
    $(".seat_controll").click(function () {
    var temp_seatID= $(this).text();
    // console.log(temp_seatID.trim());
    localStorage.setItem("now_single", temp_seatID.trim())
    })
})

