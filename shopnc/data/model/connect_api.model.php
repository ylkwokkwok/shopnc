<?php
/**
 * 商品管理
 *
 *
 *
 *
 * @好商城提供技术支持 授权请购买shopnc授权
 * @license    http://www.33hao.com
 * @link       交流群号：138182377
 */



defined('In33hao') or exit('Access Invalid!');

class connect_api extends Model{
   public function sendCaptcha($phone){
       $sms = new Sms();
       $result = $sms->send($phone);
       if($result){
           $a=array(123);
           return $a;
       }else{
           $b=array(456);
           return $b;
       }
   }
}
