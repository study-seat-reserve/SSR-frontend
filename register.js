$(document).ready(function () {
   
    // console.log("ready ok");
    

    $("#register-btn").click(function () {
      event.preventDefault();
        // alert("stop")
        let mail=$("#user-mail").val()
        let name=$("#user-name").val()
        let password=$("#password").val()
        let c=$("#confirm-p").val()
        // console.log(mail+"\n"+name+"\n"+password+"\n"+c)
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
        .done(function(res) {
          // alert(res);
          alert("註冊成功，請到信箱查看驗證")
          // localStorage.setItem("Authorization",data)
          window.location.href = "signin.html";
        })
        .fail(function (xhr, status, error) {
          // 處理後端回傳的錯誤
          var errorMessage = xhr.responseText || "Unknown error";
          console.log(status,error)
          alert("註冊失敗"+error);
        });
        
    })
})