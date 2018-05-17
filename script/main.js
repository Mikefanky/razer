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
                    number:number
                }
            });
        }
    });

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
      
});
