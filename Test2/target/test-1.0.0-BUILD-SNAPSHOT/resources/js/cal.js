$('#datePicker').datepicker({ 	
 	format: "yyyy-mm-dd"
 });
 
$('#datePicker_start').datepicker({ 	
 	format: "yyyy-mm-dd"
 }); 
 
 $('#datePicker_start_in').datepicker({
	format: "yyyy-mm-dd"
 });
 
$('#datePicker_end').datepicker({ 	
 	format: "yyyy-mm-dd"
 }); 
 
$("#end").timepicker({
	step: 30,            //시간간격 : 30
	timeFormat: "H:i"    //
});

$("#end_two").timepicker({
	step: 30,            //시간간격 : 30
	timeFormat: "H:i"    //
});



function show(){
	$.ajax({
		type:"POST",
		url:"/showUser",
		success:function(data){
			for(var i = 0; i<data.length;i++){
				var text_add = data[i].nm;
				var ol_list = $('#olUser'); //ul_list선언
				ol_list.append("<li>"+text_add+"</li>");
			}
		},error(xhr, error, status){
			alert('error : ' + error);
		}
	});
}
 
// 유저등록 눌렀을 때 나오는 모달
function onUser(){
	show();
	$('#userModal').modal({backdrop: 'static', keyboard: false});
	$('#userModal').modal('show');
	
}

//유저 모달에서 추가 누르면?
function join(){
	var nm = $('#userNm').val();
	if(nm == '') {
		$('#userNone').html('등록하실 이름을 적어주세요!');
	} else {
		$.ajax({
			type:"POST",
			url:"/userJoin",
			data:{
			nm:nm
			}, success:function(){
				$('#userNm').val('');
				$('#userNone').html('');
				$('#olUser').empty();	
				show();
				
			}, error(xhr, error, status){
				alert('error : ' + error);
			}
		});
	}
}

//유저 삭제
function delUser(){
	var nm = $('#userNm').val();
	if(nm == '') {
		$('#userNone').html('삭제하실 이름을 적어주세요!');
	} else {
		$.ajax({
			type:"POST",
			url:"/userDel",
			data:{
			nm:nm
			}, success:function(){
				$('#olUser').empty();
				show();
				$('#userNm').val('');
			}, error(xhr, error, status){
				alert('error : ' + error);
			}
		});
	}
}

//유저 모달에서 취소 누르면?
function offUser(){
	$('#olUser').empty(); // olUser의 자식노드 모두 삭제 
	$('#userNm').val('');
	$('#userNone').html('');
	$('#userModal').modal('hide');
}

function message(){
		swal("Hello World!");
}
		
// 페이지 로드
		var fcEventTitleContainerClicked = false;
		var fcDaygridDayClicked = false;
		var title;
		var start;
		var id;
		var color;
		var text;
		
		// FullCalendar를 만들면서 값을 받아온다.
			var calendarEl = document.getElementById('calendar');
			
			var calendar = new FullCalendar.Calendar(calendarEl, {
				googleCalendarApiKey:'AIzaSyBbRC35AHpuKCMnPyWoxcmKl0SQ24zh62s',
				displayEventTime: false, // 시간 표출 안함
				locale : 'ko', // 언어 한국어
				height:"100%", // 캘린더 height값 100%
				events : function(info, successCallback, failureCallback) {
					$.ajax({
						type : "POST",
						url : "/event",  
						dataType : "json", // data
						success : function(data) {
							successCallback(data);
						},
						error : function(xhr, error, status) {
							console.log(xhr);
							console.log(error);
							console.log(status);
							alert(error);
						}
					});
				},
				eventClick: function (info) { 
					id=info.event.id; // 전역변수 id에 내가 클릭한 일정의 id값을 넣어서 활용할 생각.
				},
				  customButtons: {
				    myCustomButton: {
				      text: '유저등록',
				      click: function() {
				        onUser();
				      }
				    }
				  },
				  headerToolbar: {
				    left: 'myCustomButton',
				    center: 'title',
				    right: 'today prev,next'
				  },
				eventSources : [
					{googleCalendarId : 'qduatr3seur835pk4aolok2900@group.calendar.google.com' , 
						className : 'ko_event',
						textColor:'red',
						color:'beige',
						borderColor:'white'
					 }
				]
				
			});
			calendar.render();
		
	
		// 달력 칸 눌렀을 경우 일정칸과 큰 칸 둘 다 fc-daygrid-day를 먹어서 true false로 구분
		$(document).on("click", ".fc-daygrid-day", function() {
			fcDaygridDayClicked = true;
			fcClickEvent(this);
			
		})
		
		//체크박스에 이름 넣는다.
		function showChkBox(){
			$.ajax({
					type:"POST",
					url:"/showUser",
					success:function(data){
						for(var i = 0; i<data.length;i++){
							
							var tex = $('#tex');
							var texChk = data[i].nm;
							
							tex.append("<input type='checkbox' id='checkbox" + data[i].id + " 'value='"+ data[i].id + " 'name='"+ "checkBox"    +"' />");
							tex.append("<label>"+texChk+"</label>&nbsp");                            														
							
							
						}
					},error(xhr, error, status){
						alert('error : ' + error);
					}
				});
		}
		
		function showChkBoxTwo(){
			$.ajax({
				type:"POST",
					url:"/showUser",
					success:function(data){
						for(var i = 0; i<data.length;i++){
							
							var tex = $('#tex_two');
							var texChk = data[i].nm;
							
							tex.append("<input type='checkbox' id='checkbox" + data[i].id + " 'value='"+ data[i].id + " 'name='"+ "checkBox"    +"' />");
							tex.append("<label>"+texChk+"</label>&nbsp");     
							
						}//for문 끝
						checkboxFunc();                       														
					},error(xhr, error, status){
						alert('error : ' + error);
					}
			});
		}
		
		function checkboxFunc(){
			var checkBox = $('input[name="checkBox"]');
			console.log('checkBox -> ' + checkBox);
			console.log('checkboxFunc id = ' + id);
			for(var i = 0; i < checkBox.length; i++){
				console.log('checkBox['+i+'] -> ' + checkBox[i].value);
			}
			
			$.ajax({
				url:"/modiChk",
				type:"POST",
				data:{calendar_id:id},
				success:function(data){
					console.log('ajax data : ' + data);
					
					for(var i = 0; i < checkBox.length; i++){
						console.log(checkBox[i].value);
						for(var j = 0; j < data.length;j++){
						var c_user_id = data[j].c_user_id;
							if(checkBox[i].value == c_user_id){
								console.log(checkBox[i]);
								checkBox[i].checked = true;
							}
						}
					}
				},error(xhr,error,status){
				//안넣었음
				}
			});
			
		}
		
		// 수정Modal, 등록Modal 구분하는 function
		function fcClickEvent(fcDaygridDay) {
			// 등록 modal로 들어가는 과정 --> 
			if (!fcEventTitleContainerClicked && fcDaygridDayClicked) { // 여기서 EventTitle은 false, DayGridDay는 true
				$('#testModal').modal({backdrop: 'static', keyboard: false});
				$('#testModal').modal('show');
				$('#memo').val('');
				
				showChkBox();
				
				var dat = $(fcDaygridDay).attr('data-date');
				console.log("date : " + dat);
				
				document.getElementById('pInput').value = dat;
				document.getElementById('datePicker_start_in').value = dat;
				
				mapReload();
				
				fcEventTitleContainerClicked = false;
				fcDaygridDayClicked = false;
			// 수정 modal
			} else if (fcEventTitleContainerClicked && fcDaygridDayClicked) { // true true
					$('#modiModal').modal({backdrop: 'static', keyboard: false});
					$('#modiModal').modal('show');
					showChkBoxTwo();
					
					
					var dat = $(fcDaygridDay).attr('data-date');
					console.log(dat);
					document.getElementById('cInput').value = dat;
					
					document.getElementById('modiContent').value=content;
					document.getElementById('modiColor').value=color;
						
					mapReload();
					map.relayout();
					
					fcEventTitleContainerClicked = false;
					fcDaygridDayClicked = false;
				}
		}
		
		// 일정 눌렀을 경우 -> 수정일 경우
		$(document).on("click", ".fc-daygrid-event-harness", function() {
			fcEventTitleContainerClicked = true; // true로 변경
			title = this.lastChild.innerText;
			var cc = $(this).children().attr('style');
			console.log('cc : ' + cc);
			$('.fc-daygrid-event').removeAttr('href');
			
			
			if(cc == 'border-color: white; background-color: beige;'){
				alert(title + '입니다');
				window.location.reload();
			} else {
				console.log("일정을 누른 title : " + title);
				$('#modiMemo').val(title);
	// 			위도 경도 불러오기 ajax
				$.ajax({
					type:"POST",
					url:"/latlong",
					data:{
						id:id
					},
					success : function(data) {
						console.log(data.longtitude);
						console.log(data.latitude);
						console.log('latlong start -> ' + data.start);
						console.log('latlong end -> ' + data.end);
							if(data.longtitude == '' || isNaN(data.longtitude)){
								alert('다시 접근해주시기 바랍니다.');
								window.location.reload();
							} else {
								$('#long_two').val(data.longtitude);
								$('#lat_two').val(data.latitude);
								var latitu = data.longtitude;
								var longtitu = data.latitude;
								
								var dataEnd = data.end.split(' ');
								
								var datePicker = dataEnd[0];
								var end = dataEnd[1];
								var start = data.start;
								
								console.log('datePicker : ' + datePicker);
								console.log('end : ' + end);
								console.log('datePicker_start : ' + start);
								$('#datePicker_end').val(datePicker);
								$('#end_two').val(end);
								$('#datePicker_start').val(start);
								
								
								$('#modiContent').val(data.content);
								$('#modiColor').val(data.color);
								
								var mapContainer = document.getElementById('map2'), // 지도를 표시할 div 
							    mapOption = { 
							        center: new kakao.maps.LatLng(longtitu, latitu), // 지도의 중심좌표
							        level: 3 // 지도의 확대 레벨
							    };
								// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
								var map = new kakao.maps.Map(mapContainer, mapOption);
								var markerCenter = map.getCenter();
								console.log('현재 위도 : ' + markerCenter.getLat());
								console.log('현재 경도 : ' + markerCenter.getLng());
								// 마커가 표시될 위치
								var markerPosition  = new kakao.maps.LatLng(longtitu, latitu);
								
								var marker = new kakao.maps.Marker({
									// 지도 중심좌표에 마커를 생성합니다 
									position : map.getCenter()
								});
								// 지도에 마커를 표시합니다
				
								marker.setMap(map);
								
								function setDraggable(draggable) {
								    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
								    map.setDraggable(draggable);    
								}
								
								// 맵 중앙으로 다시 찍어준다
								kakao.maps.event.addListener(map, 'idle', function() {
								    map.setCenter(markerCenter);
								    setDraggable(false);
								});
							}
						
						}, error(xhr, error, status){
							alert('error : ' + error);
						}
					});	
				}
		})
		
		// 등록Modal에서 확인을 누르면 if문으로 캘린더에 적힌 메모를 확인 후 지도를 확인한다. 안들어가있으면 alert
		// 다 들어가있으면 값을 받아서 ajax로 modal hide후 reload();
		function okay() {
			var title = $('#memo').val();
			var start = $('#datePicker_start_in').val();
			var latitude = $('#lati').val();
			var longtitude = $('#long').val();
			var color = $('#color').val();
			
			if($('#datePicker').val() == '') {
				$('#datePicker').val(start);
			}
			
			var end = $('#datePicker').val() + ' ' + $('#end').val();
			var content = $('#content').val();
			
			console.log('start : ' + start);
			console.log('end : ' + end);
			
			//start
			var y = start.substr(0,4);
			var m = start.substr(5, 2);
			var d = start.substr(8, 2);
			
			//end
			var y2 = $('#datePicker').val().substr(0, 4);
			var m2 = $('#datePicker').val().substr(5, 2);
			var d2 = $('#datePicker').val().substr(8, 2);
			
			console.log('y2 : ' + y2);
			console.log('m2 : ' + m2);
			console.log('d2 : ' + d2);
			
			var endDate = new Date(y2, m2, d2);
			var startDate = new Date(y, m, d);
			console.log('start : ' + startDate);
			console.log('end : ' + endDate);
			
			if(endDate < startDate){
				alert('끝나는 날짜가 시작 날짜를 앞설 수 없습니다.');
			} else {
				var list = new Array();
				$('input:checkbox[name="checkBox"]').each(function() {
					if(this.checked){//checked 처리된 항목의 값	
						list.push(this.value); 
					}
				});
				
				if(list.length == 0){
					list.push(0);
				}
				
				if(end == ' '){
					end = start + ' 12:00:00';
				} else if($('#end').val() == ''){
					end += '12:00:00';
				}
				console.log('if 후 end : ' + end);
	//			else {
	//				end += ':00';
	//			}
	
				if (!latitude || !longtitude) {
					latitude = 35.84900812662543;
					longtitude = 129.22430628197773;
				}
				
				
				if (!title) {
					alert('캘린더에 적힐 메모를 적어주세요.');
					
				} else {
					
					$.ajax({
						type : "POST",
						url : "/modal",
						data : {
							title : title,
							start : start,
							latitude : latitude,
							longtitude : longtitude,
							color : color,
							end : end,
							content: content,
							list:list
						},
						success : function() {
							$('#tex').empty();
							$('#testModal').modal('hide');
	 						window.location.reload();
							
						},
						error : function(xhr, error, status) {
							alert('인원을 입력해주세요');
							$('#tex').show();
						}
					})
				
				}
			}
		}
		
		var markers = [];
		
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		    mapOption = {
		        center: new kakao.maps.LatLng(35.848947186070816, 129.22419114023407), // 지도의 중심좌표
		        level: 3 // 지도의 확대 레벨
		    };  
		
		// 지도를 생성합니다    
		var map = new kakao.maps.Map(mapContainer, mapOption); 
		
		
		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
		if (navigator.geolocation) {

			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function(position) {

 				var lat = position.coords.latitude, // 위도
 				lon = position.coords.longitude; // 경도
				var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
				message = '현 위치'; // 인포윈도우에 표시될 내용입니다

				// 마커와 인포윈도우를 표시합니다

				displayMarker(locPosition, message);
				
			});

		} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
			var locPosition = new kakao.maps.LatLng(), message = 'geolocation을 사용할수 없어요..'
			displayMarker(locPosition, message);
		}
		var marker = new kakao.maps.Marker({
			// 지도 중심좌표에 마커를 생성합니다 
			position : map.getCenter()
		});
	
		// 지도에 마커를 표시합니다
		marker.setMap(map);
		
		
		
		
		// 지도에 클릭 이벤트를 등록합니다
		// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

			// 클릭한 위도, 경도 정보를 가져옵니다 
			var latlng = mouseEvent.latLng;

			document.getElementById('lati').value = latlng.getLat();

			// 마커 위치를 클릭한 위치로 옮깁니다
			marker.setPosition(latlng);

			var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
			message += '경도는 ' + latlng.getLng() + ' 입니다';

			document.getElementById('long').value = latlng.getLng();
// 			console.log(message);
			console.log('현재 위도 : ' + latlng.getLat());
			console.log('현재 경도 : ' + latlng.getLng());
			var resultDiv = document.getElementById('clickLatlng');
		});
		
		// 지도에 마커와 인포윈도우를 표시하는 함수입니다
		function displayMarker(locPosition, message) {
			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}
		
		// 장소 검색 객체를 생성합니다
		var ps = new kakao.maps.services.Places();  
		
		// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({zIndex:1});
		
		// 키워드로 장소를 검색합니다
		searchPlaces();
		
		// 키워드 검색을 요청하는 함수입니다
		function searchPlaces() {
		
		    var keyword = document.getElementById('keyword').value;
		
		    if (!keyword.replace(/^\s+|\s+$/g, '')) {
		        alert('키워드를 입력해주세요!');
		        return false;
		    }
		
		    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
		    ps.keywordSearch( keyword, placesSearchCB); 
		}
		
		// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
		function placesSearchCB(data, status, pagination) {
		    if (status === kakao.maps.services.Status.OK) {
		
		        // 정상적으로 검색이 완료됐으면
		        // 검색 목록과 마커를 표출합니다
		        displayPlaces(data);
		
		        // 페이지 번호를 표출합니다
		        displayPagination(pagination);
		
		    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
		
		        alert('검색 결과가 존재하지 않습니다.');
		        return;
		
		    } else if (status === kakao.maps.services.Status.ERROR) {
		
		        alert('검색 결과 중 오류가 발생했습니다.');
		        return;
		
		    }
		}
		
		// 검색 결과 목록과 마커를 표출하는 함수입니다
		function displayPlaces(places) {
		
		    var listEl = document.getElementById('placesList'), 
		    menuEl = document.getElementById('menu_wrap'),
		    fragment = document.createDocumentFragment(), 
		    bounds = new kakao.maps.LatLngBounds(), 
		    listStr = '';
		    
		    // 검색 결과 목록에 추가된 항목들을 제거합니다
		    removeAllChildNods(listEl);
		
		    // 지도에 표시되고 있는 마커를 제거합니다
		    removeMarker();
		    
		    for ( var i=0; i<5; i++ ) {
		
		        // 마커를 생성하고 지도에 표시합니다
		        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
		            marker = addMarker(placePosition, i), 
		            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
		
		        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
		        // LatLngBounds 객체에 좌표를 추가합니다
		        bounds.extend(placePosition);
		
		        // 마커와 검색결과 항목에 mouseover 했을때
		        // 해당 장소에 인포윈도우에 장소명을 표시합니다
		        // mouseout 했을 때는 인포윈도우를 닫습니다
		        (function(marker, title) {
		            kakao.maps.event.addListener(marker, 'mouseover', function() {
		                displayInfowindow(marker, title);
		            });
		
		            kakao.maps.event.addListener(marker, 'mouseout', function() {
		                infowindow.close();
		            });
		
		            itemEl.onmouseover =  function () {
		                displayInfowindow(marker, title);
		            };
		
		            itemEl.onmouseout =  function () {
		                infowindow.close();
		            };
		        })(marker, places[i].place_name);
		
		        fragment.appendChild(itemEl);
		    }
		
		    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
		    listEl.appendChild(fragment);
		    menuEl.scrollTop = 0;
		
		    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		    map.setBounds(bounds);
		}
		
		// 검색결과 항목을 Element로 반환하는 함수입니다
		function getListItem(index, places) {
		
		    var el = document.createElement('li'),
		    itemStr = '<span class="markerbg marker_' + (index+1) + '" ></span>' +
		                '<div class="info">' +
		                '   <h5>' + places.place_name + '</h5>';
		
		    if (places.road_address_name) {
		        itemStr += '    <span>' + places.road_address_name + '</span>' +
		                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
		    } else {
		        itemStr += '    <span>' +  places.address_name  + '</span>'; 
		    }
		                 
		      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
		                '</div>';           
		
		    el.innerHTML = itemStr;
		    el.className = 'item';
		
		    return el;
		}
		
		// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
		function addMarker(position, idx, title) {
		    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
		        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
		        imgOptions =  {
		            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
		            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
		            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
		        },
		        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
		            marker = new kakao.maps.Marker({
		            position: position, // 마커의 위치
		            image: markerImage 
		        });
		
		    marker.setMap(map); // 지도 위에 마커를 표출합니다
		    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
		
		    return marker;
		}
		
		// 지도 위에 표시되고 있는 마커를 모두 제거합니다
		function removeMarker() {
		    for ( var i = 0; i < markers.length; i++ ) {
		        markers[i].setMap(null);
		    }   
		    markers = [];
		}
		
		// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
		function displayPagination(pagination) {
		    var paginationEl = document.getElementById('pagination'),
		        fragment = document.createDocumentFragment(),
		        i; 
		
		    // 기존에 추가된 페이지번호를 삭제합니다
		    while (paginationEl.hasChildNodes()) {
		        paginationEl.removeChild (paginationEl.lastChild);
		    }
		
		    for (i=1; i<=pagination.last; i++) {
		        var el = document.createElement('a');
		        el.href = "#";
		        el.innerHTML = i;
		
		        if (i===pagination.current) {
		            el.className = 'on';
		        } else {
		            el.onclick = (function(i) {
		                return function() {
		                    pagination.gotoPage(i);
		                }
		            })(i);
		        }
		
		        fragment.appendChild(el);
		    }
		    paginationEl.appendChild(fragment);
		}
		
		// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
		// 인포윈도우에 장소명을 표시합니다
		function displayInfowindow(marker, title) {
		    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
		
		    infowindow.setContent(content);
		    infowindow.open(map, marker);
		}
		
		 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
		function removeAllChildNods(el) {   
		    while (el.hasChildNodes()) {
		        el.removeChild (el.lastChild);
		    }
		}
		
		var marker = new kakao.maps.Marker({
			// 지도 중심좌표에 마커를 생성합니다 
			position : map.getCenter()
		});
	
		// 지도에 마커를 표시합니다
		marker.setMap(map);

		// 지도에 클릭 이벤트를 등록합니다
		// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
		kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

			// 클릭한 위도, 경도 정보를 가져옵니다 
			var latlng = mouseEvent.latLng;

			document.getElementById('lati').value = latlng.getLat();

			// 마커 위치를 클릭한 위치로 옮깁니다
			marker.setPosition(latlng);

			var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
			message += '경도는 ' + latlng.getLng() + ' 입니다';

			document.getElementById('long').value = latlng.getLng();
// 			console.log(message);
			console.log('현재 위도 : ' + latlng.getLat());
			console.log('현재 경도 : ' + latlng.getLng());
			var resultDiv = document.getElementById('clickLatlng');
			
		});
		
	
		
		
		// 지도 다시 불러오는 function --> 지도가 불러올때 자꾸 깨져서 넣었음.
		function mapReload(){
			setTimeout(function() {
				window.dispatchEvent(new Event('resize'));
			}, 600);
		}
		
		//modal에서 취소를 누르면 modal을 hide시킨다.
		function cancel() {
			$('#datePicker').val('');
			$('#end').val('');
			$('#tex').empty();
			$('#testModal').modal('hide');
		}
		
		// 수정 modal에서 취소 누를 시 hide
		function modiCancel() {
			$('#tex_two').empty();
			$('#modiModal').modal('hide');
		}
		
		// 삭제 누를 시 
		function del(){
			console.log(id);
			$.ajax({
				type:"POST",
				url:"/del",
				data:{
					id:id
				},success : function(){
					$('#modiModal').modal('hide');
					window.location.reload();
				}, error : function (xhr, error, status){
					alert(error);
				}
			});
		}
		
		// 수정 눌렀을 경우
		function modi(){
			var text = $('#modiMemo').val();
			color = $('#modiColor').val();
			content = $('#modiContent').val();
			end = $('#datePicker_end').val() + ' ' +$('#end_two').val();
			start = $('#datePicker_start').val();
			
			//start
			var y = start.substr(0,4);
			var m = start.substr(5, 2);
			var d = start.substr(8, 2);
			
			//end
			var y2 = $('#datePicker_end').val().substr(0, 4);
			var m2 = $('#datePicker_end').val().substr(5, 2);
			var d2 = $('#datePicker_end').val().substr(8, 2);
			
			var endDate = new Date(y2, m2, d2);
			var startDate = new Date(y, m, d);
			console.log('start : ' + startDate);
			console.log('end : ' + endDate);
			
			if(endDate < startDate){
				alert('끝나는 날짜가 시작 날짜를 앞설 수 없습니다.');
			} else {
				var list = new Array();
				$('input:checkbox[name="checkBox"]').each(function() {
					if(this.checked){//checked 처리된 항목의 값	
						list.push(this.value); 
					}
				});
				console.log('리스트 : ' + list); //여기까진 들어감.
				
				if(list.length == 0){
					list.push(0);
				}
				
				$.ajax({
					type:"POST",
					url:"/modi",
					data:{
						id:id,
						title:text,
						content:content,
						color:color,
						start:start,
						end:end,
						list:list
					}, success : function(){
						$('#modiModal').modal('hide');
						window.location.reload();
						
					}, error : function(xhr, error, status){
						alert(error);
					}
				});
			}
		}
		
		// 메모에 등록될 color색
		function changeColor(color){
			console.log(color);
			$('#color').val(color);
			$('#modiColor').val(color);
		}