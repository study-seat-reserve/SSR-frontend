$(document).ready(function () {
    //var user_id=""
    var user_id = "01057104"
    if (user_id == "") {
        alert("請先登入")
        window.location.href = 'sign-in.html'
    }
    $("#personnal_user").text(user_id)
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
    //fake資料
    var date=["112/11/26","112/11/27","112/11/28","112/11/29"]
    var start=["8:00","14:00","12:00","17:00"]
    var end=["19:00","16:00","16:00","20:00"]
    var seat_id=["01","02","63","191"]
    for (let index = 0; index < 4; index++) {
        $("#day"+index+"_date").text(date[index]+" ")
        $("#day"+index+"_start").text(start[index]+" -")
        $("#day"+index+"_end").text(end[index]+" ")
        $("#day"+index+"_seatID").text("座位" + seat_id[index]+"")
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