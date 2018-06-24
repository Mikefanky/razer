$( document ).ready(function() {
    $('.parallax-window').parallax();
    $('#checkIn').change(render);
    $('#checkOut').change(render);
    $('.brone').click(function(){
        var fio = $("input[name*='fio']").val();
        var email = $("input[name*='email']").val();
        var phone = $("input[name*='phone']").val();
        var country = $("select[name*='country']").val();
        var people = $("select[name*='people']").val();
        var number = $("select[name*='number']").val();
        var checkIn = $("input[name*='check-in']").val();
        var checkOut= $("input[name*='check-out']").val();
        if(fio && email && phone && country && people && number){
            $.ajax({
                url:'/brone',
                type:'POST',
                data:{
                    fio:fio,
                    email:email,
                    phone:phone,
                    country:country,
                    people:people,
                    number:number,
                    wishes:$('textarea[name=wishes]').val(),
                }
            });
        }
    });
    $('.btn.newsSend').click(function(){
        $.ajax({
            url:'/newsAdd',
            type:'POST',
            data:{
                title:$('#title').val(),
                content:$('#content').val(),
                time:formatDate()
            }
        }).done(function(res){
            if(res){
                alert("News send done!");
                location.reload();
            }
        })
    })

    $('.btn.submit').click(function(){
        var file = $('#photoImg')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/imgUpload',
                type:'POST',
                data:{
                    fileName:file.name,
                    data:reader.result
                }
            }).done(function(res){
                if(res){
                    alert("News send done!");
                    location.reload();
                }
            })
        }
    })



    function render(){
        var checkIn = $('#checkIn').val();
        var checkOut = $('#checkOut').val();
        if(checkIn && checkOut){
            checkIn = $('#checkIn').datepicker('getUTCDate');
            checkOut = $('#checkOut').datepicker('getUTCDate');
            var result =  checkOut - checkIn;
            var result = Math.ceil(result / (1000 * 3600 * 24)*750);
            $('#price').text(result+ "₴");
        }
        else{
            $('#price').text("750 ₴");
        }
    }

    $('.buttom.login').click(function(){
        if($('#login')&& $('#password')){
            $.ajax({
                url:'/login',
                type:'POST',
                data:{
                    login:$('#login').val(),
                    password:$('#password').val()
                }
            }).done(function(res){
              if(res)
                 document.location = "admin/administration";
            }).fail(function(err){
                alert(err);
            })
        }
    })

    $('#logOut').click(function(){
        console.log("logOut")
            $.ajax({
                url:'/logOut',
                type:'POST'
            }).done(function(res){
                if(res)
                    location.reload();
            }).fail(function(err){
                alert('Server erorr');
            })
    })
      
});

function formatDate() {
    var date = new Date();
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear() % 100;
    yy = '20' + yy;
    return  time = dd + '.' + mm + '.' + yy;
  }