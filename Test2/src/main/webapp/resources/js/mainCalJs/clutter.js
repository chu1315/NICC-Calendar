$(document).on("click", ".fc-next-button", function() {
	deleteMemo();
});

$(document).on("click", ".fc-prev-button", function() {
	deleteMemo();
});
// today는 click이벤트로 안되서 fullcalendar main.js를 건들임.

// 완료된 메모들 회색 삭선 처리해주는 function
function deleteMemo() {
	setTimeout(function() {
		document.getElementsByClassName('fc-myCustomButton-button')[0].click();
	}, 1000);
}


//modal에서 취소를 누르면 modal을 hide시킨다.
function cancel() {
	$('#datePicker').val('');
	$('#end').val('');
	//			$('#tex').empty();
	$('#testModal').modal('hide');
}

// 수정 modal에서 취소 누를 시 hide
function modiCancel() {
	$('#tex_two').empty();
	$('#modiModal').modal('hide');
}


function showFilterModal() {
	$('#filterModal').modal('show');
}

// 완료된 일정들 색상 변경
function ready() {
	console.log('빗금');
	var length = $('.fc-daygrid-event-harness').length;
	var harness = new Array();
	var harnessChildColor = new Array();

	for (var i = 0; i < length; i++) {
		harness.push($('.fc-daygrid-event-harness')[i]);
		var style = $(harness[i]).children().attr('style'); // 긴 애들
		var styleSecond = $(harness[i]).children().children().attr('style'); // 작은애들 -> dot

		if (style == 'border-color: rgb(64, 64, 64); background-color: rgb(64, 64, 64);') {
			$(harness[i]).children().attr('style', 'border-color: rgb(209, 209, 209); background-color: rgb(209, 209, 209);')
			$(harness[i]).children().children().children().children().children().attr('style', 'border-color: rgb(209, 209, 209); background-color: rgb(209, 209, 209);text-decoration:line-through; color:gray;')
			
		} else if (styleSecond == 'border-color: rgb(64, 64, 64);') {
			$(harness[i]).children().children().attr('style', 'border-color:rgb(209, 209, 209);');
			$(harness[i]).children().children().last().attr('style', 'text-decoration:line-through; color:#c2c2c2;');
		}
	}
}

// 메모에 등록될 color색
function changeColor(color) {
	$('#color').val(color);
	$('#modiColor').val(color);
}


