class PromoDiscount {
    static get cookieParams()
    {
        return  {
            state : 'BITRIX_SM_discount_added',
            timestamp : 'BITRIX_SM_discount_timestamp',
            url: '/test/ajax.php'
        };
    }
    static CheckDiscTimer()
    {
        $.ajax({
            url: PromoDiscount.cookieParams.url,
            method: 'POST',
            data: {type: 'show_time'},
            dataType: 'json'
        })
            .then((response)=>{
                if(response.status == 'active')
                {
                    let remain = response.remain;
                    $('.digit-time-left').find('span')[0].innerText = (parseInt(remain/60)>=10)? parseInt(remain/60) : '0'
                        +parseInt(remain/60).toString();
                    $('.digit-time-left').find('span')[1].innerText = (remain%60>=10)? remain%60 : '0'+(remain%60).toString();
                    $('.time-left').removeClass('mfp-hide');
                    let inter = setInterval(()=>{
                        remain -= 1;
                        if(remain <=0){
                            clearInterval(inter);
                            $.ajax({
                                url: "/test/ajax.php",
                                method: 'POST',
                                data: {type: 'show_time'},
                                dataType: 'json'
                            })
                            $('.time-left').addClass('mfp-hide');
                        }
                        let min = parseInt(remain/60)
                        let sec = remain%60
                        $('.digit-time-left').find('span')[0].innerText = (min>=10)? min : '0'+min.toString();
                        $('.digit-time-left').find('span')[1].innerText = (sec>=10)? sec : '0'+sec.toString();
                    },1000);
                }
            })
    }

}
module.exports = PromoDiscount;