$( document ).ready(function() {
    $('.parallax-window').parallax();
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });



    $('.brone').click(function(){
        var d = $('div#someID').datepicker('getDate');
        var fio = $("input[name*='fio']").val();
        var email = $("input[name*='email']").val();
        var phone = $("input[name*='phone']").val();
        var country = $("select[name*='country']").val();
        var people = $("select[name*='people']").val();
        var number = $("select[name*='number']").val();
        var checkIn = $("input[name*='check-in']").val();
        var checkOut= $("input[name*='check-out']").val();
        if(fio && email && phone && country && people && number){
            // && checkIn && checkOut
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
});
