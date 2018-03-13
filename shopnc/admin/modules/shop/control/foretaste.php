<?php
/**
 * Created by PhpStorm.
 * User: huxiesen
 * Date: 2018/3/12
 * Time: 15:11
 */
defined('In33hao') or exit('Access Invalid!');
class foretasteControl extends SystemControl
{
    public function __construct() {
        parent::__construct ();
        Language::read('foretaste');
    }
    public function indexOp(){
        Tpl::setDirquna('shop');
        Tpl::showpage('foretaste.index');
    }
}