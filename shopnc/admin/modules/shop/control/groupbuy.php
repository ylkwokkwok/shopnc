<?php
/**
 * 拼团管理
 *
 *
 *
 *
 * @好商城提供技术支持 授权请购买shopnc授权
 * @license    http://www.33hao.com
 * @link       交流群号：138182377 
 */



defined('In33hao') or exit('Access Invalid!');
class groupbuyControl extends SystemControl{

    public function __construct()
    {
        parent::__construct();
        Language::read('groupbuy');

    }
    public function indexOp(){
        Tpl::setDirquna('shop');
        Tpl::showpage('groupbuy.index');
    }
}
