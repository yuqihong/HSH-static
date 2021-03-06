var Doc={
	submit : function(){
		var doc_title = $('#doc_title').val();//文件名称
		var doc_url = $('#doc_url').val();//文件url
		var their_product = $('#their_product').val();//获取产品名称
		
		if(Doc.checkText(doc_title, doc_url)){
			Doc.saveDoc(doc_title, doc_url, their_product);
		}
	},
	
	checkText : function(doc_title, doc_url){
		if(checkStr(doc_title, '请输入Doc Title') && checkStr(doc_url, '请输入Doc Url')){
			return true;
		}
		return false;
	},
	
	saveDoc : function(doc_title, doc_url, their_product){
		var ajax={
			url : '/hsh_backstage/saveDoc/',
			type: 'POST',
			data:{
				"data" : JSON.stringify({
					'doc_title' : doc_title,
					'doc_url' : doc_url,
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
	
	getDoc : function(page){
		var search_text = $('#search_text').val().trim();
		var ajax={
			url : '/hsh_backstage/getDocList/',
			data : {
				'search_text' : "%"+search_text+"%",
				'page' : page
			},
			success : function(json){
				Doc.show_table(json, page);
			}
		}
		_ajax(ajax);
	},
	
	getDocList : function(page){
		var ajax={
			url : '/hsh_backstage/getDocList/',
			data : {
				'page' : page
			},
			success : function(json){
				Doc.show_table(json, page);
			}
		}
		_ajax(ajax);
	},
	
	openAdd : function(){
		Doc.getProductList();
		open_add();
	},
	
	getProductList : function(){
		var ajax={
			url : '/hsh_backstage/getProductList/',
			success : function(json){
				html = "<option value=\"\">--不选择--</option>";
				for(var i=0; i<json.length; i++){
					html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
				}
				$('#their_product').html(html);
				$('#update_their_product').html(html);
			}
		}
		_ajax(ajax);
	},
	
	getProductList2: function(doc_id){
		var ajax={
			url: '/hsh_backstage/getProductList/',
			data: {
				'doc_id': doc_id
			},
			success: function(json){
				html = "<option value=\"\">--不选择--</option>";
				for(var i=0; i < json.length ; i++){
					html+="<option value=\""+json[i].id+"\">"+json[i].product_name+ "</option>";
				}
				$('#their_product').html(html);
				$('#update_their_product').html(html);
				Doc.getUpdateDoc(doc_id);
			}
		}
		_ajax(ajax);
	},
	
	getUpdateDoc: function(doc_id){
		var ajax={
			url: '/hsh_backstage/getUpdateDoc/',
			data: {
				'doc_id': doc_id
			},
			success: function(json){
				$('#update_doc_title').val(json[0].doc_title);
				$('#update_doc_url').val(json[0].doc_url);
				$('#update_their_product').val(json[0].product_id);
				$('#update_doc_id').val(json[0].id);
			}
		}
		_ajax(ajax);
	},
	
	UpdateDoc: function(doc_id){
		Doc.getProductList2(doc_id);
		open_xg();
	},
	
	update: function(){
		var doc_title = $('#update_doc_title').val();//文档名称
		var doc_url = $('#update_doc_url').val();//文档URL
		var their_product = $('#update_their_product').val();//获取产品名称
		var doc_id = $('#update_doc_id').val();
		
		if(Doc.checkText(doc_title, doc_url)){
			var ajax={
				url: '/hsh_backstage/updateDoc/',
				data: {
					"data": JSON.stringify({
						'doc_id': doc_id,
						'doc_title': doc_title,
						'doc_url': doc_url,
						'product_id': their_product
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
	
	delDoc: function(doc_id){
		//询问框
		layer.confirm('是否删除？', {
		  btn: ['确定','取消']
		}, function(){
			var ajax={
				url: '/hsh_backstage/delDoc/',
				data: {
					'doc_id': doc_id
				},
				success: function(json){
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
		})
	},
	
	show_table : function(json, page){
		var html = "";
		var page_html = "";
		var func = "getDoc";
		//处理数据
		if(json.count > 0){
			html+="<thead><tr><th>编号</th><th>Doc Title</th><th>Doc Url</th><th>产品</th><th>操作</th></tr></thead>";
			for(var i=0; i<json.list.length; i++){
				top_px = "35px";
				var data = json.list[i];
				html+="<tbody><tr><td>" + data.id + "</td>"
					+"<td>"+ data.doc_title +"</td>"
					+"<td title=\""+data.doc_url+"\"><div class=\"your_class\">"+data.doc_url+"</div></td>"
				html+="<td><a href=\"#\" style=\"color:blue;\">查看</a>";
					
				html+="<div class=\"table_yc\" style=\"width: 300px;overflow:scroll; top:" + top_px + ";text-align:left;word-break: break-all;word-wrap:break-word;\"><b>所属产品</b>";
				if(data["product_name"]){
					product_name_list = data["product_name"].split(",");
					for(var z=0; z<product_name_list.length; z++){
						html+="<br>"+product_name_list[z]+"</br>";
					}
				}
//					if(insert_time_list.length>0){
//						for(var z = 0; z<insert_time_list.length; z++){
//							html+=insert_time_list[z]+"</br>";
//						}
//					}
				html+="</div></td>";
				
				html+="<td>"
				html+="<a href=\"#\" style=\"color:green;\" onclick=\"Doc.UpdateDoc"+ "('" +data.id+ "')" +"\">修 改</a>";
				html+="&nbsp;|&nbsp;"
				html+="<a href=\"#\" style=\"color:red;\" onclick=\"Doc.delDoc"+ "('" +data.id+ "')" +"\">删 除</a>";
				html+="</td>";
				html+="</tr></tbody>"
			}
		}else{
			html+= "<thead><tr style=\"color:red;\"><th>暂无内容</th></tr></thead>";
			$('#page').val(1);
		}
		
		//处理分页
		if(page > 1){
			page_html = "<li class=\"paginItem\"><a href=\"javascript:Doc."+func+"(1);\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:Doc."+func+"("+(page-1)+");\" style=\"width: 60px;\">上一页</a></li>";
		}else{
			page_html = "<li class=\"paginItem\"><a href=\"javascript:layer.msg('当前页就是首页哦.');\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:layer.msg('没有上一页了哦.');;\" style=\"width: 60px;\">上一页</a></li>";
		}
		if(json.count == 0){
			page_html+= "<li class=\"paginItem\"><span style=\"font-size: 20px;\">0/0</span></li>&nbsp;";
		}else{
			page_html+= "<li class=\"paginItem\"><span style=\"font-size: 20px;\">"+page+"/"+json.pageSize+"</span></li>&nbsp;";
		}
		if(page < json.pageSize){
			page_html+= "<li class=\"paginItem\"><a href=\"javascript:Doc."+func+"("+(page+1)+");\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:Doc."+func+"("+json.pageSize+");\" style=\"width: 60px;\">末页</a></li>";
		}else{
			page_html+= "<li class=\"paginItem\"><a href=\"javascript:layer.msg('没有下一页了哦.');\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:layer.msg('当前页就是末页哦.');\" style=\"width: 60px;\">末页</a></li>";
		}
		page_html+= "<li style=\"float: right; margin-top: 11px;\">共"+json.count+"条记录.</li>";
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

