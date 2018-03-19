<?php
/**
 * 商品分类
 *
 * @好商城 (c) 2015-2018 33HAO Inc. (http://www.33hao.com)
 * @license    http://www.33 hao.c om
 * @link       交流群号：138182377
 * @since      好商城提供技术支持 授权请购买shopnc授权
 */



defined('In33hao') or exit('Access Invalid!');
class goods_classControl extends mobileHomeControl{

    public function __construct() {
        parent::__construct();
    }

    public function indexOp() {
        if(!empty($_GET['gc_id']) && intval($_GET['gc_id']) > 0) {
            $date = $this->_get_class_list($_GET['gc_id']);
            output_data($date);
        } else {
            $this->_get_root_class();
        }
    }
	

    /**
     * 返回一级分类列表
     */
    private function _get_root_class() {
        $model_goods_class = Model('goods_class');
        $model_mb_category = Model('mb_category');

        $goods_class_array = Model('goods_class')->getGoodsClassForCacheModel();

        $class_list = $model_goods_class->getGoodsClassListByParentId(0);
        $mb_categroy = $model_mb_category->getLinkList(array());
        $mb_categroy = array_under_reset($mb_categroy, 'gc_id');
        foreach ($class_list as $key => $value) {
            if(!empty($mb_categroy[$value['gc_id']])) {
                $class_list[$key]['image'] = UPLOAD_SITE_URL.DS.ATTACH_MOBILE.DS.'category'.DS.$mb_categroy[$value['gc_id']]['gc_thumb'];
            } else {
                $class_list[$key]['image'] = '';
            }

            $class_list[$key]['text'] = '';
            $child_class_string = $goods_class_array[$value['gc_id']]['child'];
            $child_class_array = explode(',', $child_class_string);
            foreach ($child_class_array as $child_class) {
                $class_list[$key]['text'] .= $goods_class_array[$child_class]['gc_name'] . '/';
            }
            $class_list[$key]['text'] = rtrim($class_list[$key]['text'], '/');
        }

        output_data(array('class_list' => $class_list));
    }

    /**
     * 根据分类编号返回下级分类列表
     */
    private function _get_class_list($gc_id) {
        $goods_class_array = Model('goods_class')->getGoodsClassForCacheModel();

        $goods_class = $goods_class_array[$gc_id];

        if(empty($goods_class['child'])) {
            //无下级分类返回0
            return array('class_list' => array());
        } else {
            //返回下级分类列表
            $class_list = array();
            $child_class_string = $goods_class_array[$gc_id]['child'];
            $child_class_array = explode(',', $child_class_string);
            foreach ($child_class_array as $child_class) {
                $class_item = array();
                $class_item['gc_id'] .= $goods_class_array[$child_class]['gc_id'];
                $class_item['gc_name'] .= $goods_class_array[$child_class]['gc_name'];
                $class_list[] = $class_item;
            }
            return array('class_list' => $class_list);
        }
    }
    
    /**
     * 获取全部子集分类
     */
    public function get_child_allOp() {
        $gc_id = intval($_GET['gc_id']);
        $data = array();
        if ($gc_id > 0) {
            $data = $this->_get_class_list($gc_id);
            if (!empty($data['class_list'])) {
                foreach ($data['class_list'] as $key => $val) {
                     $d = $this->_get_class_list($val['gc_id']);
                     $data['class_list'][$key]['child'] = $d['class_list'];
                }
            }
        }
        output_data($data);
    }

    //小程序获取商品分类
    public function getGoodsClassOp(){
        $gc_model   = Model('goods_class');
        $gc_list   = $gc_model->getGoodsClassListByParentId(0);
        foreach ($gc_list as &$gc){
            $sons = $gc_model->getGoodsClassListByParentId($gc['gc_id']);
            foreach ($sons as &$gc_1){
                $sons_1 = $gc_model->getGoodsClassListByParentId($gc_1['gc_id']);
                $gc_1['children'] = $sons_1;
            }
            $gc['children'] = $sons;
        }
        output_data($gc_list);
    }
}
