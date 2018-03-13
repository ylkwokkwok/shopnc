<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/3/12
 * Time: 15:01
 */
defined('In33hao') or exit('Access Invalid!');
class bargainControl extends SystemControl
{
    public function __construct() {
        parent::__construct ();
        Language::read('bargain');
    }
    public function indexOp(){
        Tpl::setDirquna('shop');
        Tpl::showpage('bargain.index');
    }
}