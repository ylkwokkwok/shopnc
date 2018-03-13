<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/3/12
 * Time: 14:24
 */
defined('In33hao') or exit('Access Invalid!');
class bigbrandControl extends SystemControl
{
    public function __construct() {
        parent::__construct ();
        Language::read('bigbrand');
    }
    public function indexOp(){
        Tpl::setDirquna('shop');
        Tpl::showpage('bigbrand.index');
    }
}