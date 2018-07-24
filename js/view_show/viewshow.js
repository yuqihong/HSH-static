function SetCookie(name,value){
     var argv=SetCookie.arguments;
     var argc=SetCookie.arguments.length;
     var expires=(2<argc)?argv[2]:null;
     var path=(3<argc)?argv[3]:null;
     var domain=(4<argc)?argv[4]:null;
     var secure=(5<argc)?argv[5]:false;
     document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}
function GetCookie(Name) {
     var search = Name + "=";
     var returnvalue = "";
     if (document.cookie.length > 0) {
           offset = document.cookie.indexOf(search);
           if (offset != -1) {      
                 offset += search.length;
                 end = document.cookie.indexOf(";", offset);                        
                 if (end == -1)
                       end = document.cookie.length;
                 returnvalue=unescape(document.cookie.substring(offset,end));
           }
     }
     return returnvalue;
}

var thisskin;
thisskin=GetCookie("now_skin");
if(thisskin == '/css/view_show/layout-theme-one.css'){
	   var value = $("#oneShang").attr("class");
	   $("#oneShang").removeClass(value);
	   document.getElementById("oneShang").setAttribute("class","header-section");
	   
	   var value2 = $("#oneXia").attr("class");
	   $("#oneXia").removeClass(value2);
	   document.getElementById("oneXia").setAttribute("class","logo theme-logo-bg hidden-xs hidden-sm");
}
//二号
if(thisskin == '/css/view_show/layout-theme-two.css'){
	   var value = $("#oneShang").attr("class");
	   $("#oneShang").removeClass(value);
	   document.getElementById("oneShang").setAttribute("class","header-section bg-danger light-color");
	   
	   var value2 = $("#oneXia").attr("class");
       $("#oneXia").removeClass(value2);
	   document.getElementById("oneXia").setAttribute("class","logo theme-logo-bg hidden-xs hidden-sm");
}
//三号
if(thisskin == '/css/view_show/layout-theme-three.css'){
	   var value = $("#oneShang").attr("class");
	   $("#oneShang").removeClass(value);
	   document.getElementById("oneShang").setAttribute("class","header-section");
	   
	   var value2 = $("#oneXia").attr("class");
       $("#oneXia").removeClass(value);
	   document.getElementById("oneXia").setAttribute("class","logo bg-danger hidden-xs hidden-sm");
}
//四号
if(thisskin == '/css/view_show/layout-theme-four.css'){
	   var value = $("#oneShang").attr("class");
	   $("#oneShang").removeClass(value);
	   document.getElementById("oneShang").setAttribute("class","header-section bg-info light-color");
	   
	   var value2 = $("#oneXia").attr("class");
       $("#oneXia").removeClass(value2);
	   document.getElementById("oneXia").setAttribute("class","logo bg-info hidden-xs hidden-sm");
}
if(thisskin!=""){
	skin.href=thisskin;
}else{
	skin.href="";
	   var value = $("#oneShang").attr("class");
	   $("#oneShang").removeClass(value);
	   document.getElementById("oneShang").setAttribute("class","header-section");
	   
	   var value2 = $("#oneXia").attr("class");
       $("#oneXia").removeClass(value2);
	   document.getElementById("oneXia").setAttribute("class","logo dark-logo-bg hidden-xs hidden-sm");
}  

function changecss(url){
     if(url!=""){
    	   //一号
    	   if(url == '/css/view_show/layout-theme-one.css'){
    		   var value = $("#oneShang").attr("class");
    		   $("#oneShang").removeClass(value);
 			   document.getElementById("oneShang").setAttribute("class","header-section");
 			   
    		   var value2 = $("#oneXia").attr("class");
    		   $("#oneXia").removeClass(value2);
 			   document.getElementById("oneXia").setAttribute("class","logo theme-logo-bg hidden-xs hidden-sm");
    	   }
    	 //二号
    	   if(url == '/css/view_show/layout-theme-two.css'){
    		   var value = $("#oneShang").attr("class");
    		   $("#oneShang").removeClass(value);
 			   document.getElementById("oneShang").setAttribute("class","header-section bg-danger light-color");
 			   
 			   var value2 = $("#oneXia").attr("class");
   		       $("#oneXia").removeClass(value2);
			   document.getElementById("oneXia").setAttribute("class","logo theme-logo-bg hidden-xs hidden-sm");
    	   }
    	 //三号
    	   if(url == '/css/view_show/layout-theme-three.css'){
    		   var value = $("#oneShang").attr("class");
    		   $("#oneShang").removeClass(value);
 			   document.getElementById("oneShang").setAttribute("class","header-section");
 			   
 			   var value2 = $("#oneXia").attr("class");
   		       $("#oneXia").removeClass(value);
			   document.getElementById("oneXia").setAttribute("class","logo bg-danger hidden-xs hidden-sm");
    	   }
    	 //四号
    	   if(url == '/css/view_show/layout-theme-four.css'){
    		   var value = $("#oneShang").attr("class");
    		   $("#oneShang").removeClass(value);
 			   document.getElementById("oneShang").setAttribute("class","header-section bg-info light-color");
 			   
 			   var value2 = $("#oneXia").attr("class");
   		       $("#oneXia").removeClass(value2);
			   document.getElementById("oneXia").setAttribute("class","logo bg-info hidden-xs hidden-sm");
    	   }
    	   if(url == ' '){
    		   var value = $("#oneShang").attr("class");
    		   $("#oneShang").removeClass(value);
    		   document.getElementById("oneShang").setAttribute("class","header-section");
    		   
    		   var value2 = $("#oneXia").attr("class");
    	       $("#oneXia").removeClass(value2);
    		   document.getElementById("oneXia").setAttribute("class","logo dark-logo-bg hidden-xs hidden-sm");
    	   }
           skin.href=url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30)); //以下设置COOKIES时间为1年,自己随便设置该时间..
           SetCookie("now_skin",url,expdate,"/",null,false);
     }
}