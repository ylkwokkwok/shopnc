<?php
defined('In33hao') or exit('Access Invalid!');

class connectApi extends Model{
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
