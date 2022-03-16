//체크박스에 이름 넣는다.
function showChkBox() {
	$.ajax({
		type: "POST",
		url: "/showUser",
		success: function(data) {

			for (var i = 0; i < data.length; i++) {
				var tex = $('#tex');
				var texChk = data[i].nm;

				tex.append("<div class='form-check-inline'><input style='margin-right: 0.25em;' class='form-check-input' type='checkbox' id='checkbox" + data[i].id + "' value='" + data[i].id + "' name='" + "checkBox" + "' /><label class='form-check-label' for='checkbox" + data[i].id + "'>" + texChk + "</label></div>");
				$('#authorNew').append("<option value='"+data[i].nm+"'>"+data[i].nm+"</option>");
			}
			
			setTimeout(function(){
				if(getCookie('userName') == '' || getCookie('userName') == null || getCookie('userName') == 'undefined'){
					$('#authorNew').append('<option value="0" selected disabled>선택해주세요</option>');
				} else {
					$('#authorNew').val(getCookie('userName'));
				}
			}, 100);
			
			
			
		}, error(xhr, error, status) {
			alert('function showChkBox() error : ' + error);
		}
	});
}

function showChkBoxTwo(author) {
	$.ajax({
		type: "POST",
		url: "/showUser",
		success: function(data) {
			var tex = $('#tex_two');
			for (var i = 0; i < data.length; i++) {
				var texChk = data[i].nm;

				tex.append("<div class='form-check-inline'><input style='margin-right: 0.25em;' class='form-check-input' type='checkbox' id='checkbox" + data[i].id + "' value='" + data[i].id + "' name='" + "checkBox2" + "' /><label class='form-check-label' for='checkbox" + data[i].id + "'>" + texChk + "</label></div>");
				$('#authorEdit').append("<option value='"+data[i].nm+"'>"+data[i].nm+"</option>");
			}//for문 끝
			console.log(author);
			$('#authorEdit').val(author).attr('selected', 'selected');
			
			checkboxFunc2();
		}, error(xhr, error, status) {
			alert('function showChkBoxTwo() error : ' + error);
		}
	});
}

function showChkBoxThree(id) {
	$.ajax({
		type: "POST",
		url: "/showUser",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {

				var tex = $('#tex_two');
				var texChk = data[i].nm;

				tex.append("<div class='form-check form-check-inline'><input class='form-check-input' type='checkbox' id='checkbox" + data[i].id + "' value='" + data[i].id + "' name='" + "checkBox" + "' /><label class='form-check-label' for='checkbox" + data[i].id + "'>" + texChk + "</label></div>");
				$('#authorEdit').append("<option value='"+data[i].nm+"'>"+data[i].nm+"</option>");
			}//for문 끝
			checkboxFunc3(id);
		}, error(xhr, error, status) {
			alert('function showChkBoxThree() error : ' + error);
		}
	});

	$.ajax({
		type:"POST",
		url:"/author",
		data:{id:id},
		success:function(data){
			console.log(data.author);
			var author = data.author;
			$('#authorEdit').val(author).attr('selected', 'selected');
		},error(xhr, error, status){
			alert('등록자를 등록해주세요');
		}

	});
}


function checkboxFunc() {
	var checkBox = $('input[name="checkBox"]');
//				console.log('checkBox -> ' + checkBox);
//				console.log('checkboxFunc id = ' + id);
	for (var i = 0; i < checkBox.length; i++) {
		//		console.log('checkBox['+i+'] -> ' + checkBox[i].value);
	}

	$.ajax({
		url: "/modiChk",
		type: "POST",
		data: { id: id },
		success: function(data) {
			//			console.log('ajax data : ' + data);

			for (var i = 0; i < checkBox.length; i++) {
				//				console.log(checkBox[i].value);
				for (var j = 0; j < data.length; j++) {
					var c_user_id = data[j].c_user_id;
					if (checkBox[i].value == c_user_id) {
						//						console.log(checkBox[i]);
						checkBox[i].checked = true;
					}
				}
			}
		}, error(xhr, error, status) {
			//안넣었음
		}
	});
}

function checkboxFunc2() {
	var checkBox2 = $('input[name="checkBox2"]');
//				console.log('checkBox -> ' + checkBox);
//				console.log('checkboxFunc id = ' + id);
	for (var i = 0; i < checkBox2.length; i++) {
		//		console.log('checkBox2['+i+'] -> ' + checkBox2[i].value);
	}

	$.ajax({
		url: "/modiChk",
		type: "POST",
		data: { id: id },
		success: function(data) {
			//			console.log('ajax data : ' + data);

			for (var i = 0; i < checkBox2.length; i++) {
				//				console.log(checkBox2[i].value);
				for (var j = 0; j < data.length; j++) {
					var c_user_id = data[j].c_user_id;
					if (checkBox2[i].value == c_user_id) {
						//						console.log(checkBox[i]);
						checkBox2[i].checked = true;
					}
				}
			}
		}, error(xhr, error, status) {
			//안넣었음
		}
	});
}

function checkboxFunc3(id) {
	var checkBox = $('input[name="checkBox"]');
	for (var i = 0; i < checkBox.length; i++) {
	}

	$.ajax({
		url: "/modiChk",
		type: "POST",
		data: { id: id },
		success: function(data) {

			for (var i = 0; i < checkBox.length; i++) {
				for (var j = 0; j < data.length; j++) {
					var c_user_id = data[j].c_user_id;
					if (checkBox[i].value == c_user_id) {
						checkBox[i].checked = true;
					}
				}
			}
		}, error(xhr, error, status) {
			//안넣었음
		}
	});
}
