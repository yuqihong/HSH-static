var CurrentSystem={
	selectCurrentSystem : function(product_name){
		var ajax={
				url : '/current_system/selectCurrentSystemByProductName/',
				data : {
					"product_name" : product_name
				},
				success : function(json){
					CurrentSystem.show_homepage(json);
				}
			}
			_ajax(ajax);
	},
	 
	show_homepage : function(json1){
		var html = "";
		//处理数据
		var json = json1[0];
		
		if(json1.length>0){
					html+="<div align=\"center\" style=\"padding-top: 15px;\"><font style=\"font-size: 30px;\"><strong>"+json.product_long_name+"</strong></font></div>";
					html+="<table width=\"80%;\" align=\"center\"  class=\"bordered\" style=\"margin-top: 15px;\"><tr>";
					var images_list = json.product_view_url.split(",");
					html+="<td colspan=\"3\" align=\"center\">"
					
					for(var i=0; i<images_list.length-1; i++){
						html+="<img data-action=\"zoom\" src=\""+images_list[i]+"\" width=\"196\" height=\"196\" align=\"middle\" />&nbsp;";
					}
					
					html+="</td>";
					html+="</tr>";
					html+="<tr><td bgcolor=\"#D65EA0\"><span class=\"STYLE1\"><strong>Information Area<strong></span></td>";
					html+="<td bgcolor=\"#D65EA0\"><span class=\"STYLE1\"><strong>Quick Facts</strong></span></td>";
					html+="</tr><tr>";
					html+="<td valign=\"top\" width=\"350px\"><ui>";
					html+="<li><a href=\"#\" class=\"item\" onclick=\"CurrentSystem.getDataSheet"+"('"+json.product_name+"')"+"\">System Specifications</a></li>" +
							"<li><a href=\"#\" class=\"item\">System Views and Components</a></li>" +
							"<li><a href=\"#\" class=\"item\">Spare Part List</a></li><br />" +
							"<li><a href=\"#\" class=\"item\">Alerts</a></li><br/>" +
							"<li><a href=\"#\" class=\"item\">Technical Tips</a></li>" +
							"<li><a href=\"#\" class=\"item\">Related Documents</a></li>";
					html+="</ui></td>";
					html+="<td valign=\"top\">";
					
				if(json.is_show == 1){
					html+="<table width=\"100%\" style=\"border-collapse:separate;border-spacing:2px;table-layout: fixed; \">";
					
					if(json.code_name!="None"){
						html+="<tr><td><strong>Code Name</strong></td><td>"+json.code_name +"</td></tr>";  
					}else{
						html+="<tr><td><strong>Code Name</strong></td><td></td></tr>"; 
					}
					
					if(json.product_name!="None"){
						html+="<tr><td><strong>Market Name</strong></td><td>"+json.product_name+"</td></tr>";  
					}else{
						html+="<tr><td><strong>Market Name</strong></td><td></td></tr>"; 
					}
					
					if(json.ga_date!="None"){
						html+="<tr><td><strong>GA Date</strong></td><td>"+json.ga_date+"</td></tr>";  
					}else{
						html+="<tr><td><strong>GA Date</strong></td><td></td></tr>"; 
					}
					
					if(json.system_architecture!="None"){
						html+="<tr><td><strong>System Architecture</strong></td><td>"+json.system_architecture+"</td></tr>";  
					}else{
						html+="<tr><td><strong>System Architecture</strong></td><td></td></tr>"; 
					}
					
					if(json.max_cache!="None"){
						html+="<tr><td><strong>Max Cache</strong></td><td>"+json.max_cache+"</td></tr>"; 
					}else{
						html+="<tr><td><strong>Max Cache</strong></td><td></td></tr>"; 
					}
					  
					if(json.product_hight!="None"){
						html+="<tr><td><strong>Hight</strong></td><td>"+json.product_hight+"</td></tr>"; 
					}else{
						html+="<tr><td><strong>Hight</strong></td><td></td></tr>"; 
					}
					
					if(json.bandwidth!="None"){
						html+="<tr><td><strong>Bandwidth</strong></td><td>"+json.bandwidth+"</td></tr>"; 
					}else{
						html+="<tr><td><strong>Bandwidth</strong></td><td></td></tr>"; 
					}
					
					html+="</table></td></tr>";
					html+="</table>";
				}else{
					html+="<table width=\"100%\" style=\"border-collapse:separate;border-spacing:2px;table-layout: fixed; \">";
					html+="<tr><td><strong>Code Name</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>Market Name</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>GA Date</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>System Architecture</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>Max Cache</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>Hight</strong></td><td></td></tr>"; 
					html+="<tr><td><strong>Bandwidth</strong></td><td></td></tr>"; 
					html+="</table></td></tr>";
					html+="</table>";
				}
		}
		$('#show_homepage').html(html);
	},
	
	getDataSheet : function(product_name){
		location.href = "/current_system/getDataSheet/?product_name="+product_name;
	},
	
}

function GetQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }
var product_name = GetQueryString('product_name');
CurrentSystem.selectCurrentSystem(product_name);


