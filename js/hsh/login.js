var Login={
	keyLogin : function(){
		if (event.keyCode==13){//回车键的键值为13
			Login.account();
		}
	},
	account : function(){
		if(Login.checkAccount()){
			var ajax={
				url : '/accountLogin/',
				data:{
					'user_name' : $('#user_name').val().trim().toUpperCase(),
					'user_pass' : $('#user_pass').val().trim()
				},
				success : function(json){
					console.info("ok");
					if(json['result'] == 'SUCCESS'){
						location.href = '/hsh_backstage/main/';
					}else if(json['result'] == 'USER_ERROR'){
						layer.msg('账号与密码不匹配,请重新输入.')
					}
					
				}
			}
			_ajax(ajax);
		}
	},
	checkAccount : function(){
		if($('#user_name').val().trim() == ''){
			layer.msg('请输入账号.');
			return false;
		}
		if($('#user_pass').val().trim() == ''){
			layer.msg('请输入密码.');
			return false;
		}
		return true;
	}
}