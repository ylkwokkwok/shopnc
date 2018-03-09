<?php
/**
 * 前台登录 退出操作
 *
 *
 * @好商城 (c) 2015-2018 33HAO Inc. (http://www.33hao.com)
 * @license    http://www.33 hao.c om
 * @link       交流群号：138182377
 * @since      好商城提供技术支持 授权请购买shopnc授权
 */



defined('In33hao') or exit('Access Invalid!');

class loginControl extends mobileHomeControl {

    public function __construct(){
        parent::__construct();
    }

    /**
     * 登录
     */
    public function indexOp(){
        if(empty($_POST['username']) || empty($_POST['password']) || !in_array($_POST['client'], $this->client_type_array)) {
            output_error('登录失败');
        }

        $model_member = Model('member');

        $login_info = array();
        $login_info['user_name'] = $_POST['username'];
        $login_info['password'] = $_POST['password'];
        $member_info = $model_member->login($login_info);
        if(isset($member_info['error'])) {
            output_error($member_info['error']);
        } else {
            $token = $this->_get_token($member_info['member_id'], $member_info['member_name'], $_POST['client']);
            if($token) {
                output_data(array('username' => $member_info['member_name'], 'userid' => $member_info['member_id'], 'key' => $token));
            } else {
                output_error('登录失败');
            }
        }
    }

    /**
     * 登录生成token
     */
    private function _get_token($member_id, $member_name, $client) {
        $model_mb_user_token = Model('mb_user_token');

        //重新登录后以前的令牌失效
        //暂时停用
        //$condition = array();
        //$condition['member_id'] = $member_id;
        //$condition['client_type'] = $client;
        //$model_mb_user_token->delMbUserToken($condition);

        //生成新的token
        $mb_user_token_info = array();
        $token = md5($member_name . strval(TIMESTAMP) . strval(rand(0,999999)));
        $mb_user_token_info['member_id'] = $member_id;
        $mb_user_token_info['member_name'] = $member_name;
        $mb_user_token_info['token'] = $token;
        $mb_user_token_info['login_time'] = TIMESTAMP;
        $mb_user_token_info['client_type'] = $client;

        $result = $model_mb_user_token->addMbUserToken($mb_user_token_info);

        if($result) {
            return $token;
        } else {
            return null;
        }

    }

    /**
     * 注册
     */
    public function registerOp(){
		 if (process::islock('reg')){
			output_error('您的操作过于频繁，请稍后再试');
		} 
        $model_member   = Model('member');

        $register_info = array();
        $register_info['username'] = $_POST['username'];
        $register_info['password'] = $_POST['password'];
        $register_info['password_confirm'] = $_POST['password_confirm'];
        $register_info['email'] = $_POST['email'];
		//添加奖励积分 v5.1.1
		$register_info['inviter_id'] = intval(base64_decode($_COOKIE['uid']))/1;
        $member_info = $model_member->register($register_info);
        if(!isset($member_info['error'])) {
	   process::addprocess('reg');
            $token = $this->_get_token($member_info['member_id'], $member_info['member_name'], $_POST['client']);
            if($token) {
                output_data(array('username' => $member_info['member_name'], 'userid' => $member_info['member_id'], 'key' => $token));
            } else {
                output_error('注册失败');
            }
        } else {
            output_error($member_info['error']);
        }

    }

    /**
     * 小程序登录
     */
    public function xcx_loginOp()
    {
        if(empty($_POST['code'])) {
            output_error('登录失败');
        }
        $weixin_info = $this->weixin_login(trim($_POST['code']));
        if (!$weixin_info) {
            output_error('登录失败');
        }
        $member_model = Model('member');
        $member_info = $member_model->getMemberInfo(array(
            "weixin_xcx_openid" => $weixin_info['openid']
        ));
        if ($member_info){
            // login
            $token = $this->_get_token($member_info['member_id'], $member_info['member_name'], 'xcx');
            if($token) {
                output_data(array('username' => $member_info['member_name'], 'userid' => $member_info['member_id'], 'key' => $token));
            } else {
                output_error('登录失败');
            }
        }else{
            //auto register
            $register_info = array();
            // todo 账号，密码生成规则
            $register_info['username'] = rand(10000000, 99999999);
            $register_info['password'] = 111111;
            $register_info['password_confirm'] = 111111;
            $register_info['email'] = $register_info['username'].'@shop.com';
            $register_info['weixin_xcx_openid'] = $weixin_info['openid'];
            //添加奖励积分 v5.1.1
            $register_info['inviter_id'] = intval(base64_decode($_COOKIE['uid']))/1;
            $member_info = $member_model->register($register_info);
            if(!isset($member_info['error'])) {
                process::addprocess('reg');
                $token = $this->_get_token($member_info['member_id'], $member_info['member_name'], 'xcx');
                if($token) {
                    output_data(array('username' => $member_info['member_name'], 'userid' => $member_info['member_id'], 'key' => $token));
                } else {
                    output_error('注册失败');
                }
            } else {
                output_error($member_info['error']);
            }
        }
    }

    protected function weixin_login($code)
    {
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid=".C('xcx_appid')."&secret=".C('xcx_appsecret')."&js_code=".$code."&grant_type=authorization_code";
        $weixin =  file_get_contents($url);//通过code换取网页授权access_token
        $jsondecode = json_decode($weixin); //对JSON格式的字符串进行编码
        $array = get_object_vars($jsondecode);//转换成数组
        if (isset($array['errcode'])){
            return false;
        }
        return $array;
    }
}
