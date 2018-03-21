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
    //获取店铺信息
    public function indexOp(){
        output_data($this->seller_info);
    }
    //获取店铺详细信息
    public function getShopInfoOp(){
      $store_id=$this->seller_info['store_id'];
//        //$store_id = (int) $_REQUEST['store_id'];
//        if ($store_id <= 0) {
//            output_error('参数错误');
//        }
//        $store_online_info = Model('store')->getStoreOnlineInfoByID($store_id);
//        if (empty($store_online_info)) {
//            output_error('店铺不存在或未开启');
//        }
//
//        $store_info = array();
//        $store_info['store_id'] = $store_online_info['store_id'];
//        $store_info['store_name'] = $store_online_info['store_name'];
//        $store_info['member_id'] = $store_online_info['member_id'];
//        //33hao v5.2 添加QQ IM
//        $store_info['store_qq'] = $store_online_info['store_qq'];
//        $store_info['node_chat'] = C('node_chat');
//
//        // 店铺头像
//        $store_info['store_avatar'] = $store_online_info['store_avatar']
//            ? UPLOAD_SITE_URL.'/'.ATTACH_STORE.'/'.$store_online_info['store_avatar']
//            : UPLOAD_SITE_URL.'/'.ATTACH_COMMON.DS.C('default_store_avatar');
//
//        // 商品数
//        $store_info['goods_count'] = (int) $store_online_info['goods_count'];
//
//        // 店铺被收藏次数
//        $store_info['store_collect'] = (int) $store_online_info['store_collect'];
//
//        // 如果已登录 判断该店铺是否已被收藏
//        if ($memberId = $this->getMemberIdIfExists()) {
//            $c = (int) Model('favorites')->getStoreFavoritesCountByStoreId($store_id, $memberId);
//            $store_info['is_favorate'] = $c > 0;
//        } else {
//            $store_info['is_favorate'] = false;
//        }
//
//        // 是否官方店铺
//        $store_info['is_own_shop'] = (bool) $store_online_info['is_own_shop'];
//
//        // 动态评分
//        if ($store_info['is_own_shop']) {
//            $store_info['store_credit_text'] = '官方店铺';
//        } else {
//            $store_info['store_credit_text'] = sprintf(
//                '描述: %0.1f, 服务: %0.1f, 物流: %0.1f',
//                $store_online_info['store_credit']['store_desccredit']['credit'],
//                $store_online_info['store_credit']['store_servicecredit']['credit'],
//                $store_online_info['store_credit']['store_deliverycredit']['credit']
//            );
//        }
//
//        // 页头背景图
//        $store_info['mb_title_img'] = $store_online_info['mb_title_img']
//            ? UPLOAD_SITE_URL.'/'.ATTACH_STORE.'/'.$store_online_info['mb_title_img']
//            : '';
//
//        // 轮播
//        $store_info['mb_sliders'] = array();
//        $mbSliders = @unserialize($store_online_info['mb_sliders']);
//        if ($mbSliders) {
//            foreach ((array) $mbSliders as $s) {
//                if ($s['img']) {
//                    $s['imgUrl'] = UPLOAD_SITE_URL.DS.ATTACH_STORE.DS.$s['img'];
//                    $store_info['mb_sliders'][] = $s;
//                }
//            }
//        }
//
//        //店主推荐
//        $where = array();
//        $where['store_id'] = $store_id;
//        $where['goods_commend'] = 1;
//        $where['is_book'] = 0;// 默认不显示预订商品
//        $model_goods = Model('goods');
//        $goods_fields = $this->getGoodsFields();
//        $goods_list = $model_goods->getGoodsListByColorDistinct($where, $goods_fields, 'goods_id desc', 0, 20);
//        $goods_list = $this->_goods_list_extend($goods_list);
        output_data(/*array(
            'store_info' => $store_info,
            'rec_goods_list_count' => count($goods_list),
            'rec_goods_list' => $goods_list,
        )*/$store_id);
    }
}