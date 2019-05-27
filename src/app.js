class PromoDiscount {
    static get cookieParams()
    {
        return  {
            state : 'BITRIX_SM_discount_added',
            timestamp : 'BITRIX_SM_discount_timestamp',
            url: '/local/templates/ladyandgentleman/action/ajax.php'
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

$(document).ready(()=>{
    PromoDiscount.CheckDiscTimer();
    if(typeof Cookies.get('BITRIX_SM_discount_added')== 'undefined' || Cookies.get('BITRIX_SM_discount_added')== 0) {
        if(typeof Cookies.get('cancel_click') == 'undefined' || parseInt(Cookies.get('cancel_click')) <= 2){
            setTimeout(() => {
                $.magnificPopup.open({
                    items: {
                        src: '.promotion-popup'
                    }
                });}, 60000);
        }
    }
    $('a.more-detail').on('click',function(event){
        event.preventDefault();
        $('.area3').toggleClass('mfp-hide');
        $(this).find('svg').toggleClass('rotation');
    });
    $('.area2 button').on('click',function (event) {
        let _this = this;
        if(!$(this).hasClass('done'))
        {
            $.ajax({
                url: PromoDiscount.cookieParams.url,
                method: 'POST',
                data: {type: 'addDiscount'},
                dataType : 'json',
            })
                .then((response)=>{
                    if(response.status == 'added')
                    {
                        $(_this).addClass('done');
                        $(_this).text('скидка применена!');
                        PromoDiscount.CheckDiscTimer();
                    }
                    else if(response.status == 'error')
                    {
                        alert(response['error_text']);
                    }
                });
        }
    });
    $('.promotion-popup-close').on('click',function(event){
        if(typeof Cookies.get('cancel_click') == "undefined")
            Cookies.set('cancel_click','1',{
                expires: 365,
                path: '',
                domain: document.domain,
            });
        else
        {
            let counter = parseInt(Cookies.get('cancel_click'));
            Cookies.set('cancel_click',++counter,{
                expires: 365,
                path: '',
                domain: document.domain,
            });
        }
        event.preventDefault();
        $.magnificPopup.close();
    })
});