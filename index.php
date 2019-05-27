<? require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("");
use Bitrix\Main\Page\Asset;
$uri = preg_replace('/[a-zA-Z]*\.php/','',$_SERVER['PHP_SELF']);

?>
<div>
<?$APPLICATION->IncludeComponent(
	"lgcity.promotion:promotion.banner",
	"",
	Array(
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A"
	)
);?>
</div>
<? require ($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>