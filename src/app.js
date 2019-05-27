(function () {
    const PromoDiscount = require('./class.js');
    $(document).ready(() => {
        PromoDiscount.CheckDiscTimer();
        if (typeof Cookies.get('BITRIX_SM_discount_added') == 'undefined' || Cookies.get('BITRIX_SM_discount_added') == 0) {
            if (typeof Cookies.get('cancel_click') == 'undefined' || parseInt(Cookies.get('cancel_click')) <= 2) {
                setTimeout(() => {
                    $.magnificPopup.open({
                        items: {
                            src: '.promotion-popup'
                        }
                    });
                }, 60000);
            }
        }
        $('a.more-detail').on('click', function (event) {
            event.preventDefault();
            $('.area3').toggleClass('mfp-hide');
            $(this).find('svg').toggleClass('rotation');
        });
        $('.area2 button').on('click', function (event) {
            let _this = this;
            if (!$(this).hasClass('done')) {
                $.ajax({
                    url: PromoDiscount.cookieParams.url,
                    method: 'POST',
                    data: {type: 'addDiscount'},
                    dataType: 'json',
                })
                    .then((response) => {
                        if (response.status == 'added') {
                            $(_this).addClass('done');
                            $(_this).text('скидка применена!');
                            PromoDiscount.CheckDiscTimer();
                        } else if (response.status == 'error') {
                            alert(response['error_text']);
                        }
                    });
            }
        });
        $('.promotion-popup-close').on('click', function (event) {
            if (typeof Cookies.get('cancel_click') == "undefined")
                Cookies.set('cancel_click', '1', {
                    expires: 365,
                    path: '',
                    domain: document.domain,
                });
            else {
                let counter = parseInt(Cookies.get('cancel_click'));
                Cookies.set('cancel_click', ++counter, {
                    expires: 365,
                    path: '',
                    domain: document.domain,
                });
            }
            event.preventDefault();
            $.magnificPopup.close();
        })
    });
}());