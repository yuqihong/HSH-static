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
			var jsons = eval("(" + json.data_sheet + ")");
			html+="<table width=\"50%\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\"><tr><td colspan=\"3\" align=\"center\" valign=\"middle\">";
			html+="<h2 class=\"text_underline\"><strong>"+json.product_name+" Product Specifications</strong></h2></td>";
			html+="</tr><tr><td width=\"10%\" align=\"right\" valign=\"middle\"></td>";
			html+="<td><ul><li><a href=\"#\" class=\"item\">Data Sheet</a></li><li><a href=\"#\" class=\"item\">Environment</a></li></ul></td>";
			html+="<td><ul><li><a href=\"#\" class=\"item\">Dimensions and Weights</a></li><li><a href=\"#\" class=\"item\">Clearance and Service Access</a></li></ul></td>";
			html+="</tr></table><br/>";
					  
			html+="<table id=\"mainTable\" width=\"80%\" border=\"2\" align=\"center\" style=\"border-collapse:separate;border-spacing:2px;table-layout: fixed;\" bordercolor=\"#FF0000\" class=\"bordered\">";
			html+="<tr><td colspan=\"2\" bgcolor=\"#CCCCCC\"><span class=\"subtitle\">Data Sheet(Block Module)</span></td></tr>";
			html+="<tr><td><strong>Height</strong></td><td>"+jsons.product_hight+"</td></tr>";
			if(jsons.bandwidth!="None"){
				html+="<tr><td><strong>Aggregate Bandwidth</strong></td><td>"+jsons.bandwidth+"</td></tr>";	  
			}else{
				html+="<tr><td><strong>Aggregate Bandwidth</strong></td><td></td></tr>";	  
			}
			html+="<tr><td><strong>Host Interfaces(maximum)</strong></td><td>"+jsons.host_interfaces+"</td></tr>";
			html+="<tr><td><strong>Internal Raw Capacity</strong></td><td>"+jsons.internal_raw_capacity+"</td></tr>";
			html+="<tr><td><strong>Flash Storage Options</strong></td><td>"+jsons.flash_storage_options+"</td></tr>";
			html+="<tr><td><strong>Hard Disk Drive Options</strong></td><td>"+jsons.hard_disk_drive_options+"</td></tr>";
			html+="<tr><td><strong>Minimum to Maximum Hard Drives</strong></td><td>"+jsons.minimum_to_maximum_hard_drices+"</td></tr>";
			html+="<tr><td><strong>Maximum Number Flash Drives</strong></td><td>"+jsons.maximum_number_flash_drives+"</td></tr>";
			html+="<tr><td><strong>Maximum Number Flash Drives(FMD)</strong></td><td>"+jsons.maximum_number_flash_drives_fmd+"</td></tr>";
			html+="<tr><td><strong>Back-End Disk Interface</strong></td><td>"+jsons.back_End_disk_interface+"</td></tr>";
			html+="<tr><td><strong>RAID Configurations</strong></td><td>"+jsons.raid_configurations+"</td></tr>";
			html+="<tr><td><strong>Cache Options</strong></td><td>"+jsons.cache_options+"</td></tr>";
			html+="<tr><td><strong>Maximum LUNs</strong></td><td>"+jsons.maximum_luns+"</td></tr>";
			html+="<tr><td><strong>Volume Size</strong></td><td>"+jsons.volume_size+"</td></tr>";	
			html+="<tr><td><strong>Virtual Storage Machines</strong></td><td>"+jsons.virtual_storage_machines+"</td></tr>";
			html+="<tr><td><strong>High Availability</strong></td><td>"+jsons.high_availability+"</td></tr>";
			html+="<tr><td colspan=\"2\" bgcolor=\"#CCCCCC\"><strong class=\"subtitle\">Environt</strong></td></tr>";
			html+="<tr><td><strong>AC Power</strong></td><td>"+jsons.ac_power+"</td></tr>";
			html+="<tr><td><strong>PDU</strong></td><td>"+jsons.pdu+"</td></tr>";
			html+="<tr><td><strong>Input Power</strong></td><td>"+jsons.input_power+"</td></tr>";    
			html+="<tr><td><strong>Temperature</strong></td><td>"+jsons.temperature+"</td></tr>";
			html+="<tr><td><strong>Humidity</strong></td><td>"+jsons.humidity+"</td></tr>";
			html+="<tr><td><strong>Altitude</strong></td><td>"+jsons.altitude+"</td></tr>";
			html+="<tr><td colspan=\"2\" bgcolor=\"#CCCCCC\"><strong class=\"subtitle\">Dimensions and Weights</strong></td></tr>";
			html+="<tr><td><strong>Width(inch/mm)</strong></td><td>"+jsons.width_inch+"</td></tr>";
			html+="<tr><td><strong>Depth(inch/mm)</strong></td><td>"+jsons.depth_inch+"</td></tr>";
			html+="<tr><td><strong>Height(inch/mm)</strong></td><td>"+jsons.height_inch+"</td></tr>";
			html+="<tr><td><strong>Max. System Weight(lbs/kg)</strong></td><td>"+jsons.system_weight+"</td></tr>";
			html+="<tr><td colspan=\"2\" bgcolor=\"#CCCCCC\"><strong class=\"subtitle\">Clearance and Service Access</strong></td></tr>";
			html+="<tr><td><strong>Front(mm)</strong></td><td>"+jsons.front+"</td></tr>";
			html+="<tr><td><strong>Rear(mm)</strong></td><td>"+jsons.rear+"</td></tr>";
			html+="</table>";
		}
		$('#show_datasheet').html(html);
	},
}
function GetQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }
var product_name = GetQueryString('product_name');
CurrentSystem.selectCurrentSystem(product_name);

