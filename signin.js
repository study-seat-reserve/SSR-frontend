$(document).ready(function(){
  
    $("#sign-in").click(function(){
      event.preventDefault()
        let username = $("#user-name").val();
        let password = $("#password").val();
        // console.log("user : "+username)
        // console.log("password : "+password)
        let account={"user_name":username,"password":password};
        //console.log(account)
        $.ajax({
            type: "POST",
            url: "/api/login",
            contentType: 'application/json',
            data: JSON.stringify(account)
          })
          .done(function( res ) {
            console.log(res);
            localStorage.setItem("Authorization",res);
            localStorage.setItem("user_name",username);
            window.location.href = "now_seat.html";
          })
          .fail(function (xhr, status, error) {
            // 處理後端回傳的錯誤
            var errorMessage = xhr.responseText || "Unknown error";
            console.log(status,error)
            alert("登入失敗"+error);
          })
        //alert("stop")
    })
    
})
            