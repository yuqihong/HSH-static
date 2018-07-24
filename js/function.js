
function CheckAll(form){
	for(var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		if(e.name != 'chkall' && e.type !='radio')
		e.checked = form.chkall.checked; 
	}
}