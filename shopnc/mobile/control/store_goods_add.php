<?php
/**
 * Created by PhpStorm.
 * User: wei gao
 * Email:1225039937@qq.com
 * Date: 2018/3/13
 * Time: 11:03
 */

class store_goods_addControl extends mobileSellerControl
{
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * 保存商品（商品发布第二步使用）
     */
    public function save_goodsOp() {
        $logic_goods = Logic('goods');
        $result =  $logic_goods->saveGoods(
            $_POST,
            $this->store_info['store_id'],
            $this->store_info['store_name'],
            $this->store_info['store_state'],
            $this->seller_info['seller_id'],
            $this->seller_info['seller_name'],
            (bool) $this->store_info['bind_all_gc']
        );

        if(!$result['state']) {
            output_error($result['msg']);
        }
        $common_id = $result['data'];
        // 保存图片
        $insert_array = array();
        $model_goods = Model('goods');
        $image_list = explode(',', $_POST['imageList']);
        foreach ($image_list as $key => $value) {
            // 商品默认主图
            $update_array = array();        // 更新商品主图
            $update_where = array();
            $update_array['goods_image']    = $value;
            $update_where['goods_commonid'] = $common_id;
            $update_where['color_id']       = 0;
            if ($key == 0) {
                $update_array['goods_image']    = $value;
                $update_where['goods_commonid'] = $common_id;
                $update_where['color_id']       = $key;
                // 更新商品主图
                $model_goods->editGoods($update_array, $update_where);
            }
            $tmp_insert = array();
            $tmp_insert['goods_commonid']   = $common_id;
            $tmp_insert['store_id']         = $this->store_info['store_id'];
            $tmp_insert['color_id']         = 0;
            $tmp_insert['goods_image']      = $value;
            $tmp_insert['goods_image_sort'] = 0;
            $tmp_insert['is_default']       = $key == 0 ? 1 : 0;
            $insert_array[] = $tmp_insert;
        }
        $rs = $model_goods->addGoodsImagesAll($insert_array);
        output_data($result);
    }
    /**
     * ajax 上传商品主图
     */
    public function image_uploadOp() {
        $logic_goods = Logic('goods');
        $result =  $logic_goods->uploadGoodsImage(
            $_POST['name'],
            $this->seller_info['store_id'],
            $this->store_grade['sg_album_limit']
        );

        if(!$result['state']) {
            output_error($result['msg']);
        }
        output_data($result['data']);
    }

    /**
     * ajax获取商品分类的子级数据
     */
    public function ajax_goods_classOp() {
        $gc_id = intval($_GET['gc_id']);
        $deep = intval($_GET['deep']);
        if ($gc_id < 0 || $deep <= 0 || $deep >= 4) {
            output_error("非法请求");
        }
        $model_goodsclass = Model('goods_class');
        $list = $model_goodsclass->getGoodsClass($this->seller_info['store_id'], $gc_id, $deep,$this->seller_group_info['seller_group_id'],$this->seller_group_info['seller_gc_limits']);
        if (empty($list)) {
            output_error("您还没有设置商品分类");
        }
        /**
         * 转码
         */
        if (strtoupper ( CHARSET ) == 'GBK') {
            $list = Language::getUTF8 ( $list );
        }
        output_data($list);
    }
}