$(document).ready(function () {
   
    // console.log("ready ok");
    

    $("#register-btn").click(function () {
      event.preventDefault();
        // alert("stop")
        let mail=$("#user-mail").val()
        let name=$("#user-name").val()
        let password=$("#password").val()
        let c=$("#confirm-p").val()
        var tmp=1;
        if(name.length > 20){
            alert("不可輸入字數大於20的名字");
            tmp=0;
        }
        if(password.length<8){
          alert("不可輸入字數小於8的密碼");
          tmp=0;
        }
        if(password.length>20){
          alert("不可輸入字數大於20的密碼");
          tmp=0;
        }
        if(password!==c){
          alert("密碼與確認密碼不同");
          tmp=0;
        }
        if(tmp == 1){
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
        }
    })
})