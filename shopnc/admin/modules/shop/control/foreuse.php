<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/3/12
 * Time: 15:35
 */
defined('In33hao') or exit('Access Invalid!');
class foreuseControl extends SystemControl
{
    public function __construct() {
        parent::__construct ();
        Language::read('foreuse');
    }
    public function indexOp(){
        Tpl::setDirquna('shop');
        Tpl::showpage('foreuse.index');
    }
}