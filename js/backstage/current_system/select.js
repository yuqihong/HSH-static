var CurrentSystem={
	
	submit : function(){
			var product_name = $('#product_name1').val().trim();//产品名称
			var product_long_name = $('#product_long_name1').val().trim();//完整产品名称
			var hsh_category_id = $('#hsh_category_id1').val()//产品类型
			var product_isshow = $('#product_isshow1').val()//是否显示
			var product_eol = $('#product_eol1').val();//是否过期
			var code_name = $('#code_name1').val().trim();
			var ga_date = $('#ga_date1').val().trim();
			var system_architecture = $('#system_architecture1').val().trim();
			var max_cache = $('#max_cache1').val().trim();
			var hight = $('#hight1').val().trim();
			
			var bandwidth = $('#bandwidth1').val().trim();
			var host_interfaces = $('#host_interfaces1').val().trim();
			var internal_raw_capacity = $('#internal_raw_capacity1').val().trim();
			var flash_storage_options = $('#flash_storage_options1').val().trim();
			var hard_disk_drive_options = $('#hard_disk_drive_options1').val().trim();
			var minimum_to_maximum_hard_drices = $('#minimum_to_maximum_hard_drices1').val().trim();
			var maximum_number_flash_drives = $('#maximum_number_flash_drives1').val().trim();
			var maximum_number_flash_drives_fmd = $('#maximum_number_flash_drives_fmd1').val().trim();
			var back_End_disk_interface = $('#back_End_disk_interface1').val().trim();
			var raid_configurations = $('#raid_configurations1').val().trim();
			
			var cache_options = $('#cache_options1').val().trim();
			var maximum_luns = $('#maximum_luns1').val().trim();
			var volume_size = $('#volume_size1').val().trim();
			var high_availability = $('#high_availability1').val().trim();
			var ac_power = $('#ac_power1').val().trim();
			var pdu = $('#pdu1').val().trim();
			var input_power = $('#input_power1').val().trim();
			var temperature = $('#temperature1').val().trim();
			var humidity = $('#humidity1').val().trim();
			var altitude = $('#altitude1').val().trim();
			
			var width_inch = $('#width_inch1').val().trim();
			var depth_inch = $('#depth_inch1').val();
			var height_inch = $('#height_inch1').val().trim();
			var system_weight = $('#system_weight1').val().trim();
			var front = $('#front1').val().trim();
			var rear = $('#rear1').val().trim();
			var virtual_storage_machines = $('#virtual_storage_machines1').val().trim();
			var product_id = $('#update_id').val();
			
			if(CurrentSystem.checkText(product_name, product_long_name)){
				CurrentSystem.updateProduct(product_id, product_name, product_long_name, hsh_category_id, product_isshow, product_eol, 
						code_name, ga_date, system_architecture, max_cache, hight, bandwidth, host_interfaces, internal_raw_capacity, flash_storage_options,
						hard_disk_drive_options, minimum_to_maximum_hard_drices, maximum_number_flash_drives, maximum_number_flash_drives_fmd, 
						back_End_disk_interface, raid_configurations, cache_options, maximum_luns, volume_size,
						virtual_storage_machines, high_availability, ac_power, pdu, input_power, temperature, humidity, altitude, width_inch,
						depth_inch, height_inch, system_weight, front, rear);
			}
		},
	
		checkText : function(product_name, product_long_name){
			if(checkStr(product_name, '请输入产品名称') && checkStr(product_long_name, '请输入完整产品名称')){
				return true;
			}
			return false;
		},
		
	getCurrentSystem : function(page){
		var search_text = $('#search_text').val().trim();
		var ajax={
			url : '/hsh_backstage/getCurrentSystemList/',
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
		var ajax={
			url : '/hsh_backstage/getCurrentSystemList/',
			data : {
				'page' : page
			},
			success : function(json){
				CurrentSystem.show_table(json, page);
			}
		}
		_ajax(ajax);
	},
	
	delProduct : function(product_id){
		//询问框
		layer.confirm('是否删除？', {
		  btn: ['确定','取消']
		}, function(){
			var ajax={
					url : '/hsh_backstage/delCurrentSystem/',
					data:{
						"data" : JSON.stringify({
							'product_id' : product_id,
						})
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
	
	updateProduct : function(product_id, product_name, product_long_name, hsh_category_id, product_isshow, product_eol, 
			code_name, ga_date, system_architecture, max_cache, hight, bandwidth, host_interfaces, internal_raw_capacity, flash_storage_options,
			hard_disk_drive_options, minimum_to_maximum_hard_drices, maximum_number_flash_drives, maximum_number_flash_drives_fmd, 
			back_End_disk_interface, raid_configurations, cache_options, maximum_luns, volume_size,
			virtual_storage_machines, high_availability, ac_power, pdu, input_power, temperature, humidity, altitude, width_inch,
			depth_inch, height_inch, system_weight, front, rear){
		var ajax={
				url : '/hsh_backstage/updateCurrentSystem/',
				data : {
					"data" : JSON.stringify({
						'product_id' : product_id,
						
						'product_name' : product_name,
						'product_long_name' : product_long_name,
						'hsh_category_id' : hsh_category_id,
						'is_show' : product_isshow,
						'product_eol' : product_eol,
						'code_name' : code_name,
						'ga_date' : ga_date,
						'system_architecture' : system_architecture,
						'max_cache' : max_cache,
						'product_hight' : hight,
						
						'bandwidth' : bandwidth,
						'host_interfaces' : host_interfaces,
						'internal_raw_capacity' : internal_raw_capacity,
						'flash_storage_options' : flash_storage_options,
						'hard_disk_drive_options' : hard_disk_drive_options,
						'minimum_to_maximum_hard_drices' : minimum_to_maximum_hard_drices,
						'maximum_number_flash_drives' : maximum_number_flash_drives,
						'maximum_number_flash_drives_fmd' : maximum_number_flash_drives_fmd,
						'back_End_disk_interface' : back_End_disk_interface,
						'raid_configurations' : raid_configurations,
						
						'cache_options' : cache_options,
						'maximum_luns' : maximum_luns,
						'volume_size' : volume_size,
						'virtual_storage_machines' : virtual_storage_machines,
						'high_availability' : high_availability,
						'ac_power' : ac_power,
						'pdu' : pdu,
						'input_power' : input_power,
						'temperature' : temperature,
						'humidity' : humidity,
						
						'altitude' : altitude,
						'width_inch' : width_inch,
						'depth_inch' : depth_inch,
						'height_inch' : height_inch,
						'system_weight' : system_weight,
						'front' : front,
						'rear' : rear
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
	},
	
	openUpdateCurrentSystem : function(product_id){
		$('#update_id').val(product_id);
       //给弹出框填充数据
		CurrentSystem.getUpdateData(product_id);
		open_xg();
	},
	
	getUpdateData : function(product_id){
		var ajax={
				url : '/hsh_backstage/getProductById/',
				data : {
					'product_id' : product_id
				},
				success : function(json){
					
					if(json[0].data_sheet != "None"){
						var a = json[0].data_sheet;	
						var b = eval('(' + a + ')');
						$('#update_id').val(product_id);
						$('#product_name1').val(json[0].product_name);
						$('#product_long_name1').val(json[0].product_long_name);
						$('#hsh_category_id1').val(json[0].hsh_category_id);
						$('#product_isshow1').val(json[0].is_show);
						$('#product_eol1').val(json[0].product_eol);
						$('#code_name1').val(json[0].code_name);
						$('#ga_date1').val(json[0].ga_date);
						$('#max_cache1').val(json[0].max_cache);
						$('#system_architecture1').val(json[0].system_architecture);
						$('#bandwidth1').val(json[0].bandwidth);

						$('#hight1').val(b.product_hight);
						$('#host_interfaces1').val(b.host_interfaces);
						$('#internal_raw_capacity1').val(b.internal_raw_capacity);
						$('#flash_storage_options1').val(b.flash_storage_options);
						$('#hard_disk_drive_options1').val(b.hard_disk_drive_options);
						$('#minimum_to_maximum_hard_drices1').val(b.minimum_to_maximum_hard_drices);
						$('#maximum_number_flash_drives1').val(b.maximum_number_flash_drives);
						$('#maximum_number_flash_drives_fmd1').val(b.maximum_number_flash_drives_fmd);
						$('#back_End_disk_interface1').val(b.back_End_disk_interface);
						$('#raid_configurations1').val(b.raid_configurations);
						$('#cache_options1').val(b.cache_options);
						$('#maximum_luns1').val(b.maximum_luns);
						$('#volume_size1').val(b.volume_size);
						$('#high_availability1').val(b.high_availability);
						$('#virtual_storage_machines1').val(b.virtual_storage_machines);
						$('#ac_power1').val(b.ac_power);
						$('#pdu1').val(b.pdu);
						$('#input_power1').val(b.input_power);
						$('#temperature1').val(b.temperature);
						$('#humidity1').val(b.humidity);
						$('#altitude1').val(b.altitude);
						$('#width_inch1').val(b.width_inch);
						$('#depth_inch1').val(b.depth_inch);
						$('#height_inch1').val(b.height_inch);
						$('#system_weight1').val(b.system_weight);
						$('#front1').val(b.front);
						$('#rear1').val(b.rear);
					} else{
						$('#update_id').val(product_id);
						$('#product_name1').val(json[0].product_name);
						$('#product_long_name1').val(json[0].product_long_name);
						$('#hsh_category_id1').val(json[0].hsh_category_id);
						$('#product_isshow1').val(json[0].is_show);
						$('#product_eol1').val(json[0].product_eol);
						$('#code_name1').val(json[0].code_name);
						$('#ga_date1').val(json[0].ga_date);
						$('#max_cache1').val(json[0].max_cache);
						$('#system_architecture1').val(json[0].system_architecture);
						$('#bandwidth1').val(json[0].bandwidth);
					}
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
			html+="<thead><tr><th>编号</th><th>产品名称</th><th>产品完整名称</th><th>所属类别</th><th>图片</th><th>创建时间</th><th>操作</th></tr></thead>";
			for(var i = 0; i<json["list"].length; i++){
				top_px = "35px";
				var data = json["list"][i];
				html+="<tbody><tr><td>"+data["product_id"]+"</td>"
					+"<td>"+data["product_name"]+"</td>"
					+"<td>"+data["product_long_name"]+"</td>"
					+"<td>"+data["category_name"]+"</td>";
				
				html+="<td>";
				
				url_list = data["product_view_url"].split(",");
				for(var j = 0; j<url_list.length-1; j++){
					html+="<img data-action=\"zoom\" style=\"width:40px; height:30px; text-align:center; margin-top:10px;\" src=\"" + url_list[j]+"\" /> &nbsp;";
				}
				html+="</td>";
				
				html+="<td>"+data["create_time"]+"</td>";
				html+="<td>";
				html+="<a href=\"#\" style=\"color:green;\" onclick=\"CurrentSystem.openUpdateCurrentSystem"+ "('" +data["product_id"]+ "')" +"\">修 改</a>";
				html+="&nbsp;|&nbsp;"
				html+="<a href=\"#\" style=\"color:red;\" onclick=\"CurrentSystem.delProduct"+ "('" +data["product_id"]+ "')" +"\">删 除</a>";
				html+="</td>";
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
	}
}
function checkStr(data, msg){
	if(data == undefined || data==null || data.trim()==''){
		layer.msg(msg);
		return false;
	}
	return true;
}