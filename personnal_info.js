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
    
    //得到資料
    // Json{
    //     "reservations": [
    //         {
    //             "user_id": String,
    //             "seat_id": int,
    //             "date": String,
    //             "start_time": int,
    //             "end_time": int,
    //         },
    //     ]
    // }
    let abc={
        "reservations": [
            {
                "user_id": "eric",
                "seat_id": 18,
                "date": "2023-11-28",
                "start_time": 140000,
                "end_time": 170000,
            },
            {
                "user_id": "eric",
                "seat_id": 9,
                "date": "2023-11-29",
                "start_time": 83000,
                "end_time": 170000,
            }
        ]
    }
    $("#personnal_user").text(abc.reservations[0].user_id)
    //fake資料
    // var date=["112/11/26","112/11/27","112/11/28","112/11/29"]
    // var start=["8:00","14:00","12:00","17:00"]
    // var end=["19:00","16:00","16:00","20:00"]
    // var seat_id=["01","02","63","191"]
    for (let index = 0; index < 4; index++) {
        $("#day"+index).css("display","none")
    }
    console.log(abc.reservations.length)
    for (let index = 0; index < abc.reservations.length; index++) {
        let start=Math.floor(abc.reservations[index].start_time/10000)+":"+Math.floor((abc.reservations[index].start_time/1000)%10)+Math.floor((abc.reservations[index].start_time/100)%10)
        let end=Math.floor(abc.reservations[index].end_time/10000)+":"+Math.floor((abc.reservations[index].end_time/1000)%10)+Math.floor((abc.reservations[index].end_time/100)%10)
        // console.log(start)
        $("#day"+index).css("display","block")
        $("#day"+index+"_date").text(abc.reservations[index].date+" "+" ")
        $("#day"+index+"_start").text(start+" -")
        $("#day"+index+"_end").text(end+" ")
        $("#day"+index+"_seatID").text("座位" + abc.reservations[index].date+"")
    }
    //刪除按鈕
    // Json{
    //     "user_id":String,
    //     "seat_id":int,
    //     "date": String,
    //     "start_time": int,
    //     "end_time": int,
    //    }
    $(".r_delete").click(function () {
        // console.log($(this).attr('id'))
        //得到要刪除的座位id
        var this_id=seat_id[$(this).attr('id')]
        // //seat_id
        // console.log(this_id)
        // //user_id
        // console.log(user_id)
        // //date 
        // console.log(date[$(this).attr('id')])
        // //start_time
        // console.log(start[$(this).attr('id')])
        // //end_time
        // console.log(end[$(this).attr('id')])
        

    })
})