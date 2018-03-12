<?php
/**
 * 商家入住
 *
 * * @好商城 (c) 2015-2018 33HAO Inc. (http://www.33hao.com)
 * @license    http://www.33 hao.c om
 * @link       交流群号：138182377
 * @since      好商城提供技术支持 授权请购买shopnc授权
 */
defined('In33hao') or exit('Access Invalid!');

class store_joinincControl extends mobileMemberControl {

    private $joinin_detail = NULL;

    public function __construct() {
        parent::__construct();
    }
    public function applyOp() {
        //读取卖家信息
        $seller_info = Model('seller')->getSellerInfo(array('member_id'=>$this->member_info['member_id']));
        if (!empty($seller_info)){
            output_error('店铺已开通');
        }
        $param = array();
        $store_class_ids = array();
        $store_class_names = array();
        // test
        $_POST['store_class'] = 1;
        $_POST['store_class_ids'] = array(1,5,35);
        $_POST['store_class_names'] = array("服饰鞋帽", "男装", "衬衫");

        if(!empty($_POST['store_class_ids'])) {
            foreach ($_POST['store_class_ids'] as $value) {
                $store_class_ids[] = $value;
            }
        }
        if(!empty($_POST['store_class_names'])) {
            foreach ($_POST['store_class_names'] as $value) {
                $store_class_names[] = $value;
            }
        }
        //取最小级分类最新分佣比例
        $sc_ids = array();
        foreach ($store_class_ids as $v) {
            $v = explode(',',trim($v,','));
            if (!empty($v) && is_array($v)) {
                $sc_ids[] = end($v);
            }
        }
        if (!empty($sc_ids)) {
            $store_class_commis_rates = array();
            $goods_class_list = Model('goods_class')->getGoodsClassListByIds($sc_ids);
            if (!empty($goods_class_list) && is_array($goods_class_list)) {
                $sc_ids = array();
                foreach ($goods_class_list as $v) {
                    $store_class_commis_rates[] = $v['commis_rate'];
                }
            }
        }
        //取最新店铺分类信息
        $store_class_info = Model('store_class')->getStoreClassInfo(array('sc_id'=>intval($_POST['sc_id'])));
        if ($store_class_info) {
            $param['sc_id'] = $store_class_info['sc_id'];
            $param['sc_name'] = $store_class_info['sc_name'];
            $param['sc_bail'] = $store_class_info['sc_bail'];
        }
        $param['member_name'] = $this->member_info['member_name'];
        $param['company_name'] = $_POST['store_name'];
        $param['seller_name'] = $this->member_info['member_name'];
        $param['store_name'] = $_POST['store_name'];
        $param['contacts_name'] = $_POST['contacts_name'];
        $param['contacts_phone'] = $_POST['contacts_phone'];
        $param['contacts_email'] = $_POST['contacts_email'];
        $param['business_licence_number'] = $_POST['contacts_idcard'];
        $param['store_class_ids'] = serialize($store_class_ids);
        $param['store_class_names'] = serialize($store_class_names);
        $param['joinin_year'] = 1;
        $param['joinin_state'] = STORE_JOIN_STATE_NEW;
        $param['remark'] = $_POST['remark'];
//        $param['store_class_commis_rates'] = implode(',', $store_class_commis_rates);
        //店铺应付款
        $param['paying_amount'] = 0.00;

        $param['joinin_state'] = STORE_JOIN_STATE_PAY;
        // todo test data
        $param['company_address'] = "北京 北京市 东城区";
        $param['company_address_detail'] = 1;
        $param['business_sphere'] = 1;
        $param['business_licence_number_elc'] = 1;
        $param['organization_code_electronic'] = 1;
        $param['general_taxpayer'] = 1;
        $param['settlement_bank_account_name'] = 1;
        $param['settlement_bank_account_number'] = 1;
        $param['sg_name'] = "钻石店铺";
        $param['sg_id'] = 3;
        $param['sg_info'] = 'a:1:{s:8:"sg_price";s:7:"1000.00";}';
        $param['store_class_commis_rates'] = 0;
        $param['paying_money_certificate'] = 1;
        $param['paying_amount'] = 2000;


        $obj_validate = new Validate();
        $obj_validate->validateparam = array(
            array("input"=>$param['store_name'], "require"=>"true","validator"=>"Length","min"=>"1","max"=>"50","message"=>"店铺名称不能为空且必须小于50个字"),
            array("input"=>$param['contacts_name'], "require"=>"true","validator"=>"Length","min"=>"1","max"=>"20","message"=>"联系人姓名不能为空且必须小于20个字"),
            array("input"=>$param['contacts_phone'], "require"=>"true","validator"=>"phone","message"=>"请正确填写联系电话"),
            array("input"=>$param['contacts_email'], "require"=>"true","validator"=>"email","message"=>"请正确填写电子邮箱"),
            array("input"=>$param['business_licence_number'], "require"=>"true","validator"=>"Length","min"=>"1","max"=>"20","message"=>"身份证号不能为空且必须小于20个字"),
        );
        $error = $obj_validate->validate();
        if ($error != ''){
            output_error($error);
        }

        $model_store_joinin = Model('store_joinin');
        $joinin_info = $model_store_joinin->getOne(array('member_id' => $this->member_info['member_id']));
        if(empty($joinin_info)) {
            $param['member_id'] = $this->member_info['member_id'];
            $model_store_joinin->save($param);
        } else {
            $model_store_joinin->modify($param, array('member_id'=>$this->member_info['member_id']));
        }
        output_data(array());
    }

    public function get_store_classOp(){
        //店铺分类
        $model_store = Model('store_class');
        $store_class = $model_store->getStoreClassList(array(),'',false);
        $model_store_joinin = Model('store_joinin');
        $joinin_detail = $model_store_joinin->getOne(array('member_id'=>$this->member_info['member_id']));
        $apply_status = 0;
        if ($joinin_detail['joinin_state'] == STORE_JOIN_STATE_PAY){
            $apply_status = 1;
        }
        output_data(array(
            "store_class" => $store_class,
            "apply_status" => $apply_status,
            "store_name" => $joinin_detail['store_name'],
            "contacts_name" => $joinin_detail['contacts_name'],
            "contacts_phone" => $joinin_detail['contacts_phone'],
            "contacts_email" => $joinin_detail['contacts_email'],
            "contacts_idcard" => $joinin_detail['business_licence_number'],
            "remark" => $joinin_detail['remark'],
            "sc_id" => $joinin_detail['sc_id']
        ));
    }

    public function get_class_listOp(){
        $gc	= Model('goods_class');
        $gc_list	= $gc->getGoodsClassListByParentId(0);
        output_data($gc_list);
    }

    public function ajax_upload_imageOp() {

        $pic_name = '';
        $upload = new UploadFile();
        $file = current($_FILES);
        $uploaddir = ATTACH_PATH.DS.'store_joinin'.DS;
        $upload->set('max_size',C('image_max_filesize'));
        $upload->set('default_dir',$uploaddir);
        $upload->set('allow_type',array('jpg','jpeg','gif','png'));
        if (!empty($file['tmp_name'])){
            $result = $upload->upfile(key($_FILES));
            if ($result){
                echo json_encode(array('state'=>true,'pic_name'=>$upload->file_name,'pic_url'=>UPLOAD_SITE_URL.DS.ATTACH_PATH.DS.'store_joinin'.DS.$upload->file_name));
            } else {
                echo json_encode(array('state'=>false,'message'=>$upload->error));
            }
        }
    }
	protected function checkStoreNameExit($store_name) {
		$model_store	= Model('store');
		$store_info = $model_store->getStoreInfo(array('store_name'=>$store_name));
		if(!empty($store_info['store_name']) && $store_info['member_id'] != $this->member_info['member_id']) {
			return true;
		} else {
		    return false;
		}
	}
    protected function checkSellerNameExist($seller_name) {
        $condition = array();
        $condition['seller_name'] = $seller_name;

        $model_seller = Model('seller');
        $result = $model_seller->isSellerExist($condition);
        if (!$result) {
            $result = Model('store_joininc')->isExist($condition);
        }

        if($result) {
            return true;
        } else {
            return false;
        }
    }
}
