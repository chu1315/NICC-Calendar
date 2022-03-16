var chkCookie = false;
$(document).ready(function(){
	document.getElementById('userId').focus();
});

function goCal(){
console.log(chkCookie);
	$.ajax({
		url:'/calendar',
		type:'post',
		data:{
			userId:$('.userId').val(),
			userPw:$('.userPw').val(),
			chkCookie:chkCookie
		},
		success:function(data){
			console.log(data);
			if(data == 3){
				location.href = "calendar";
			} else {
				$('.msg').text('아이디 또는 패스워드가 일치하지 않습니다');
			}
		}
	});
}

$('body').keypress(function(e){
	if(e.keyCode === 13){
		goCal();
	}
})

$('#autoLoginChk').change(function(){
	if($('#autoLoginChk').is(':checked')){
		console.log('체크');
		chkCookie=true;
	} else {
		console.log('해제');
		chkCookie=false;
	}
});