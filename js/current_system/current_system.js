var CurrentSystem={
	
	getCurrentSystem : function(page){
		var search_text = $('#search_text').val().trim();
		var ajax={
			url : '/getCurrentSystemList/',
			data : {
				'search_text' : "%"+search_text+"%",
				'page' : page
			},
			success : function(json){
				CurrentSystem.show_table(json, page);
			}
		}
		_ajax(ajax);
	},
	
	getCurrentSystemList : function(page){
		alert(page)
		var ajax={
			url : '/getCurrentSystemList/',
			data : {
				'page' : page
			},
			success : function(json){
				CurrentSystem.show_table(json, page);
			}
		}
		_ajax(ajax);
	},
	
	show_table : function(json,page){
		var html = "";
		var page_html="";
		var func = "getCurrentSystem";
		//处理数据
		if(json["count"]>0){
			html+="<thead><tr><th>序号</th><th>产品名称</th><th>产品完整名称</th><th>所属类别</th><th>创建时间</th><th>操作</th></tr></thead>";
			for(var i = 0; i<json["list"].length; i++){
				top_px = "35px";
				var data = json["list"][i];
				html+="<tbody><tr><td>"+i+"</td>"
					+"<td>"+data["product_name"]+"</td>"
					+"<td>"+data["product_long_name"]+"</td>"
					+"<td>"+data["category_name"]+"</td>"
					+"<td>"+data["create_time"]+"</td>";
				html+="<td><a href=\"#\" style=\"color:red;\" onclick=\"CurrentSystem.delProduct"+ "('" +data["user_name"]+ "')" +"\">删除</a></td>";
				html+="</tr></tbody>"
			}
		}else{
			html+= "<thead><tr style=\"color:red;\"><th>暂无内容</th></tr></thead>";
			$('#page').val(1);
		}
		
		//处理分页
		if(page>1){
			page_html = "<li class=\"paginItem\"><a href=\"javascript:CurrentSystem."+func+"(1);\" style=\"width: 60px;\">首页</a></li>&nbsp;&nbsp;&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:CurrentSystem."+func+"("+(page-1)+");\" style=\"width: 60px;\">上一页</a></li>";
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
			page_html+= "<li class=\"paginItem\"><a href=\"javascript:CurrentSystem."+func+"("+(page+1)+");\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:CurrentSystem."+func+"("+json["pageSize"]+");\" style=\"width: 60px;\">末页</a></li>";
		}else{
			page_html+= "<li class=\"paginItem\"><a href=\"javascript:layer.msg('没有下一页了哦.');\" style=\"width: 60px; border-left:1px solid #ddd;\">下一页</a></li>&nbsp;"
				+ "<li class=\"paginItem\"><a href=\"javascript:layer.msg('当前页就是末页哦.');\" style=\"width: 60px;\">末页</a></li>";
		}
		page_html+= "<li style=\"float: right; margin-top: 11px;\">共"+json["count"]+"条记录.</li>";
		$('#page_html').html(page_html);
		$('#table_html').html(html);
	},
}
CurrentSystem.getCurrentSystemCategory();
CurrentSystem.getCurrentSystemList(1);