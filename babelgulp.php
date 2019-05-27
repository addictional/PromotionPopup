<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("babelgulp");
?>
<?
global $APPLICATION;
$currentDir = str_replace($_SERVER['DOCUMENT_ROOT'],"",__DIR__);
$APPLICATION->AddHeadScript($currentDir."/build/libs/magnific-popup/dist/jquery.magnific-popup.min.js");
$APPLICATION->SetAdditionalCSS($currentDir."/build/libs/magnific-popup/dist/magnific-popup.css");
$APPLICATION->AddHeadScript($currentDir."/build/app.js");
$APPLICATION->SetAdditionalCSS($currentDir."/build/style.css");

if(isset($_COOKIE['BITRIX_SM_discount_added']) && $_COOKIE['BITRIX_SM_discount_added'])
{
    if(($_COOKIE['BITRIX_SM_discount_timestamp']+20*60)>time())
        $disc_added = true;
    else
    {
        $disc_added = false;
    }
}
?>

<div   class="promotion-popup mfp-hide" >
    <div class="flexim">
        <div class="area1"></div>
        <div class="area2" >
            <a href="#" class="promotion-popup-close">×</a>
            <h3>Скидка</h3>
            <p class="big-pig">Оформите заказ в течение 20 минут и получите скидку до 15%</p>
            <button <?echo ($disc_added ? ' class="done"': '');?> ><?echo ($disc_added ? 'скидка применена!': 'Получить скидку');?></button>
            <p class="little-pig">Скидка будет автоматически применена в вашей корзине пока не истекло указанное время</p>
            <a href="#" class="more-detail">Подробнее об условиях акции
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                    <path d="M1 1L5.5 5L10 1" stroke="#1A1A1A" stroke-width="1.2"/>
                </svg>
            </a>
        </div>
    </div>
    <div class="area3 mfp-hide" >
        <ul>
            <li>В рамках акции предоставляется скидка 15% или 10% в зависимости от бренда</li>
            <li>Скидка распространяется только на товары нового сезона без скидки</li>
            <li>Скидка по акции не суммируется с другими акциями</li>
            <li>Не распространяется на бренды HUGO и BOSS</li>
        </ul>
    </div>
</div>
<div class="time-left mfp-hide">
    <p class="text-time-left">Оставшееся время:</p>
    <p class="digit-time-left">
        <span>19</span>
        :
        <span>55</span>
    </p>
</div>

<a style="margin: 10px" id="ii-test">тест</a>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>