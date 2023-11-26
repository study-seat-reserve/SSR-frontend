$(document).ready(function () {
    $("#register_btn").click(function () {
        var email=$(".r_mail").val()
        //  alert(email)
        var user=$(".r_user").val()
        // alert(user)
        var password=$(".r_password").val()
        // alert(password)
        var confirm_password=$(".r_confirm_password").val()
        // alert(confirm_password)
        //判斷確認密碼
        if (password!=confirm_password) {
            alert("確認密碼和密碼不相同")
        }

        window.location.href='sign-in.html'
        alert("ok")
        //post data
        $.ajax({
            method: "POST",
            url: 'https://randomuser.me/api/',
            data:{"username":username,"password":password,"mail":mail},
            dataType: "json"
        })
        .done(function (data) {
            
            
        })

    })

})