<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/1/20
 * Time: 9:07
 */
    require_once ('./SmsDemo.php');

    $tel=13088209127;

    $response = SmsDemo::sendSms($tel);//发送短信验证码


    exit;

?>