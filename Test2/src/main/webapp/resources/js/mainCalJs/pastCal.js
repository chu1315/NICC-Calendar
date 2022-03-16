

// 캘린더 좌측 기간이 지난 미완료 일정에서 각개 클릭 시
function detailPastCal(cal_id) {
	$('#modiModal').modal('show');
	$('#tex_two').empty();
	$('#authorEdit').empty();
	
	
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
		url: "/detailPastCal",
		data: {
			id: cal_id
		},
		success: function(data) {
			showChkBoxThree(cal_id);
			$('#latlongId').val(data.id);
			for (var i = 0; i < dataSuccess.length; i++) {
				//				console.log('dataSuccess : ' + dataSuccess[i].id);
			}
		
			$('#modiMemo').val(data.title);
			
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
			

			var dataEnd = data.end.split(' ');
			//				console.log('dateEnd : ' + dataEnd);
			var datePicker = dataEnd[0];
			//				console.log('datePicker : ' + datePicker);
			//추가 부분 0 substr
			var end = dataEnd[1].substr(0, 5);

			//				console.log('end : ' + end);
			var start = data.start.substr(0, 10);
			var chkSuccess = data.chkSuccess;
			var chkEndStart = $('input[name="checkBtn"]');

			if (chkSuccess == 'Y') {
				//					console.log(chkEndStart[0]);
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
			$('#testChk').val(chkSuccess);
			$('#datePicker_end').val(datePicker);
			$('#end_two').val(end);
			$('#datePicker_start').val(start);
			$('#modiContent').val(data.content);
			$('#modiColor').val(data.color);

		}, error(xhr, error, status) {
			alert('latlong error : ' + error);
		}
	});
}