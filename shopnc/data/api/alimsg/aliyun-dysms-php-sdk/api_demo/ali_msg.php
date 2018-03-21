<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/1/20
 * Time: 9:07
 */
    require_once ('./SmsDemo.php');
    $tel=13088209127;
class SendMsg extends mobileHomeControl{
    public static function sendCode($tel){
         SmsDemo::sendSms($tel);//发送短信验证码
        output_data(123);
    }
}
 $result=SendMsg::sendCode($tel);
?>