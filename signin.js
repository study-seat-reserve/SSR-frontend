$(document).ready(function () {
    $('#sign-in').click(function(){
        //傳送資料
        // alert("email: " + $('#floatingInput').val()) 
        // alert("password: " + $('#floatingPassword').val()) 
        //表單驗證
        var email=$("#floatingInput").val()
        if(email==''){
            alert('請輸入電子信箱');
            $("#floatingInput").focus();
            return false;
        }else{
            var emailRegxp = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
            if (emailRegxp.test(email) != true){
                alert('電子信箱格式錯誤');
                $("#floatingInput").focus();
                $("#floatingInput").select();
                return false;
            }
        }
        var password=$("#floatingPassword").val()
        if(password==''){
            alert('請輸入密碼');
            $("#floatingPassword").focus();
            return false;
        }

        //成功進行跳轉
        window.location.href='now_seat.html'
        alert("ok")
        $.ajax({
            method: "POST",
            url: 'https://randomuser.me/api/',
            data:{"username":username,"password":password,"rember":rember},
            dataType: "json"

        })
        .done(function (data) {
            
            
        })
    })
})
