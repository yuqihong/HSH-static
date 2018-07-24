var CurrentSystem={
	
	getCurrentSystemList : function(){
		var ajax={
			url : '/current_system/getCurrentSystemProduct_EOL_1/',
			success : function(json){
				CurrentSystem.show_table(json);
			}
		}
		_ajax(ajax);
	},
	
	show_table : function(json){
		var html = "";
		//处理数据
		if(json["list"].length>0){
			for(var i = 0; i<json["list"].length; i++){
				var data = json["list"][i];
					if(i==0 || i==2 || i==4 || i==6){
						html+="<div style=\"width: 25%;float:left;\">";
					}
					var color = '';
					if(i%3==1) color = '#D65EA0;';
					if(i%3==2) color = '#5D53B1;';
					
					html+="<div class=\"col-md-3\" style=\"width: 100%; \"><div class=\"box box-warning box-solid\"><div class=\"box-header with-border\" style=\"background: "+color+"\">";
					html+="<h3 class=\"box-title\">"+data["category_name"]+"</h3>";
					html+="<div class=\"box-tools pull-right\"><button type=\"button\" class=\"btn btn-box-tool\" data-widget=\"collapse\"><i class=\"fa fa-minus\"></i></button></div>";
					html+="</div>";
					product_name = data["product_name"].split(",");
					for(var j=0;j<product_name.length;j++){
						html+="<div class=\"box-body\"><a class=\"a_show\" href=\"#\" onclick=\"CurrentSystem.selectCurrentSystem"+ "('" +product_name[j]+ "')" +"\">"+product_name[j]+"</a></div>";	
					}
					html+="</div></div>";
					if(i==1 || i==json["list"].length-1 || i==3 || i==5 || i==7){
						html+="</div>";
					}
			}
		}
		$('#section_show').html(html);
	},
	
	
	selectCurrentSystem : function(product_name){
		location.href = "/eol_system/getHomePage/?product_name="+product_name;
	},
		
}
CurrentSystem.getCurrentSystemList();
