<?php
/**
 * Created by PhpStorm.
 * User: wei gao
 * Email:1225039937@qq.com
 * Date: 2018/3/12
 * Time: 16:19
 */

class seller_centerControl extends mobileSellerControl
{
    public function __construct()
    {
        parent::__construct();
    }

    public function indexOp(){
        output_data($this->seller_info);
    }

}