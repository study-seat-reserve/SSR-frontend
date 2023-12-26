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
  //預約隱藏
  for (let index = 0; index < 4; index++) {
    $("#day"+index).css("display","none")
  }
  if(key==null){
    alert("請先登入")
    // window.location.href = "signin.html";
  }
 
  //初始設定設定
  function formatTime(hour, minute) {
    var formattedHour = hour.toString().padStart(2, '0');
    var formattedMinute = minute.toString().padStart(2, '0');
    return formattedHour + ':' + formattedMinute;
  }
  //使用者
  $("#personnal_user").text(user_id)
  
  //獲取資料
  $.ajax({
    headers: {
      'Authorization':'Bearer '+ key
    },
    method: "GET",
    url: '/api/user_reservations'
  })
  .done(function (reg) {
    // console.log(reg,reg.length)
    //開始放入
    for (let i = 0; i <reg.length; i++) {
      let start=new Date(reg[i].start_time*1000)
      let end=new Date(reg[i].end_time*1000)
      // console.log(start,end)
      let y=start.getFullYear()
      let d=(start.getMonth() + 1)+"/"+start.getDate();
      let s=formatTime(start.getHours(),start.getMinutes());
      let e=formatTime(end.getHours(),end.getMinutes());
      // console.log(d,s,e)
      $("#day"+i).css("display","block")
      $("#day"+i+"_year").text(y)
      $("#day"+i+"_date").text(d+" "+" ")
      $("#day"+i+"_start").text(s+" -")
      $("#day"+i+"_end").text(e+" ")
      $("#day"+i+"_seatID").text("座位" + reg[i].seat_id+"")
    }

  })
    //刪除按鈕
    $(".r_delete").click(function () {
        // console.log($(this).attr('id'))
        //得到要刪除的座位id
        var this_id=$(this).attr('id')
        // console.log(this_id)
        let year=$("#day"+this_id+"_year").text()
        let day=$("#day"+this_id+"_date").text()
        let start=$("#day"+this_id+"_start").text()
        let end=$("#day"+this_id+"_end").text()
        // console.log(year,day,start,end)
        start= start.slice(0, -1)
        // console.log(year+day+start,year+day+end)
        let s=new Date(year+" "+day+start)
        let e=new Date(year+" "+day+end)
        // console.log(s,e)
        let s_tamp=s.getTime()/1000
        let e_tamp=e.getTime()/1000
        let delete_data={"start_time":s_tamp,"end_time":e_tamp}
        $.ajax({
          headers: {
            'Authorization':'Bearer '+ key
          },
          method: "post",
          url: '/api/delete_reservation',
          contentType: 'application/json',
          data:JSON.stringify(delete_data)
        })
        .done(function () {
          alert("刪除成功")
          location.reload()
        })
        .fail(function () {
          alert("刪除失敗")
        })

        
    })
    
})

