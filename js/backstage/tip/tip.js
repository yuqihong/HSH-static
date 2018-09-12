var Tip={
	
		submit : function(){
			var tip_detail = $('#tip_detail').val();//完整产品名称
			var their_product = $('#their_product').val();//获取产品名称
			if(Tip.checkText(tip_detail)){
				Tip.saveTip(tip_detail, their_product);
			}
		},
		
		checkText : function(Tip_detail){
			if(checkStr(Tip_detail, '请输入Tip Detail')){
				return true;
			}
			return false;
		},
		
		saveTip : function(tip_detail, their_product){
			
			var ajax={
				url : '/hsh_backstage/saveTip/',
				type: 'POST',
				data:{
					"data" : JSON.stringify({
						'tip_detail' : tip_detail,
						'their_product' : their_product
					})
				},
				success : function(json){
					if(json.state=='ok'){
						layer.msg('保存成功!');
						setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
		    				window.location.reload();//页面刷新
		    			},1000);
					}else{
						layer.msg('保存失败!');
					}
				}
			}
			_ajax(ajax);
		},
		//查询模块		
		getTip : function(page){
			var search_text = $('#search_text').val().trim();
			var ajax={
				url : '/hsh_backstage/getTipList/',
				data : {
					'search_text' : "%"+search_text+"%",
					'page' : page
				},
				success : function(json){
					Tip.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		//分页，第一步
		getTipList : function(page){
			var ajax={
				url : '/hsh_backstage/getTipList/',
				data : {
					'page' : page
				},
				success : function(json){
					Tip.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		
		openAdd : function(){
			Tip.getTheirProductList();
			open_add();//显示div层
		},
		getTheirProductList : function(){
			var ajax={
					url : '/hsh_backstage/getTheirProductTip/',
					success : function(json){
						html = "<option value=\"\">--不选择--</option>";
						for(var i=0; i < json.length ; i++){
							html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
						}
						$('#their_product').html(html);
						$('#update_their_product').html(html);
					}
				}
				_ajax(ajax);
		},
		getTheirProductList2 : function(tip_id){
			var ajax={
					url : '/hsh_backstage/getTheirProductTip/',
					success : function(json){
						html = "<option value=\"\">--不选择--</option>";
						for(var i=0; i < json.length ; i++){
							html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
						}
						$('#their_product').html(html);
						$('#update_their_product').html(html);
						Tip.getUpdateTip(tip_id);
					}
				}
				_ajax(ajax);
		},
		getUpdateTip : function(tip_id){
			var ajax={
					url : '/hsh_backstage/getUpdateTip/',
					data : {
						'tip_id' : tip_id
					},
					success : function(json){
						console.info(json);
						$('#update_tip_id').val(json[0].id);
						$('#update_tip_detail').val(json[0].tip_detail);
						$('#update_their_product').val(json[0].product_id);						
					}
				}
				_ajax(ajax);
		},
		UpdateTip : function(tip_id){
			Tip.getTheirProductList2(tip_id);
			open_xg();
		},
		
		update : function(){
			var tip_detail = $('#update_tip_detail').val();//完整产品名称
			var their_product = $('#update_their_product').val();//获取产品名称
			var update_tip_id = $('#update_tip_id').val();
			
			if(Tip.checkText(tip_detail)){
				var ajax={
						url : '/hsh_backstage/updateTip/',
						data : {
							"data" : JSON.stringify({
								'tip_id' : update_tip_id,
								'tip_detail' : tip_detail,
								'product_id' : their_product
							})
						},
						success : function(json){
							if(json.result=='SUCCESS'){
								layer.msg('修改成功!', {icon: 1});
								setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
									window.location.reload();//页面刷新
									},800);
							}else{
								layer.msg('修改失败!');
							}
						}
					}
					_ajax(ajax);
			}
		},
		delTip : function(tip_id){
			//询问框
			layer.confirm('是否删除？', {
			  btn: ['确定','取消']
			}, function(){
				var ajax={
						url : '/hsh_backstage/delTip/',
						data : {
							'tip_id' : tip_id
						},
						success : function(json){
							if(json.result=='SUCCESS'){
								layer.msg('删除成功!', {icon: 1});
								setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
									window.location.reload();//页面刷新
									},800);
							}else{
								layer.msg('删除失败!', {icon: 1});
							}
						}
					}
				_ajax(ajax);
			}, function(){
				
			});
		},
		//第二步，实现页面布局
		show_table : function(json,page){
			var html = "";
			var page_html="";
			var func = "getTip";
			//处理数据
			if(json["count"]>0){
				html+="<thead><tr><th>编号</th><th>Tip detail</th><th>产品</th><th>操作</th></tr></thead>";
				for(var i = 0; i<json["list"].length; i++){
					top_px = "35px";
					var data = json["list"][i];
					console.info(data);
					html+="<tbody><tr><td>"+data["tip_id"]+"</td>"
						+"<td title=\""+data["tip_detail"]
					    +"\"><div class=\"your_class\">"
					    +data["tip_detail"]+"</div></td>"
					html+="<td><a href=\"#\" style=\"color:blue;\">查看</a>";
						
					html+="<div class=\"table_yc\" style=\"width: 300px;overflow:scroll; top:" + top_px + ";text-align:left;word-break: break-all;word-wrap:break-word;\"><b>所属产品</b></br>";
					if(data["product_name"]){
						product_name_list = data["product_name"].split(",");
						for(var z=0; z<product_name_list.length; z++){
							html+=product_name_list[z]+"</br>";
						}
					}
					html+="</div></td>";
					
					html+="<td>"
					html+="<a href=\"#\" style=\"color:green;\" onclick=\"Tip.UpdateTip"+ "('" +data["tip_id"]+ "')" +"\">修 改</a>";
					html+="&nbsp;|&nbsp;"
					html+="<a href=\"#\" style=\"color:red;\" onclick=\"Tip.delTip"+ "('" +data["tip_id"]+ "')" +"\">删 除</a>";
					html+="</td>";
					html+="</tr></tbody>"
				}
			}else{
				html+= "<thead><tr style=\"color:red;\"><th>暂无内容</th></tr></thead>";
				$('#page').val(1);
			}
			
			//处理分页
			if(page>1){
				page_html = "<li class=\"paginItem\"><a href=\"javascript:Alert."+func+"(1);\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:Alert."+func+"("+(page-1)+");\" style=\"width: 60px;\">上一页</a></li>";
			}else{
				page_html = "<li class=\"paginItem\"><a href=\"javascript:layer.msg('当前页就是首页哦.');\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:layer.msg('没有上一页了哦.');;\" style=\"width: 60px;\">上一页</a></li>";
			}
			if(json["count"]==0){
				page_html+= "<li class=\"paginItem\"><span style=\"font-size: 20px;\">0/0</span></li>&nbsp;";
			}else{
				page_html+= "<li class=\"paginItem\"><span style=\"font-size: 20px;\">"+page+"/"+json["pageSize"]+"</span></li>&nbsp;";
			}
			if(page<json["pageSize"]){
				page_html+= "<li class=\"paginItem\"><a href=\"javascript:Alert."+func+"("+(page+1)+");\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:Alert."+func+"("+json["pageSize"]+");\" style=\"width: 60px;\">末页</a></li>";
			}else{
				page_html+= "<li class=\"paginItem\"><a href=\"javascript:layer.msg('没有下一页了哦.');\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:layer.msg('当前页就是末页哦.');\" style=\"width: 60px;\">末页</a></li>";
			}
			page_html+= "<li style=\"float: right; margin-top: 11px;\">共"+json["count"]+"条记录.</li>";
			$('#page_html').html(page_html);
			$('#table_html').html(html);
		}
}
function checkStr(data, msg){
	if(data == undefined || data==null || data.trim()==''){
		layer.msg(msg);
		return false;
	}
	return true;
}

