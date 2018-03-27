<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/1/20
 * Time: 9:07
 */
//defined('In33hao') or exit('Access Invalid!');
require_once ('./aliyun-dysms-php-sdk/api_demo/SmsDemo.php');

class ali_msgControl extends mobileHomeControl{
    public function __construct() {
        parent::__construct();
    }
    public function send_codeOp(){
        //file_put_contents('./1.log',123);
        //$tel=$_POST['tel'];
        SmsDemo::sendSms(13088209127);//发送短信验证码
       output_data(1);
    }
}
