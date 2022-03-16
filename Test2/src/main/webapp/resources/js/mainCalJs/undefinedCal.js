//미정일정 삭제 할 때 empty했다가 다시 목록 생성되게 해준다.
function showUndefined() {
	$('#tbodyId').empty();
	$.ajax({
		type: "GET",
		url: "/undefinedInsertView",
		success: function(data) {
			var tbodyId = $('#tbodyId');
			for (var i = 0; i < data.length; i++) {
				tbodyId.append('<tr><td class="undefinedIn">' + '• ' + '<a href="#" id=' + data[i].id + ' onclick="detailUndefined(this.id)">' + data[i].title + '</a>' + '<a href="#" id=' + data[i].id + ' class="btn btn-sm text-danger ml-2" onclick="deleteUndefinedCalendar(this.id)">' + '<i class="xi-trash mr-1"></i>' + '삭제' + '</a></td>');
			}
		},
		error: function(xhr, error, status) {
			alert('/undefinedInsertView error : ' + error);
		}
	});
}
// 왼쪽에 미정에서 삭제 눌렀을 경우
function deleteUndefinedCalendar(id) {
	if (confirm("삭제하시겠습니까?")) {
		$.ajax({
			type: "POST",
			url: "/del",
			data: { id: id },
			success: function() {
				showUndefined();
			},
			error: function(xhr, error, status) {
				alert('/del error : ' + error);
			}
		});
	}
}

// 미정일정 불러오는 function
function detailUndefined(id) {
	$('#modiModal').modal('show');
	$('#latlongId').val(id);
	$('#authorEdit').empty();
	$('#tex_two').empty();

	showChkBoxThree(id);
	
	//radio버튼 체크해제
	var modiTeamArray = new Array();
	modiTeamArray = document.getElementsByName('modiRadioTeam');
	
	for(var i = 0; i < modiTeamArray.length; i++){
			modiTeamArray[i].checked = false;
	}
	$('#modiTeam').val('');
	
	var radioArray = new Array();
	radioArray = document.getElementsByName('radioNm');

	for (var i = 0; i < radioArray.length; i++) {
		radioArray[i].checked = false;
		
	}
	$('#color').val('');
	//해제 끝

	$('#checkBtn').change(function() {
		if ($('#checkBtn').is(':checked')) {
			$('#testChk').val('Y');
		} else {
			$('#testChk').val('N');
		}
	});

	$('#undefinedCheckBtn').change(function() {
		if ($('#undefinedCheckBtn').is(':checked')) {
			$('#undefinedTestChk').val('Y');
		} else {
			$('#undefinedTestChk').val('N');
		}
	});

	$.ajax({
		type: "POST",
		url: "/latlong",
		data: { id: id },
		success: function(data) {
			for (var i = 0; i < dataSuccess.length; i++) {
				//							console.log('dataSuccess : ' + dataSuccess[i].id);
			}
			
			$('#modiMemo').val(data.title);

			var dataEnd = data.end.split(' ');
			//						console.log('dateEnd : ' + dataEnd);
			var datePicker = dataEnd[0];
			//						console.log('datePicker : ' + datePicker);
			//추가 부분 0 substr
			var end = dataEnd[1].substr(0, 5);

			//						console.log('end : ' + end);
			var start = data.start.substr(0,10);
			var chkSuccess = data.chkSuccess;
			var chkEndStart = $('input[name="checkBtn"]');

			if (chkSuccess == 'Y') {
				//							console.log(chkEndStart[0]);
				chkEndStart[0].checked = true;
			} else {
				chkEndStart[0].checked = false;
			}

			var undefinedChk = data.undefinedChk;
			var chkUndefined = $('input[name="undefinedBtn"]');
			if (undefinedChk == 'Y') {
				chkUndefined[0].checked = true;
				$('#undefinedTestChk').val('Y');
			} else {
				chkUndefined[0].checked = false;
			}

			var modiRadioNm = new Array();
			modiRadioNm = document.getElementsByName('modiRadioNm');

			for (var i = 0; i < modiRadioNm.length; i++) {
				if (data.color == modiRadioNm[i].value) {
					modiRadioNm[i].checked = true;
					console.log('modiRadioNm checked이후 : ' + modiRadioNm[i].checked);
				} else {
					modiRadioNm[i].checked = false;
				}
			}
			
			$('input[name="modiRadioTeam"]').change(function(){
				$('#modiTeam').val($(this).val());
			});
			
			var modiTeamArray = new Array();
			modiTeamArray = document.getElementsByName('modiRadioTeam');
			
			for(var i = 0; i < modiTeamArray.length; i++){
				if(data.team == modiTeamArray[i].value){
					modiTeamArray[i].checked = true;
					$('#modiTeam').val(data.team);
				} else {
					modiTeamArray[i].checked = false;
				}
			}
			
			$('#testChk').val(chkSuccess);
			$('#datePicker_end').val(datePicker);
			$('#end_two').val(end);
			$('#datePicker_start').val(start);

			$('#modiContent').val(data.content);
			$('#modiColor').val(data.color);
		},
		error: function(xhr, error, status) {
			alert('/latlong error : ' + error);
		}
	});
}
