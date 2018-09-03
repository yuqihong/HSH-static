var Alert={
	
		submit : function(){
			var alert_number = $('#alert_number').val();//产品名称
			var alert_detail = $('#alert_detail').val();//完整产品名称
			var their_product = $('#their_product').val();//获取产品名称
			
			
			if(Alert.checkText(alert_number, alert_detail)){
				Alert.saveAlert(alert_number, alert_detail, their_product);
			}
		},
		
		checkText : function(alert_number, alert_detail){
			if(checkStr(alert_number, '请输入Alert Number') && checkStr(alert_detail, '请输入Alert Detail')){
				return true;
			}
			return false;
		},
		
		saveAlert : function(alert_number, alert_detail, their_product){
			
			var ajax={
				url : '/hsh_backstage/saveAlert/',
				type: 'POST',
				data:{
					"data" : JSON.stringify({
						'alert_number' : alert_number,
						'alert_detail' : alert_detail,
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
		
		
		getAlert : function(page){
			var search_text = $('#search_text').val().trim();
			var ajax={
				url : '/hsh_backstage/getAlertList/',
				data : {
					'search_text' : "%"+search_text+"%",
					'page' : page
				},
				success : function(json){
					Alert.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		
		getAlertList : function(page){
			var ajax={
				url : '/hsh_backstage/getAlertList/',
				data : {
					'page' : page
				},
				success : function(json){
					Alert.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		
		openAdd : function(){
			Alert.getTheirProductList();
			open_add();
		},
		getTheirProductList : function(){
			var ajax={
					url : '/hsh_backstage/getTheirProductList/',
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
		getTheirProductList2 : function(alert_id){
			var ajax={
					url : '/hsh_backstage/getTheirProductList/',
					success : function(json){
						html = "<option value=\"\">--不选择--</option>";
						for(var i=0; i < json.length ; i++){
							html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
						}
						$('#their_product').html(html);
						$('#update_their_product').html(html);
						Alert.getUpdateAlert(alert_id);
					}
				}
				_ajax(ajax);
		},
		getUpdateAlert : function(alert_id){
			var ajax={
					url : '/hsh_backstage/getUpdateAlert/',
					data : {
						'alert_id' : alert_id
					},
					success : function(json){
						$('#update_alert_id').val(json[0].id);
						$('#update_alert_number').val(json[0].alert_number);
						$('#update_alert_detail').val(json[0].alert_detail);
						$('#update_their_product').val(json[0].product_id);
					}
				}
				_ajax(ajax);
		},
		UpdateAlert : function(alert_id){
			Alert.getTheirProductList2(alert_id);
			open_xg();
		},
		
		update : function(){
			var alert_number = $('#update_alert_number').val();//产品名称
			var alert_detail = $('#update_alert_detail').val();//完整产品名称
			var their_product = $('#update_their_product').val();//获取产品名称
			var alert_id = $('#update_alert_id').val();
			
			if(Alert.checkText(alert_number, alert_detail)){
				var ajax={
						url : '/hsh_backstage/updateAlert/',
						data : {
							"data" : JSON.stringify({
								'alert_id' : alert_id,
								'alert_number' : alert_number,
								'alert_detail' : alert_detail,
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
		delAlert : function(alert_id){
			//询问框
			layer.confirm('是否删除？', {
			  btn: ['确定','取消']
			}, function(){
				var ajax={
						url : '/hsh_backstage/delAletrt/',
						data : {
							'alert_id' : alert_id
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
		show_table : function(json,page){
			var html = "";
			var page_html="";
			var func = "getAlert";
			//处理数据
			if(json["count"]>0){
				html+="<thead><tr><th>编号</th><th>Alert Number</th><th>Alert Detail</th><th>产品</th><th>操作</th></tr></thead>";
				for(var i = 0; i<json["list"].length; i++){
					top_px = "35px";
					var data = json["list"][i];
					html+="<tbody><tr><td>"+data["id"]+"</td>"
						+"<td>"+data["alert_number"]+"</td>"
						+"<td title=\""+data["alert_detail"]+"\"><div class=\"your_class\">"+data["alert_detail"]+"</div></td>"
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
					html+="<a href=\"#\" style=\"color:green;\" onclick=\"Alert.UpdateAlert"+ "('" +data["id"]+ "')" +"\">修 改</a>";
					html+="&nbsp;|&nbsp;"
					html+="<a href=\"#\" style=\"color:red;\" onclick=\"Alert.delAlert"+ "('" +data["id"]+ "')" +"\">删 除</a>";
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

