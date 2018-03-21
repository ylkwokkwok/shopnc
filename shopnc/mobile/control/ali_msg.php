<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/1/20
 * Time: 9:07
 */
    require_once ('../api/aliyun-dysms-php-sdk/api_demo/SmsDemo.php');

class ali_msgControl extends mobileHomeControl{
    public  function sendCodeOp(){
        SmsDemo::sendSms(13088209127);//发送短信验证码
        output_data(123);
    }
}
?>