<?php defined('In33hao') or exit('Access Invalid!'); return array (
  'system' => 
  array (
    'name' => '平台',
    'child' => 
    array (
      0 => 
      array (
        'name' => '设置',
        'child' => 
        array (
          'upload' => '上传设置',
          'message' => '邮件设置',
          'admin' => '权限设置',
          'admin_log' => '操作日志',
          'area' => '地区设置',
          'cache' => '清理缓存',
        ),
      ),
      1 => 
      array (
        'name' => '会员',
        'child' => 
        array (
          'member' => '会员管理',
        ),
      ),
      2 => 
      array (
        'name' => '网站',
        'child' => 
        array (
          'article_class' => '文章分类',
          'article' => '文章管理',
          'document' => '会员协议',
          'navigation' => '页面导航',
          'adv' => '广告管理',
          'rec_position' => '推荐位',
        ),
      ),
      3 => 
      array (
        'name' => '应用',
        'child' => 
        array (
          'hao' => '基本设置',
          'link' => '友情连接',
          'goods' => '商品评价',
          'db' => '数据库管理',
        ),
      ),
    ),
  ),
  'shop' => 
  array (
    'name' => '商城',
    'child' => 
    array (
      0 => 
      array (
        'name' => '设置',
        'child' => 
        array (
          'setting' => '商城设置',
          'upload' => '图片设置',
          'search' => '搜索设置',
          'seo' => 'SEO设置',
          'message' => '消息通知',
          'payment' => '支付方式',
          'express' => '快递公司',
          'waybill' => '运单模板',
          'web_config' => '首页管理',
          'web_channel' => '频道管理',
        ),
      ),
      1 => 
      array (
        'name' => '商品',
        'child' => 
        array (
          'goods' => '商品管理',
          'goods_class' => '分类管理',
          'brand' => '品牌管理',
          'type' => '类型管理',
          'spec' => '规格管理',
          'goods_album' => '图片空间',
          'goods_recommend' => '商品推荐',
        ),
      ),
      2 => 
      array (
        'name' => '店铺',
        'child' => 
        array (
          'store' => '商家管理',
          'store_class' => '商家分类',
          'help_store' => '商家帮助',
          'store_joinin' => '商家入驻',
          'ownshop' => '自营店铺',
        ),
      ),
      3 => 
      array (
        'name' => '会员',
        'child' => 
        array (
          'member' => '会员管理',
          'points' => '积分管理',
        ),
      ),
      4 => 
      array (
        'name' => '交易',
        'child' => 
        array (
          'order' => '商品订单',
          'refund' => '退款管理',
          'return' => '退货管理',
          'consulting' => '咨询管理',
          'inform' => '举报管理',
          'evaluate' => '评价管理',
          'complain' => '投诉管理',
        ),
      ),
      5 => 
      array (
        'name' => '运营',
        'child' => 
        array (
          'operating' => '运营设置',
          'bill' => '结算管理',
          'bigbrand' => '大品牌管理',
          'mall_consult' => '平台客服',
          'delivery' => '物流自提服务站',
          'contract' => '消费者保障服务',
        ),
      ),
      6 => 
      array (
        'name' => '促销',
        'child' => 
        array (
          'bargain' => '砍价',
          'groupbuy' => '拼团',
          'foretaste' => '试吃',
          'foreuse' => '试用',
        ),
      ),
      7 => 
      array (
        'name' => '统计',
        'child' => 
        array (
          'stat_general' => '概述及设置',
          'stat_industry' => '行业分析',
          'stat_member' => '会员统计',
          'stat_store' => '店铺统计',
          'stat_trade' => '销量分析',
          'stat_goods' => '商品分析',
          'stat_marketing' => '营销分析',
          'stat_aftersale' => '售后分析',
        ),
      ),
    ),
  ),
);