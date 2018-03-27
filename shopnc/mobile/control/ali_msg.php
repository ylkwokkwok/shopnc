<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/1/20
 * Time: 9:07
 */
defined('In33hao') or exit('Access Invalid!');
require_once ('../api/aliyun-dysms-php-sdk/api_demo/SmsDemo.php');

class ali_msgControl extends mobileHomeControl{
    public function __construct() {
        parent::__construct();
    }
    public function send_codeOp(){
        $tel=$_POST['tel'];
        SmsDemo::sendSms($tel);//发送短信验证码
       output_data(array('code'=>123));
    }
}
