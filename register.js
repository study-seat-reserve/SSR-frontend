$(document).ready(function () {
   
    console.log("ready ok");

    $("#register-btn").click(function () {
        event.preventDefault(); // 阻止表單的默認提交行為
        // alert("stop")
        let mail=$("#user-mail").val()
        let name=$("#user-name").val()
        let password=$("#password").val()
        let c=$("#confirm-p").val()
        console.log(mail+"\n"+name+"\n"+password+"\n"+c)
        //let user_name = &data.user_name;
          // let password = &data.password;
          // let email = &data.email;
        $.ajax({
            type: "POST",
            url: "/api/register",
            contentType: 'application/json',
            data:JSON.stringify({
                "user_name": name, 
                "password": password,
                "email": mail
            }),
          })
          .done(function( res ) {
            // alert(res);
            alert("註冊成功，請到信箱查看驗證")
            // localStorage.setItem("Authorization",data)
            window.location.href = "signin.html";
          })
          .fail(function (error) {
            console.error('Error:', error);
            alert( "Fail");
          })
        alert("end")
    })
})