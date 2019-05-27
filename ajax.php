<?php
/**
 * Created by PhpStorm.
 * User: Ivan.Yakovlev
 * Date: 22.05.2019
 * Time: 10:36
 */

define("NO_KEEP_STATISTIC", "Y");
define("NO_AGENT_STATISTIC", "Y");
define("NOT_CHECK_PERMISSIONS", true);
use Bitrix\Main\Application,
    Bitrix\Main\Web\Cookie,
    Bitrix\Main\Loader;

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

if(isset($_POST['type']))
{
    Bitrix\Sale\DiscountCouponsManager::init();
    $application = Application::getInstance();
    $context = $application->getContext();
    switch($_POST['type'])
    {
        case 'addDiscount':
            if(isset($_COOKIE['BITRIX_SM_discount_added'])&& $_COOKIE['BITRIX_SM_discount_added'])
            {
                echo json_encode(['status' => 'error','error_text' => 'discount already active']);
                die();
            }
            Loader::includeModule("sale");
            Bitrix\Sale\DiscountCouponsManager::add('SL-QP8KU-COQSJ29');
            Bitrix\Sale\DiscountCouponsManager::add('SL-YSNL0-982VY4J');
            $cookie = new Cookie('discount_added',true,time()+60*60*24*2);
            $cookie->setDomain($context->getServer()->getHttpHost());
            $cookie->setHttpOnly(false);
            $context->getResponse()->addCookie($cookie);
            $context->getResponse()->flush("");
            $cookie = new Cookie('discount_timestamp',time(),time()+60*60*24*2);
            $cookie->setDomain($context->getServer()->getHttpHost());
            $cookie->setHttpOnly(false);
            $context->getResponse()->addCookie($cookie);
            $context->getResponse()->flush("");
            echo json_encode(['status'=>'added']);
            break;
        case 'show_time':
                if(isset($_COOKIE['BITRIX_SM_discount_added'])&& $_COOKIE['BITRIX_SM_discount_added'])
                {
                    if(($_COOKIE['BITRIX_SM_discount_timestamp']+20*60)>time())
                    {
                        $remain = ($_COOKIE['BITRIX_SM_discount_timestamp']+20*60)-time();
                        echo json_encode(['status' => 'active','remain' => $remain]);
                    }
                    else
                    {
                        \Bitrix\Sale\DiscountCouponsManager::delete('SL-QP8KU-COQSJ29');
                        \Bitrix\Sale\DiscountCouponsManager::delete('SL-YSNL0-982VY4J');
                        $cookie = new Cookie('discount_added',false,time()+60*60*24*2);
                        $cookie->setDomain($context->getServer()->getHttpHost());
                        $cookie->setHttpOnly(false);
                        $context->getResponse()->addCookie($cookie);
                        $context->getResponse()->flush("");
                        echo json_encode(['status' => 'inactive']);
                    }
                }
                else
                {
                    echo json_encode(['status' => 'inactive1']);
                }
                break;
    }
}