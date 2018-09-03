var Spare={
	
		submit : function(){
			var spare_pn = $('#spare_pn').val();
			var spare_description = $('#spare_description').val();
			var spare_product_pn = $('#spare_product_pn').val();
			var spare_substitue_pn = $('#spare_substitue_pn').val();
			var spare_type = $('#spare_type').val();
			var their_product = $('#their_product').val();
			
			if(Spare.checkText(spare_pn, spare_description, spare_product_pn, spare_substitue_pn)){
				Spare.saveSpare(spare_pn, spare_description, spare_product_pn, spare_substitue_pn, spare_type, their_product);
			}
		},
		
		checkText : function(spare_pn, spare_description, spare_product_pn, spare_substitue_pn){
			if(checkStr(spare_pn, '请输入Spare PN') && checkStr(spare_description, '请输入Spare Description') && checkStr(spare_product_pn, '请输入Spare Product PN') 
			&& checkStr(spare_substitue_pn, '请输入Spare Substitue PN')){
				return true;
			}
			return false;
		},
		
		saveSpare : function(spare_pn, spare_description, spare_product_pn, spare_substitue_pn, spare_type, their_product){
			
			var ajax={
				url : '/hsh_backstage/saveSpare/',
				type: 'POST',
				data:{
					"data" : JSON.stringify({
						'spare_pn' : spare_pn,
						'spare_description' : spare_description,
						'spare_product_pn' : spare_product_pn,
						'spare_substitue_pn' : spare_substitue_pn,
						'spare_type_id' : spare_type, 
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
		
		
		getSpare : function(page){
			var search_text = $('#search_text').val().trim();
			var ajax={
				url : '/hsh_backstage/getSpareList/',
				data : {
					'search_text' : "%"+search_text+"%",
					'page' : page
				},
				success : function(json){
					Spare.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		
		getSpareList : function(page){
			var ajax={
				url : '/hsh_backstage/getSpareList/',
				data : {
					'page' : page
				},
				success : function(json){
					Spare.show_table(json, page);
				}
			}
			_ajax(ajax);
		},
		
		openAdd : function(){
			Spare.getTheirProductList();
			Spare.getSpareTypeList();
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
		getTheirProductList2 : function(spare_id){
			var ajax={
					url : '/hsh_backstage/getTheirProductList/',
					success : function(json){
						html = "<option value=\"\">--不选择--</option>";
						for(var i=0; i < json.length ; i++){
							html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
						}
						$('#their_product').html(html);
						$('#update_their_product').html(html);
						Spare.getUpdateSpare(spare_id);
					}
				}
				_ajax(ajax);
		},
		getSpareTypeList : function(){
			var ajax={
					url : '/hsh_backstage/getSpareTypeList/',
					success : function(json){
						html = "<option value=\"\">--不选择--</option>";
						for(var i=0; i < json.length ; i++){
							html+="<option value=\""+json[i].id+"\">"+json[i].spare_type_name+ "</option>";
						}
						$('#spare_type').html(html)
						$('#update_spare_type').html(html);
					}
				}
				_ajax(ajax);
		},
		getUpdateSpare : function(spare_id){
			var ajax={
					url : '/hsh_backstage/getUpdateSpare/',
					data : {
						'id' : spare_id
					},
					success : function(json){
						$('#update_spare_id').val(json[0].id);
						$('#update_spare_pn').val(json[0].spare_pn);
						$('#update_spare_description').val(json[0].spare_description);
						$('#update_spare_product_pn').val(json[0].spare_product_pn);
						$('#update_spare_substitue_pn').val(json[0].spare_substitue_pn);
						$('#update_spare_type').val(json[0].type_id);
						$('#update_their_product').val(json[0].product_id);
					}
				}
				_ajax(ajax);
		},
		UpdateSpare : function(spare_id){
			Spare.getTheirProductList2(spare_id);  //获取产品的信息
			Spare.getSpareTypeList();  //获取spare type信息
			open_xg();
		},
		
		update : function(){
			var spare_pn = $('#update_spare_pn').val();
			var spare_description = $('#update_spare_description').val();
			var spare_product_pn = $('#update_spare_product_pn').val();
			var spare_substitue_pn = $('#update_spare_substitue_pn').val();
			var spare_type = $('#update_spare_type').val();
			var their_product = $('#update_their_product').val();
			var update_spare_id = $('#update_spare_id').val();
			
			if(Spare.checkText(spare_pn, spare_description, spare_product_pn, spare_substitue_pn)){
				var ajax={
						url : '/hsh_backstage/updateSpare/',
						data : {
							"data" : JSON.stringify({
								'spare_pn' : spare_pn,
								'spare_description' : spare_description,
								'spare_product_pn' : spare_product_pn,
								'spare_substitue_pn' : spare_substitue_pn,
								'spare_type_id' : spare_type, 
								'their_product' : their_product,
								'spare_id' : update_spare_id
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
		delSpare : function(spare_id){
			//询问框
			layer.confirm('是否删除？', {
			  btn: ['确定','取消']
			}, function(){
				var ajax={
						url : '/hsh_backstage/delSpare/',
						data : {
							'spare_id' : spare_id
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
			var func = "getSpare";
			//处理数据
			if(json["count"]>0){
				html+="<thead><tr><th>编号</th><th>Spare PN</th><th>Spare Description</th><th>Spare Product PN</th><th>Spare Substitue PN</th><th>Spare Type</th><th>产品</th><th>操作</th></tr></thead>";
				for(var i = 0; i<json["list"].length; i++){
					top_px = "35px";
					var data = json["list"][i];
					html+="<tbody><tr><td>"+data["id"]+"</td>"
						+"<td>"+data["spare_pn"]+"</td>"
						+"<td title=\""+data["spare_description"]+"\"><div class=\"your_class\">"+data["spare_description"]+"</div></td>"
						+"<td>"+data["spare_product_pn"]+"</td>"
						+"<td>"+data["spare_substitue_pn"]+"</td>"
						+"<td>"+data["type_name"]+"</td>";
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
					html+="<a href=\"#\" style=\"color:green;\" onclick=\"Spare.UpdateSpare"+ "('" +data["id"]+ "')" +"\">修 改</a>";
					html+="&nbsp;|&nbsp;"
					html+="<a href=\"#\" style=\"color:red;\" onclick=\"Spare.delSpare"+ "('" +data["id"]+ "')" +"\">删 除</a>";
					html+="</td>";
					html+="</tr></tbody>"
				}
			}else{
				html+= "<thead><tr style=\"color:red;\"><th>暂无内容</th></tr></thead>";
				$('#page').val(1);
			}
			
			//处理分页
			if(page>1){
				page_html = "<li class=\"paginItem\"><a href=\"javascript:Spare."+func+"(1);\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:Spare."+func+"("+(page-1)+");\" style=\"width: 60px;\">上一页</a></li>";
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
				page_html+= "<li class=\"paginItem\"><a href=\"javascript:Spare."+func+"("+(page+1)+");\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
					+ "<li class=\"paginItem\"><a href=\"javascript:Spare."+func+"("+json["pageSize"]+");\" style=\"width: 60px;\">末页</a></li>";
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

