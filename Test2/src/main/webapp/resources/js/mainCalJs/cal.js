function getParam(sname) {
	var params = location.search.substr(location.search.indexOf("?") + 1);
	var sval = "";
	params = params.split("&");
	for (var i = 0; i < params.length; i++) {
		temp = params[i].split("=");
		if ([temp[0]] == sname) { sval = temp[1]; }
	}
	return sval;
}

if (getParam("refresh") == "true") {
	setInterval(refreshPage, 300000);
	console.log("새로고침 자동모드(5분주기)");
} else {
	console.log("새로고침 수동모드");
}

function refreshPage() {
	location.reload();
}

function Mobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getCookie(name) {
     var nameOfCookie = name + "=";
     var x = 0;
     while (x <= document.cookie.length) { 
          var y = (x + nameOfCookie.length);
          if (document.cookie.substring(x, y) == nameOfCookie) {
               if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                    endOfCookie = document.cookie.length; 
               return unescape(document.cookie.substring(y, endOfCookie)); 
          }
          x = document.cookie.indexOf(" ", x) + 1;
          if (x == 0) 
               break;
     }
     return "";
}


var today;
var id;
var today2;

function undefinedTable(today2){
	$('#tbodyId2').empty();
	$.ajax({
		type: "GET",
		url: "/pastCal",
		data: { today: today2 },
		success: function(data) {
			var tbodyId2 = $('#tbodyId2');
		
			for (var i = 0; i < data.length; i++) {
				if (!(data[i].nm)) { //'', null, undefined, 0, NaN == false
					data[i].nm = '';
					tbodyId2.append('<tr>' + '<td class="pastCal" style="font-size:10pt;" ' + 'id=' + data[i].id + ' onclick="detailPastCal(this.id)">' + '<span class="badge bg-dark">' + data[i].start.substr(0, 10) + '</span>' + '<strong class="text-primary"><span class="xi-user mr-1"></span>' + data[i].author + '</strong><br>' + data[i].title + '</tr>');
				} else {
					tbodyId2.append('<tr>' + '<td class="pastCal" style="font-size:10pt;" ' + 'id=' + data[i].id + ' onclick="detailPastCal(this.id)">' + '<span class="badge bg-dark">' + data[i].start.substr(0, 10) + '</span>' + ' <strong class="text-primary"><span class="xi-user mr-1"></span>' + data[i].author + ',' + data[i].nm + '</strong><br>' + data[i].title + '</tr>');
				}
			}
		},
		error(xhr, error, status) {
			alert('/pastCal error : ' + error);
		}
	});
}

function noDateTable(){
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

$(document).ready(function() {
	var userName = getCookie('userName');
	if(userName == '') {
		$('#userName').html('표출모드');	
	} else {
		$('#userName').html(userName + ' 님');	
	}
	
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1;
	// 오늘 날짜를 보여주기 위해서 넣음
	var date = nowDate.getDate();
	// 기간 지난 일정은 오늘 이전 이므로 -1해서 넣어줌
	var date2 = nowDate.getDate() - 1;
	today = year + '년 ' + month + '월 ' + date + '일';
	today2 = year + '-' + month + '-' + date2;
	$('#pastText').html(today);
	undefinedTable(today2);
	noDateTable();
	calendarRender();

	var checkArray = new Array();
//	$('input[name="filterCheck"]').change(function(){
//		if(this.checked){
//			$(this).attr("checked", "checked");
//			checkArray.push(this.value);
//		} else {
//			$(this).removeAttr("checked");
//			for(var i = 0; i < checkArray.length; i++){
//				if(checkArray[i] == this.value){
//					checkArray.splice(i, 1);
//				}
//			}
//		}
//		console.log(checkArray);
		$(document).on("click", "#filterOkay", function(){
			checkArray = new Array();
			$('input[name=filterCheck]:checked').each(function(){
				console.log($(this).val());
				checkArray.push($(this).val());
			});
			
			$('input[name=filterCheck2]:checked').each(function(){
//				console.log($(this).val());
				checkArray.push($(this).val());
			});
			
//			console.log('filter On');
//			console.log(checkArray);
			filterOkay(checkArray);
		});
		$(document).on("click", "#filterAll", function(){
			$('input[name="filterCheck"]').prop('checked', false);
			$('input[name="filterCheck2"]').prop('checked', false);
			checkArray = new Array();
//			console.log(checkArray);
//			console.log('filter Off');
			calendarRender();
		});
//	});

	var chkArray = new Array();
	$('input[name=filterCheck]:checked').each(function(){
		chkArray.push($(this).val());
	});
//	console.log(chkArray);
	

}) // document.ready

function filterOkay(checkArray){
	$('#authorNew').empty();
	if(checkArray.length == 0){
		calendar.refetchEvents();
	} else if(checkArray.length != 0){
		calendarRenderTwo(checkArray);
	}
}

$('body').on("click", ".dropdown-menu", function (e) {
//    $(this).parent().is(".open") && e.stopPropagation();
var events = $._data(document, 'events') || {};
    events = events.click || [];
    for(var i = 0; i < events.length; i++) {
        if(events[i].selector) {

            //Check if the clicked element matches the event selector
            if($(event.target).is(events[i].selector)) {
                events[i].handler.call(event.target, event);
            }

            // Check if any of the clicked element parents matches the 
            // delegated event selector (Emulating propagation)
            $(event.target).parents(events[i].selector).each(function(){
                events[i].handler.call(this, event);
            });
        }
    }
    event.stopPropagation(); //Always stop propagation
});

// 페이지 로드
var title;
var start;
var id;
var color;
var text;
var dataSuccess;
var tempTitle;
var calendar;
function calendarRender() {
		$('#tex').empty();
		showChkBox();
		// FullCalendar를 만들면서 값을 받아온다.
		var calendarEl = document.getElementById('calendar');
	
		calendar = new FullCalendar.Calendar(calendarEl, {
			googleCalendarApiKey: 'AIzaSyBbRC35AHpuKCMnPyWoxcmKl0SQ24zh62s',
//			initialView: 'dayGridWeek',
			displayEventTime: false, // 시간 표출 안함
			locale: 'ko', // 언어 한국어
			dayMaxEventRows: 5,
			fixedWeekCount:false,
			longPressDelay:1000,
			eventLongPressDelay:1000,
			selectLongPressDelay:1000,
			selectable:true,
			editable:true,
			eventDidMount:function(info){
//			console.log(info);
				if(Mobile()){
//					console.log('모바일');
					$('#calendar-container').tooltip('disable');
				} else {
					var description;
					var titleContent;
					if(info.event.extendedProps.nm == null || info.event.extendedProps.nm == '') {
						description = '-';
					} else {
						description = info.event.extendedProps.nm;
//						info.event.extendedProps.author + ',' + 
					}
					
					if(info.event.extendedProps.content == null || info.event.extendedProps.content == ''){
						titleContent = '-';
					} else {
						titleContent = '\n' + info.event.extendedProps.content;
					}
					$(info.el).tooltip({
						title : '▶ [일정] ' + info.event.extendedProps.tt + ' \n▶ [참여] ' + description + ' \n▶ [내용] ' + titleContent,
						placement : 'left',
						trigger:'hover',
						container:'body',
						delay: { "show": 100, "hide": 100 }
					});
					
	//				info.el.title='일정 : ' + info.event.title + ' \n업무참여인원 : ' + description + '\n업무내용 : ' + titleContent;
	//				$('[data-toggle="tooltip"]').tooltip(info.el.title + info.event.extendedProps.nm);
				}
			},
			eventDrop:function(info, delta, reverFunc, ui){
				if(confirm('일정을 변경하시겠습니까?')==true){
					$('input:checkbox[name="checkBox"]').prop("checked", false);
					id = info.event.id; // 전역변수 id에 내가 클릭한 일정의 id값을 넣어서 활용할 생각.
					$('#authorEdit').empty();
					$('#tex_two').empty();
					
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
			
			
					document.getElementById('modiContent').value = content;
					document.getElementById('modiColor').value = color;
					
					var cc = $(this).children().attr('style');
					$('.fc-daygrid-event').removeAttr('href');
				
					if (id.length>20) {
						alert(info.event.title + '은(는) 공휴일 입니다');
						info.revert();
						return false;
					} else {
						$('#modiModal').modal('show');
						$('#modiMemo').val(title);
				
				//		위도 경도 불러오기 ajax
						$.ajax({
							type: "POST",
							url: "/latlong",
							data: { id: id },
							success: function(data) {
//								checkboxFunc();
								showChkBoxTwo(data.author);
								
								data.start=info.event.startStr.substr(0, 10);
								
								$('#modiMemo').val(data.title);
								$('#modiContent').val(data.content);
								$('#testChk').val(chkSuccess);
								$('#datePicker_start').val(data.start);
								$('#modiColor').val(data.color);
								
								var endAndTime = data.end;
								var end = info.event.endStr.substr(0, 10);
								$('#datePicker_end').val(end);
								var pickerEnd = endAndTime.substr(11, 5);
								$('#end_two').val(pickerEnd);
//								console.log(data.chkSuccess);
								$('#testChk').val(data.chkSuccess);
								var chkSuccess = data.chkSuccess;
								var chkEndStart = $('input[name="checkBtn"]');
//								console.log(data.start);
//								console.log(end);
				
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
										//							console.log('modiRadioNm checked이후 : ' + modiRadioNm[i].checked);
									} else {
										modiRadioNm[i].checked = false;
									}
								}
								$('#modiTeam').val(data.team);
								$('input[name="modiRadioTeam"]').change(function(){
									$('#modiTeam').val($(this).val());
								});
								
								var modiTeamArray = new Array();
								modiTeamArray = document.getElementsByName('modiRadioTeam');
								
								for(var i = 0; i < modiTeamArray.length; i++){
									if(data.team == modiTeamArray[i].value){
										modiTeamArray[i].checked = true;
									} else {
										modiTeamArray[i].checked = false;
									}
								}	
							}, 
							error:function(xhr, status, error){
								console.log('/latlong Error : ' + error);
							}
						});
					$('#modiModal').modal('show');
					$('#modiMemo').val(title);
					}
					
					$('#modiModal').on('hide.bs.modal', function(){
						$('#tex').empty;
						calendar.refetchEvents();
					});
				} else {
					info.revert();
				}
			
			},
			showNonCurrentDates:false, // 그 전 그 후 달의 일정 안보기
			height: "100%", // 캘린더 height값 100%
			select:function(start, end, jsEvent, view){
//				console.log('select');
				$('#datePicker_start_in').val(start.startStr);
				
				var dateDate = new Date(start.endStr);
				dateDate.setDate(dateDate.getDate() - 1);
				var endDateMonth = dateDate.getMonth() + 1;
				var endDateDate = dateDate.getDate();
				
				if(endDateMonth < 10) {
					endDateMonth = '0' + endDateMonth;
				}
				
				if(endDateDate < 10) {
					endDateDate = '0' + endDateDate;
				}
				var endDateValue = (dateDate.getFullYear()) + '-' + (endDateMonth) + '-' + (endDateDate);
				
				$('#datePicker').val(endDateValue);
				$('#testModal').modal('show');
				
				
				// 미정 일정으로 체크한 경우 Y 나머지 N
				$('#checkBtn2').change(function() {
					if ($('#checkBtn2').is(':checked')) {
						var checkBtnYN = 'Y';
						$('#testChk2').val(checkBtnYN);
					} else {
						var checkBtnYN = 'N';
						$('#testChk2').val(checkBtnYN);
					}
				});
				
				//radio버튼 체크해제
				var radioArray = new Array();
				radioArray = document.getElementsByName('radioNm');
		
				for (var i = 0; i < radioArray.length; i++) {
					radioArray[i].checked = false;
				}
				$('#color').val('');
				//해제 끝
				
				$('#radioE').prop('checked',true);
				$('#color').val('#e6bb00');
								
				$('input[name="radioTeam"]').change(function(){
					$('#team').val($(this).val());
				});
			},
			events: function(info, successCallback, failureCallback) {
				$.ajax({
					type: "GET",
					url: "/event",
					dataType: "json", // data
					success: function(data) {
						dataSuccess = data;
						for (var i = 0; i < data.length; i++) {
							//등록자 나오는 title
							var tempTitle = data[i].title;
							if (data[i].nm) {
								var nmSplit = data[i].nm.split(',');
								var person = nmSplit.length;
								
								if (person > 0) {
									data[i].title = '[' + data[i].author + ' 외 ' + person + '명] ' + data[i].title;
								}
								if(data[i].author == null || data[i].author == ''){
									var splitNm = data[i].nm.split(',');
									
									data[i].title = '[' + splitNm[0] + ' 외 ' + (person-1) + '명] ' + tempTitle;
									
									if(person - 1 == 0){
										data[i].title = '[' + splitNm[0] + '] ' + tempTitle;
									}
								}
	
							} else if(!(data[i].nm)){
								data[i].title = '[' + data[i].author + '] ' + data[i].title;
							}
							
							if((data[i].nm == null || data[i].nm == '') && (data[i].author == null || data[i].author == '')){
								data[i].title = tempTitle;
							}
							data[i].tt = tempTitle;
						}
						successCallback(data);
	
					},
					error: function(xhr, error, status) {
						alert('/event : ' + error + '달력을 불러오는데 실패했습니다');
					}
				});
			},
			eventClick: function(info) {
//				console.log("eventClick");
				$('input:checkbox[name="checkBox"]').prop("checked", false);
				id = info.event.id; // 전역변수 id에 내가 클릭한 일정의 id값을 넣어서 활용할 생각.
				$('#authorEdit').empty();
				$('#tex_two').empty();
				
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
		
		
				document.getElementById('modiContent').value = content;
				document.getElementById('modiColor').value = color;
				
				var cc = $(this).children().attr('style');
				$('.fc-daygrid-event').removeAttr('href');
				if (id.length>20) {
					alert(info.event.title + '은(는) 공휴일 입니다');
					return false;
				} else {
					$('#modiModal').modal('show');
					$('#modiMemo').val(title);
			
			//		위도 경도 불러오기 ajax
					$.ajax({
						type: "POST",
						url: "/latlong",
						data: { id: id },
						success: function(data) {
							showChkBoxTwo(data.author);
							checkboxFunc2();
							
							data.start=data.start.substr(0, 10);
							
							$('#modiMemo').val(data.title);
							$('#modiContent').val(data.content);
							$('#testChk').val(chkSuccess);
							$('#datePicker_start').val(data.start);
							$('#modiColor').val(data.color);
							
							var endAndTime = data.end;
							var end = endAndTime.substr(0, 10);
							$('#datePicker_end').val(end);
							var pickerEnd = endAndTime.substr(11, 5);
							$('#end_two').val(pickerEnd);
//							console.log(data.chkSuccess);
							$('#testChk').val(data.chkSuccess);
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
								} else {
									modiRadioNm[i].checked = false;
								}
							}
							$('#modiTeam').val(data.team);
							$('input[name="modiRadioTeam"]').change(function(){
								$('#modiTeam').val($(this).val());
							});
							
							var modiTeamArray = new Array();
							modiTeamArray = document.getElementsByName('modiRadioTeam');
							
							for(var i = 0; i < modiTeamArray.length; i++){
								if(data.team == modiTeamArray[i].value){
									modiTeamArray[i].checked = true;
								} else {
									modiTeamArray[i].checked = false;
								}
							}	
						}, 
						error:function(xhr, status, error){
							console.log('/latlong Error : ' + error);
						}
					});
				}
			},
			customButtons: {
				myCustomButton: {
					text: 'hide',
					click: function() {
						ready();
					},
				},
				myCustomButton2:{
					text:'주별',
					click:function(){
						calendar.changeView('dayGridWeek');
						deleteMemo();
					},
				},
				myCustomButton3:{
					text:'월별',
					click:function(){
						calendar.changeView('dayGridMonth');
						deleteMemo();
					},
				},
			},
			dateClick:function(date, jsEvent, view){
				$('#testModal').modal('show');
//				console.log("dateClick");
				$('#datePicker_start_in').val(date.dateStr);
				$('#datePicker').val(date.dateStr);
//				$('#tex').empty();
//				showChkBox();
			},
			views:{
				week:{
					displayEventTime: false, // 시간 표출 안함
					locale: 'ko', // 언어 한국어
					dayMaxEventRows: 30,
					fixedWeekCount:false,
					showNonCurrentDates:false, // 그 전 그 후 달의 일정 안보기
					height: "100%",
				}
			},
			headerToolbar: {
				right: 'today myCustomButton2,myCustomButton3 prev,next,myCustomButton'
			},
			eventSources: [
				{
					googleCalendarId: 'qduatr3seur835pk4aolok2900@group.calendar.google.com',
					className: 'ko_event',
					textColor: 'red',
					color: 'beige',
					borderColor: 'white'
				}
			]
		});
		calendar.render();
		deleteMemo();
		
}

//filter했을 경우
function calendarRenderTwo(checkArray){
		$('#tex').empty();
		showChkBox();
		var calendarEl = document.getElementById('calendar');
		calendar = new FullCalendar.Calendar(calendarEl, {
			googleCalendarApiKey: 'AIzaSyBbRC35AHpuKCMnPyWoxcmKl0SQ24zh62s',
			displayEventTime: false, // 시간 표출 안함
			locale: 'ko', // 언어 한국어
			dayMaxEventRows: 5,
			selectable:true,
			longPressDelay: 1000,
			eventLongPressDelay:1000,
			selectLongPressDelay:1000,
			fixedWeekCount:false,
			showNonCurrentDates:false, // 그 전 그 후 달의 일정 안보기
			height: "100%", // 캘린더 height값 100%
			eventDidMount:function(info){
				if(Mobile()){
//					console.log('모바일');
					$('#calendar-container').tooltip('disable');
				} else {
					var description;
					var titleContent;
					if(info.event.extendedProps.nm == null || info.event.extendedProps.nm == '') {
						description = '-';
					} else {
						description = info.event.extendedProps.nm;
					}
					
					if(info.event.extendedProps.content == null || info.event.extendedProps.content == ''){
						titleContent = '-';
					} else {
						titleContent = '\n' + info.event.extendedProps.content;
					}
					
					$(info.el).tooltip({
						title : '▶ [일정] ' + info.event.extendedProps.tt + ' \n▶ [참여] ' + description + ' \n▶ [내용] ' + titleContent,
						placement : 'left',
						trigger:'hover',
						container:'body',
						delay: { "show": 100, "hide": 100 }
					});
					
	//				info.el.title='일정 : ' + info.event.title + ' \n업무참여인원 : ' + description + '\n업무내용 : ' + titleContent;
	//				$('[data-toggle="tooltip"]').tooltip(info.el.title + info.event.extendedProps.nm);
				}
			},
			select:function(start, end, jsEvent, view){
//				console.log('select');
				$('#datePicker_start_in').val(start.startStr);
				
				var dateDate = new Date(start.endStr);
				dateDate.setDate(dateDate.getDate() - 1);
				var endDateMonth = dateDate.getMonth() + 1;
				var endDateDate = dateDate.getDate();
				
				if(endDateMonth < 10) {
					endDateMonth = '0' + endDateMonth;
				}
				
				if(endDateDate < 10) {
					endDateDate = '0' + endDateDate;
				}
				var endDateValue = (dateDate.getFullYear()) + '-' + (endDateMonth) + '-' + (endDateDate);
				
				$('#datePicker').val(endDateValue);
				$('#testModal').modal('show');
				$('#memo').val('');
				$('#content').val('');
				$('#undefinedId').val('');
				$('#authorNew').empty(); // 등록창에서 계속 append되서 들어올때마다 empty 해줘야한다
//				$('#tex').empty();
//				showChkBoxTwo();

				$('#tex').empty();
				showChkBox();
				
				// 미정 일정으로 체크한 경우 Y 나머지 N
				$('#checkBtn2').change(function() {
					if ($('#checkBtn2').is(':checked')) {
						var checkBtnYN = 'Y';
						$('#testChk2').val(checkBtnYN);
					} else {
						var checkBtnYN = 'N';
						$('#testChk2').val(checkBtnYN);
					}
				});
				
				//radio버튼 체크해제
				var teamArray = new Array();
				teamArray = document.getElementsByName('radioTeam');
				
				for(var i = 0; i < teamArray.length; i++){
					teamArray[i].checked = false;
				}
				$('#team').val('');
				
				var radioArray = new Array();
				radioArray = document.getElementsByName('radioNm');
		
				for (var i = 0; i < radioArray.length; i++) {
					radioArray[i].checked = false;
				}
				$('#color').val('');
				//해제 끝
				
				$('#radioE').prop('checked',true);
				$('#color').val('#FFDC3C');
								
				$('input[name="radioTeam"]').change(function(){
					$('#team').val($(this).val());
				});
			},
			events: function(info, successCallback, failureCallback) {
				$.ajax({
					type: "GET",
					url: "/eventTwo",
					dataType: "json", // data
					data:{color:checkArray},
					success: function(data) {
						dataSuccess = data;
						for (var i = 0; i < data.length; i++) {
							//등록자 안나오는 title
//							if (data[i].nm) {
//								var nmSplit = data[i].nm.split(',');
//								var person = nmSplit.length - 1;
//								console.log(data[i].author);
//								if (person == 0) {
//									data[i].title = '[' + data[i].nm + '] ' + data[i].title;
//								} else if (person > 0) {
//									data[i].title = '[' + nmSplit[0] + ' 외 ' + person + '명] ' + data[i].title;
//								}
//	
//							} else {
//								data[i].title = data[i].title;
//							}

							//등록자 나오는 title
							var tempTitle = data[i].title;
							if (data[i].nm) {
								var nmSplit = data[i].nm.split(',');
								var person = nmSplit.length;
								
								if (person > 0) {
									data[i].title = '[' + data[i].author + ' 외 ' + person + '명] ' + data[i].title;
								}
								if(data[i].author == null || data[i].author == ''){
									var splitNm = data[i].nm.split(',');
									
									data[i].title = '[' + splitNm[0] + ' 외 ' + (person-1) + '명] ' + tempTitle;
									
									if(person - 1 == 0){
										data[i].title = '[' + splitNm[0] + '] ' + tempTitle;
									}
								}
	
							} else if(!(data[i].nm)){
								data[i].title = '[' + data[i].author + '] ' + data[i].title;
							}
							
							if((data[i].nm == null || data[i].nm == '') && (data[i].author == null || data[i].author == '')){
								data[i].title = tempTitle;
							}
							data[i].tt = tempTitle;
						}
						successCallback(data);
						
					},
					error: function(xhr, error, status) {
						alert('/eventTwo : ' + error + ' 달력을 불러오는데 실패했습니다');
					}
				});
			},
			eventClick: function(info) {
				$('input:checkbox[name="checkBox"]').prop("checked", false);
				id = info.event.id; // 전역변수 id에 내가 클릭한 일정의 id값을 넣어서 활용할 생각.
				$('#authorEdit').empty();
				$('#tex_two').empty();
		
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
		
		
				document.getElementById('modiContent').value = content;
				document.getElementById('modiColor').value = color;
				
				//	mapReload();
				var cc = $(this).children().attr('style');
				$('.fc-daygrid-event').removeAttr('href');
			
				if (cc == 'border-color: white; background-color: beige;') {
					alert('공휴일 입니다');
					return false;
				} else {
					$('#modiModal').modal('show');
					$('#modiMemo').val(title);
			
			//		위도 경도 불러오기 ajax
					$.ajax({
						type: "POST",
						url: "/latlong",
						data: { id: id },
						success: function(data) {
							checkboxFunc();
							showChkBoxTwo(data.author);
							
							data.start=data.start.substr(0, 10);
							
							$('#modiMemo').val(data.title);
							$('#modiContent').val(data.content);
							$('#testChk').val(chkSuccess);
							$('#datePicker_start').val(data.start);
							$('#modiColor').val(data.color);
							
							var endAndTime = data.end;
							var end = endAndTime.substr(0, 10);
							$('#datePicker_end').val(end);
							var pickerEnd = endAndTime.substr(11, 5);
							$('#end_two').val(pickerEnd);
//							console.log(data.chkSuccess);
							$('#testChk').val(data.chkSuccess);
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
									//							console.log('modiRadioNm checked이후 : ' + modiRadioNm[i].checked);
								} else {
									modiRadioNm[i].checked = false;
								}
							}
							$('#modiTeam').val(data.team);
							$('input[name="modiRadioTeam"]').change(function(){
								$('#modiTeam').val($(this).val());
							});
							
							var modiTeamArray = new Array();
							modiTeamArray = document.getElementsByName('modiRadioTeam');
							
							for(var i = 0; i < modiTeamArray.length; i++){
								if(data.team == modiTeamArray[i].value){
									modiTeamArray[i].checked = true;
								} else {
									modiTeamArray[i].checked = false;
								}
							}	
						}, 
						error:function(xhr, status, error){
							console.log('/latlong Error : ' + error);
						}
					});
				}
			},
			customButtons: {
				myCustomButton: {
					text: 'hide',
					click: function() {
						ready();
					},
				},
				myCustomButton2:{
					text:'주별',
					click:function(){
						calendar.changeView('dayGridWeek');
					},
				},
				myCustomButton3:{
					text:'월별',
					click:function(){
						calendar.changeView('dayGridMonth');
						deleteMemo();
					},
				},
			},
			dateClick:function(date, jsEvent, view){
				$('#testModal').modal('show');
//				console.log("dateClick");
				$('#datePicker_start_in').val(date.dateStr);
				$('#datePicker').val(date.dateStr);
			},
			views:{
				week:{
					displayEventTime: false, // 시간 표출 안함
					locale: 'ko', // 언어 한국어
					dayMaxEventRows: 30,
					fixedWeekCount:false,
					showNonCurrentDates:false, // 그 전 그 후 달의 일정 안보기
					height: "100%",
				}
			},
			headerToolbar: {
				right: 'today myCustomButton2,myCustomButton3 prev,next,myCustomButton'
			},
			eventSources: [
				{
					googleCalendarId: 'qduatr3seur835pk4aolok2900@group.calendar.google.com',
					className: 'ko_event',
					textColor: 'red',
					color: 'beige',
					borderColor: 'white'
				}
			]
		});
		calendar.render();
		deleteMemo();
}

function okay() {
	var team = $('#team').val();
	var author = $('#authorNew option:selected').val();
	var title = $('#memo').val();
	var start = $('#datePicker_start_in').val();
	var color = $('#color').val();
	var chkSuccess = 'N';
	var content = $('#content').val();
	// 마치는 시간 안적으면 18:00 마침으로 지정.
	var endTime = $('#end').val();
	if (endTime == '' || endTime == ' ') {
		$('#end').val('18:00');
	}
	var end = $('#datePicker').val() + ' ' + $('#end').val();
	var undefinedChk = $('#testChk2').val();
	var uid = $('#undefinedId').val();

	//색상 지정 안한 경우
	if (color == '') {
		color = '#9ba0a5';
	}

	if ($('#datePicker').val() == '') {
		$('#datePicker').val(start);
	}

	if ($('#datePicker_start_in').val() == '') {
		alert('시작일은 필수입니다.');
	}

	end = $('#datePicker').val() + ' ' + $('#end').val();

	//start
	var y = start.substr(0, 4);
	var m = start.substr(5, 2);
	var d = start.substr(8, 2);

	//end
	var y2 = $('#datePicker').val().substr(0, 4);
	var m2 = $('#datePicker').val().substr(5, 2);
	var d2 = $('#datePicker').val().substr(8, 2);

	var endDate = new Date(y2, m2, d2);
	var startDate = new Date(y, m, d);
	
//	$('input:checkbox[name="checkBox"]').prop("checked", false); 에러 발생
	
	var list = new Array();
	
	// 내일 구현해야할듯
	$('input:checkbox[name="checkBox"]').each(function() {
//		console.log(this);
		if (this.checked) {//checked 처리된 항목의 값	
//			console.log(this.value);
			list.push(this.value);
		}
	});
	
	if(title == '') {
		alert('일정 제목을 입력해주세요');
	} else if (endDate < startDate) {
		alert('끝나는 날짜가 시작 날짜를 앞설 수 없습니다.');
	} else if(author == 0 ||author == '' || author == null || author == 'undefined'){
		alert('등록자를 입력하여주세요');
	} else {
		
//		console.log('list : ' + list);
		if (list.length == 0) {
			list.push(0);
		}


		if (!title) {
			alert('캘린더에 적힐 메모를 적어주세요.');
		} else if (uid != '') {
			$.ajax({
				type: "POST",
				url: "/modal",
				data: {
					id: uid,
					title: title,
					start: start,
					color: color,
					end: end,
					content: content,
					undefinedChk: undefinedChk,
					list: list,
					author:author,
					team:team,
					chkSuccess: chkSuccess
				},
				success: function() {
					$('#testModal').modal('hide');
					calendar.refetchEvents();
					undefinedTable(today2);
					noDateTable();
				},
				error: function(xhr, error, status) {
					//alert('인원을 입력해주세요');
					$('#tex').show();
				}
			})
		} else {
			$.ajax({
				type: "POST",
				url: "/modal",
				data: {
					title: title,
					start: start,
					color: color,
					end: end,
					content: content,
					undefinedChk: undefinedChk,
					list: list,
					author:author,
					team:team,
					chkSuccess: chkSuccess
				},
				success: function() {
					$('#testModal').modal('hide');
					calendar.refetchEvents();
					undefinedTable(today2);
					noDateTable();
					
				},
				error: function(xhr, error, status) {
					//alert('인원을 입력해주세요');
					$('#tex').show();
				}
			})
		}
	}
}

// 삭제 누를 시 
function del() {
	if($('#latlongId').val() != '') {
		id = $('#latlongId').val();
//		console.log('if' + id);
	}else {
		id = id;
//		console.log('else' + id);
	}
	
	if (confirm("삭제하시겠습니까?")) {
		$.ajax({
			type: "POST",
			url: "/del",
			data: {
				id: id
			}, success: function() {
				$('#modiModal').modal('hide');
				calendar.refetchEvents();
				undefinedTable(today2);
				noDateTable();
			}, error: function(xhr, error, status) {
				alert('function del() error : ' + error);
			}
		});
	}
}

// 수정 눌렀을 경우
function modi() {
	
	var author = $('#authorEdit option:selected').val();
	var text = $('#modiMemo').val();
	color = $('#modiColor').val();
	content = $('#modiContent').val();
	end = $('#datePicker_end').val() + ' ' + $('#end_two').val();
	start = $('#datePicker_start').val();
	chkSuccessTwo = $('#testChk').val();
	var undefinedChk = $('#undefinedTestChk').val();
	var modiTeam = $('#modiTeam').val();
//	console.log(chkSuccessTwo);

//	console.log(undefinedChk);
	//start
	var y = start.substr(0, 4);
	var m = start.substr(5, 2);
	var d = start.substr(8, 2);

	//end
	var y2 = $('#datePicker_end').val().substr(0, 4);
	var m2 = $('#datePicker_end').val().substr(5, 2);
	var d2 = $('#datePicker_end').val().substr(8, 2);

	var endDate = new Date(y2, m2, d2);
	var startDate = new Date(y, m, d);
	var checkVal = new Array();
	
	$('input:checkbox[name="checkBox2"]').each(function() {
		if ($(this).is(":checked")) {//checked 처리된 항목의 값	
			checkVal.push(this.value);
//			console.log(this.value);
		}
	});
	
//	console.log('리스트 : ' + checkVal); //여기까진 들어감.
	list = _.uniq(checkVal);

	if (endDate < startDate) {
		alert('끝나는 날짜가 시작 날짜를 앞설 수 없습니다.');
	} else {

		if (list.length == 0) {
			list.push(0);
		}

		var latlongId = $('#latlongId').val();

		// 그냥 수정일 경우
		if (latlongId == '') {
			$.ajax({
				type: "POST",
				url: "/modi",
				data: {
					id: id,
					title: text,
					content: content,
					color: color,
					start: start,
					end: end,
					list: list,
					author:author,
					team:modiTeam,
					undefinedChk: undefinedChk,
					chkSuccess: chkSuccessTwo
				}, success: function() {
					$('#modiModal').modal('hide');
//					window.location.reload();
					calendar.refetchEvents();
					undefinedTable(today2);
					noDateTable();
					setTimeout(function(){
						ready();
					}, 1500);

				}, error: function(xhr, error, status) {
					alert('ajax /modi error : ' + error);
				}
			});
			// 미정 수정일 경우
		} else if (latlongId != '') {
			$.ajax({
				type: "POST",
				url: "/modi",
				data: {
					id: latlongId,
					title: text,
					content: content,
					color: color,
					start: start,
					end: end,
					list: list,
					author:author,
					team:modiTeam,
					undefinedChk: undefinedChk,
					chkSuccess: chkSuccessTwo
				}, success: function() {
					$('#modiModal').modal('hide');
					calendar.refetchEvents();
					undefinedTable(today2);
					noDateTable();
//					calendar.refetchEvents();

				}, error: function(xhr, error, status) {
					alert('ajax /modi error : ' + error);
				}
			});
		}
	}	
}		



$(document).on("click", ".fc-daygrid-more-link", function() {
	deleteMemo();
});

function logout(){
	$.ajax({
		url:'/logout',
		type:'post',
		success:function(){
			window.location.href = '/login';
		},
		error:function(error, status, xhr){
			console.log(error);
			console.log(xhr);
		}
	});
}

function changePwModal(){
	$('#changePwModal').modal('show');
	$('#changePwUserId').val(getCookie('userId'));
}

function changePwModalCancel(){
	$('#changePwModal').modal('hide');
}

$('#testModal').on('shown.bs.modal', function(){
	
});

$('#testModal').on('hidden.bs.modal', function(){
	$('#checkBtn2').prop('checked', false);
	$('#memo').val('');
	$('#content').val('');
	$('#undefinedId').val('');
	$('#authorNew').empty(); 
	$('#tex').empty();
	showChkBox();
});

$('#changePwModal').on('hidden.bs.modal', function(){
	$('#changePwUserId').val('');
	$('#changePwUserPw').val('');
	$('#changePwChangePw').val('');
	$('#changePwChangePw2').val('');
});

$('#changePwModal').on('shown.bs.modal', function(){
	document.getElementById('changePwUserPw').focus();
});

function changePw(){
	if($('#changePwUserId').val() == ''){
		alert('ID를 입력해주세요');
	} else if($('#changePwUserPw').val() == '') {
		alert('현재 PW를 입력해주세요');
	} else if($('#changePwChangePw').val() == ''){
		alert('변경할 PW를 입력해주세요');
	} else if($('#changePwChangePw2').val() == ''){
		alert('변경할 PW를 다시 입력해주세요');
	} else if($('#changePwChangePw').val() != $('#changePwChangePw2').val()){
		alert('변경할 PW가 일치하지 않습니다.');
	} else {
		console.log($('#changePwChangePw').val());
		$.ajax({
			type:'post',
			url:'/changePw',
			data:{
				userId:$('#changePwUserId').val(),
				userPw:$('#changePwUserPw').val(),
				changePw:$('#changePwChangePw').val()
			},
			success:function(data){
				if(data == 0){
					alert('일치하는 아이디가 없습니다');
				} else if(data == 2){
					alert('현재 패스워드가 다릅니다.');
				} else {
					alert('비밀번호가 변경되었습니다. 다시 로그인해주세요');
					logout();
				}
			},
			error:function(xhr, error, status){
				console.log(xhr);
				console.log(error);
			}
		});
	}
}

// 지도 생성 function
//var markers = [];
//
//var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//	mapOption = {
//		center: new kakao.maps.LatLng(35.848947186070816, 129.22419114023407), // 지도의 중심좌표
//		level: 3 // 지도의 확대 레벨
//	};
//
//// 지도를 생성합니다    
//var map = new kakao.maps.Map(mapContainer, mapOption);
//
//var marker = new kakao.maps.Marker({
//	// 지도 중심좌표에 마커를 생성합니다 
//	position: map.getCenter()
//});
//
//function relayout() {
//
//	// 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
//	// 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
//	// window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
//	map.relayout();
//	map.setLevel(4);
//}
//
//// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
//var mapTypeControl = new kakao.maps.MapTypeControl();
//
//// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
//// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
//map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
//
//// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
//var zoomControl = new kakao.maps.ZoomControl();
//map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
//marker.setMap(map);
//
//// 지도에 마커를 표시합니다
////marker.setMap(map); // 마커 찍히게 함 위에 선언해둔 위도 경도 값에.
//
//// 지도에 클릭 이벤트를 등록합니다
//// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
//kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//
//	// 클릭한 위도, 경도 정보를 가져옵니다 
//	var latlng = mouseEvent.latLng;
//
//	document.getElementById('lati').value = latlng.getLat();
//
//	// 마커 위치를 클릭한 위치로 옮깁니다
//	marker.setPosition(latlng);
//
//	var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
//	message += '경도는 ' + latlng.getLng() + ' 입니다';
//
//	document.getElementById('long').value = latlng.getLng();
//	//		console.log(message);
//	//	console.log('현재 위도 : ' + latlng.getLat());
//	//	console.log('현재 경도 : ' + latlng.getLng());
//	var resultDiv = document.getElementById('clickLatlng');
//
//});
//
//// 장소 검색 객체를 생성합니다
//var ps = new kakao.maps.services.Places();
//
//// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
//
//// 키워드로 장소를 검색합니다
//searchPlaces();
//
//// 키워드 검색을 요청하는 함수입니다
//function searchPlaces() {
//
//	var keyword = document.getElementById('keyword').value;
//
//	if (!keyword.replace(/^\s+|\s+$/g, '')) {
//		alert('키워드를 입력해주세요!');
//		return false;
//	}
//
//	// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//	ps.keywordSearch(keyword, placesSearchCB);
//}
//
//// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
//function placesSearchCB(data, status, pagination) {
//	if (status === kakao.maps.services.Status.OK) {
//		// 정상적으로 검색이 완료됐으면
//		// 검색 목록과 마커를 표출합니다
//		displayPlaces(data);
//
//		// 페이지 번호를 표출합니다
//		displayPagination(pagination);
//
//	} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//
//		alert('검색 결과가 존재하지 않습니다.');
//		return;
//
//	} else if (status === kakao.maps.services.Status.ERROR) {
//
//		alert('검색 결과 중 오류가 발생했습니다.');
//		return;
//
//	}
//}
//
//// 검색 결과 목록과 마커를 표출하는 함수입니다
//function displayPlaces(places) {
//
//	var listEl = document.getElementById('placesList'),
//		menuEl = document.getElementById('menu_wrap'),
//		fragment = document.createDocumentFragment(),
//		bounds = new kakao.maps.LatLngBounds(),
//		listStr = '';
//
//	// 검색 결과 목록에 추가된 항목들을 제거합니다
//	removeAllChildNods(listEl);
//
//	// 지도에 표시되고 있는 마커를 제거합니다
//	removeMarker();
//
//	for (var i = 0; i < 5; i++) {
//		// 마커를 생성하고 지도에 표시합니다
//		var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//			marker = addMarker(placePosition, i),
//			itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
//
//		// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//		// LatLngBounds 객체에 좌표를 추가합니다
//		bounds.extend(placePosition);
//
//		// 마커와 검색결과 항목에 mouseover 했을때
//		// 해당 장소에 인포윈도우에 장소명을 표시합니다
//		// mouseout 했을 때는 인포윈도우를 닫습니다
//		(function(marker, title) {
//			kakao.maps.event.addListener(marker, 'mouseover', function() {
//				displayInfowindow(marker, title);
//			});
//
//			kakao.maps.event.addListener(marker, 'mouseout', function() {
//				infowindow.close();
//			});
//
//			itemEl.onmouseover = function() {
//				displayInfowindow(marker, title);
//			};
//
//			itemEl.onmouseout = function() {
//				infowindow.close();
//			};
//		})(marker, places[i].place_name);
//
//		fragment.appendChild(itemEl);
//	}
//
//	// 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
//	listEl.appendChild(fragment);
//	menuEl.scrollTop = 0;
//
//	// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//	map.setBounds(bounds);
//}
//
//// 검색결과 항목을 Element로 반환하는 함수입니다
//function getListItem(index, places) {
//
//	var el = document.createElement('li'),
//		itemStr = '<span class="markerbg marker_' + (index + 1) + '" ></span>' +
//			'<div class="info">' +
//			'   <h5>' + places.place_name + '</h5>';
//
//	if (places.road_address_name) {
//		itemStr += '    <span>' + places.road_address_name + '</span>' +
//			'   <span class="jibun gray">' + places.address_name + '</span>';
//	} else {
//		itemStr += '    <span>' + places.address_name + '</span>';
//	}
//
//	itemStr += '  <span class="tel">' + places.phone + '</span>' +
//		'</div>';
//
//	el.innerHTML = itemStr;
//	el.className = 'item';
//
//	return el;
//}
//
//// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
//function addMarker(position, idx, title) {
//	var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//		imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//		imgOptions = {
//			spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//			spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//			offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//		},
//		markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//		marker = new kakao.maps.Marker({
//			position: position, // 마커의 위치
//			image: markerImage
//		});
//
//	marker.setMap(map); // 지도 위에 마커를 표출합니다
//	markers.push(marker);  // 배열에 생성된 마커를 추가합니다
//
//	return marker;
//}
//
//// 지도 위에 표시되고 있는 마커를 모두 제거합니다
//function removeMarker() {
//	for (var i = 0; i < markers.length; i++) {
//		markers[i].setMap(null);
//	}
//	markers = [];
//}
//
//// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
//function displayPagination(pagination) {
//	var paginationEl = document.getElementById('pagination'),
//		fragment = document.createDocumentFragment(),
//		i;
//
//	// 기존에 추가된 페이지번호를 삭제합니다
//	while (paginationEl.hasChildNodes()) {
//		paginationEl.removeChild(paginationEl.lastChild);
//	}
//
//	for (i = 1; i <= pagination.last; i++) {
//		var el = document.createElement('a');
//		el.href = "#";
//		el.innerHTML = i;
//
//		if (i === pagination.current) {
//			el.className = 'on';
//		} else {
//			el.onclick = (function(i) {
//				return function() {
//					pagination.gotoPage(i);
//				}
//			})(i);
//		}
//
//		fragment.appendChild(el);
//	}
//	paginationEl.appendChild(fragment);
//}
//
//// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
//// 인포윈도우에 장소명을 표시합니다
//function displayInfowindow(marker, title) {
//	var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
//
//	infowindow.setContent(content);
//	infowindow.open(map, marker);
//}
//
//// 검색결과 목록의 자식 Element를 제거하는 함수입니다
//function removeAllChildNods(el) {
//	while (el.hasChildNodes()) {
//		el.removeChild(el.lastChild);
//	}
//}
//
//var marker = new kakao.maps.Marker({
//	// 지도 중심좌표에 마커를 생성합니다 
//	position: map.getCenter()
//});
//
//// 지도에 마커를 표시합니다
//marker.setMap(map);
//
//// 지도에 클릭 이벤트를 등록합니다
//// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
//kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//
//	// 클릭한 위도, 경도 정보를 가져옵니다 
//	var latlng = mouseEvent.latLng;
//
//	document.getElementById('lati').value = latlng.getLat();
//
//	// 마커 위치를 클릭한 위치로 옮깁니다
//	marker.setPosition(latlng);
//
//	var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
//	message += '경도는 ' + latlng.getLng() + ' 입니다';
//
//	document.getElementById('long').value = latlng.getLng();
//	//		console.log(message);
//	console.log('현재 위도 : ' + latlng.getLat());
//	console.log('현재 경도 : ' + latlng.getLng());
//	var resultDiv = document.getElementById('clickLatlng');
//});
