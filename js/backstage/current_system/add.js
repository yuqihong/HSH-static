var AddCurrentSystem={
	
		submit : function(){
			var product_name = $('#product_name').val().trim();//产品名称
			var product_long_name = $('#product_long_name').val().trim();//完整产品名称
			var hsh_category_id = $('#hsh_category_id').val()//产品类型
			var product_isshow = $('#product_isshow').val()//是否显示
			var product_eol = $('#product_eol').val();//是否过期
			var code_name = $('#code_name').val().trim();
			var ga_date = $('#ga_date').val().trim();
			var system_architecture = $('#system_architecture').val().trim();
			var max_cache = $('#max_cache').val().trim();
			var hight = $('#hight').val().trim();
			
			var bandwidth = $('#bandwidth').val().trim();
			var host_interfaces = $('#host_interfaces').val().trim();
			var internal_raw_capacity = $('#internal_raw_capacity').val().trim();
			var flash_storage_options = $('#flash_storage_options').val().trim();
			var hard_disk_drive_options = $('#hard_disk_drive_options').val().trim();
			var minimum_to_maximum_hard_drices = $('#minimum_to_maximum_hard_drices').val().trim();
			var maximum_number_flash_drives = $('#maximum_number_flash_drives').val().trim();
			var maximum_number_flash_drives_fmd = $('#maximum_number_flash_drives_fmd').val().trim();
			var back_End_disk_interface = $('#back_End_disk_interface').val().trim();
			var raid_configurations = $('#raid_configurations').val().trim();
			
			var cache_options = $('#cache_options').val().trim();
			var maximum_luns = $('#maximum_luns').val().trim();
			var volume_size = $('#volume_size').val().trim();
			var high_availability = $('#high_availability').val().trim();
			var ac_power = $('#ac_power').val().trim();
			var pdu = $('#pdu').val().trim();
			var input_power = $('#input_power').val().trim();
			var temperature = $('#temperature').val().trim();
			var humidity = $('#humidity').val().trim();
			var altitude = $('#altitude').val().trim();
			
			var width_inch = $('#width_inch').val().trim();
			var depth_inch = $('#depth_inch').val();
			var height_inch = $('#height_inch').val().trim();
			var system_weight = $('#system_weight').val().trim();
			var front = $('#front').val().trim();
			var rear = $('#rear').val().trim();
			var virtual_storage_machines = $('#virtual_storage_machines').val().trim();
			var product_id = $('#product_id').val();
			
			if(AddCurrentSystem.checkText(product_name, product_long_name)){
				AddCurrentSystem.saveCurrentSystem(product_name, product_long_name, hsh_category_id, product_isshow, product_eol, 
						code_name, ga_date, system_architecture, max_cache, hight, bandwidth, host_interfaces, internal_raw_capacity, flash_storage_options,
						hard_disk_drive_options, minimum_to_maximum_hard_drices, maximum_number_flash_drives, maximum_number_flash_drives_fmd, 
						back_End_disk_interface, raid_configurations, cache_options, maximum_luns, volume_size,
						virtual_storage_machines, high_availability, ac_power, pdu, input_power, temperature, humidity, altitude, width_inch,
						depth_inch, height_inch, system_weight, front, rear, product_id);
			}
		},
		
		checkText : function(product_name, product_long_name){
			if(checkStr(product_name, '请输入产品名称') && checkStr(product_long_name, '请输入完整产品名称')){
				return true;
			}
			return false;
		},
		
		saveCurrentSystem : function(
	product_name, product_long_name, hsh_category_id, product_isshow, product_eol, code_name, ga_date, system_architecture, max_cache, hight, 
	bandwidth, host_interfaces, internal_raw_capacity, flash_storage_options,hard_disk_drive_options, minimum_to_maximum_hard_drices, maximum_number_flash_drives, maximum_number_flash_drives_fmd, back_End_disk_interface, raid_configurations, 
	cache_options, maximum_luns, volume_size,virtual_storage_machines, high_availability, ac_power, pdu, input_power, temperature, humidity,
	altitude, width_inch,depth_inch, height_inch, system_weight, front, rear, product_id){
			
			var ajax={
				url : '/hsh_backstage/saveCurrentSystem/',
				type: 'POST',
				data:{
					"data" : JSON.stringify({
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
						'rear' : rear,
						'product_id' : product_id 
					})
				},
				success : function(json){
					if(json['error']!=undefined){
						layer.msg('保存失败!');
					}else{
						layer.msg('保存成功!');
		    			setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
		    				window.location.reload();//页面刷新
		    			},1000);
					}
				}
			}
			_ajax(ajax);
		},
}
function checkStr(data, msg){
	if(data == undefined || data==null || data.trim()==''){
		layer.msg(msg);
		return false;
	}
	return true;
}

