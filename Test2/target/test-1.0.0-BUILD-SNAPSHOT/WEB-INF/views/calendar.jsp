<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="/resources/img/logo.ico">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/main.css">
<link rel="stylesheet" href="/resources/css/index.css">
<link rel="stylesheet" href="/resources/css/datepickerCss/bootstrap-datepicker.css">
<link rel="stylesheet" href="/resources/css/timePickerCss/jquery.timepicker.css">

	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<title>Calendar</title>
</head>
<body>
	<div id="calendar-container">
		<div id="calendar"></div>
	</div>
	<!-- 	유저 등록 모달 -->
	<div class="modal fade" id="userModal" tabindex="-1" role="dialog" 
				aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#FFFACD">
					<h2 class="modal-title" id="exampleModalLabel">사용자 추가</h2>
				</div>
				<div class="modal-body">
					<div class="tex">
						<input type="text" class="form-control" id="userNm"/>
						<div id="userNone"></div>
						<div id="userBar">- 등록된 유저</div>
							<ol id="olUser">
							</ol>
						
						<div class="modal-footer">
							<button class="btn btn-default btn-lg active" id="modalY" onclick="delUser()">삭제</button>
							<button class="btn btn-default btn-lg active" id="modalY" onclick="join()">추가</button>
							<button class="btn btn-default btn-lg active" type="button"
								data-dismiss="modal" id="closeModalBtn" onclick="offUser()">취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- calendar에서 달력 날짜 클릭 했을 때 나오는 modal -->
	<div class="modal fade" id="testModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#FFFACD">
					<h2 class="modal-title" id="exampleModalLabel">일정 추가</h2>
					<button class="btn btn-default btn-lg active" type="button" style="background-color : #FFFACD"
						data-dismiss="modal" id="closeModalBtn" onclick="cancel()">X</button>
				</div>
				<div class="modal-body">
						<h4>- User</h4>
					<div class="tex" id="tex">
							
					</div>
							
						<h4>- Schedule</h4>	
						<h4>
 							<!-- <input id="memo" type="text" placeholder="추가할 일정을 적으세요">  -->
 							<input type="text" style="width:400px;" id="memo" placeholder="추가할 일정을 적으세요" class="form-control"></textarea>
						</h4>
						<h4>- 일정이 언제까지인가요?</h4>
							<h8>*선택하신 시작 날짜</h8>
							<h4><input type="text" style="width:200px;" id="datePicker_start_in" class="form-control"/></h4>
							
							<h8>*선택을 안하시면 자동으로 하루 일정이 됩니다.</h8>
							<h4><input type="text" style="width:200px;" id="datePicker" placeholder="클릭해주세요" class="form-control"/></h4>
							<input type="text" style="width:200px;" name="time1" placeholder="시간선택"  id="end" class="form-control">

						<h4>
							- 내용을 적어주세요 
							<textarea style="width:400px" id="content" placeholder="내용" class="form-control"></textarea>
						</h4>
						
						<h4>- Map</h4>
					<div id="map" style="width: 100%; height: 400px;position:relative;overflow:hidden;"></div>
						<input type="hidden" id="pInput" /> <input type="hidden" id="lati" />
						<input type="hidden" id="long" />
						
						
						<div class="map_wrap">
					    <div id="menu_wrap" class="bg_white">
					        <div class="option">
					            <div>
					                <form onsubmit="searchPlaces(); return false;">
					                    <input type="text" value="경주시청" id="keyword" size="15" class="form-control"> 
					                    <button type="submit" class="btn btn-default">검색하기</button> 
					                </form>
					            </div>
					        </div>
					        <div id="placesList" style="visibility: hidden"></div>
					        <div id="pagination" style="visibility: hidden"></div>
					    </div>
						</div>	
					<br>
					<br>
					
					<input type="hidden" id="pInput" /> <input type="hidden" id="lati" />
					<input type="hidden" id="long" />
					<h4>- Color -</h4>
						<h6 style="color:grey">- 등록하신 일정이 캘린더에 표출 될 색상입니다</h6>
							<input type="radio" id="radioR" name="radioNm" value = "#CD1039" onclick="changeColor(this.value)"><label style="color:#CD1039">Red</label>
							<input type="radio" id="radioO" name="radioNm" value = "#FF8200" onclick="changeColor(this.value)"><label style="color:#FF8200">Orange</label>
							<input type="radio" id="radioY" name="radioNm" value = "#FFDC3C" onclick="changeColor(this.value)"><label style="color:#FFDC3C">Yellow</label>
							<input type="radio" id="radioG" name="radioNm" value = "#3CA03C" onclick="changeColor(this.value)"><label style="color:#3CA03C">Green</label>
							<input type="radio" id="radioB" name="radioNm" value = "#0d6efd" onclick="changeColor(this.value)"><label style="color:#0d6efd">Blue</label>
							<input type="radio" id="radioN" name="radioNm" value = "#0000CD" onclick="changeColor(this.value)"><label style="color:#0000CD">Navy</label>
							<input type="radio" id="radioP" name="radioNm" value = "#5A5AFF" onclick="changeColor(this.value)"><label style="color:#5A5AFF">Pupple</label>
					<input type="hidden" id="color" />
				</div>
				
				

				<div class="modal-footer">
					<button class="btn btn-default btn-lg active" id="modalY"
						onclick="okay()">추가</button>
					<button class="btn btn-default btn-lg active" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="cancel()">취소</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- calendar에서 일정을 누르게 되면 나오는 modal 삭제, 수정, 위치변경이 가능해야한다. -->
	<div class="modal fade" id="modiModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#FFFACD">
					<h4 class="modal-title" id="exampleModalLabel" >일정 보기 / 수정</h4>
					<button class="btn btn-default btn-lg active" type="button" style="background-color:#FFFACD"
						data-dismiss="modal" id="closeModalBtn" onclick="modiCancel()">X</button>
				</div>
				<div class="modal-body">
					<h4>- User</h4>
					<div class="tex_two" id="tex_two">	

					</div>
					<h4>- Schedule</h4>
					<h6 style="color:grey">일정을 지우고 변경하시면 됩니다.</h6>
						<h4>
<!--  							<input id="modiMemo" type="text">  -->
								<textarea style="width:400px;" id="modiMemo" class="form-control"></textarea>
						</h4>
						<h4>- 날짜를 수정해주세요</h4>
							
							<h8>*시작일을 바꾸고 싶으신가요?</h8>
							<h4><input type="text" style="width:200px;" id="datePicker_start" class="form-control"/></h4>
							
							<h8>*선택을 안하시면 자동으로 하루 일정이 됩니다.</h8>
							<h4><input type="text" style="width:200px;" id="datePicker_end" class="form-control"/></h4>
							<input type="text" style="width:200px;" name="time1" id="end_two" class="form-control">

						<h4>
						<h4>
							- 수정하실 내용을 적어주세요
							<textarea style="width:400px" id="modiContent" placeholder="내용" class="form-control"></textarea>
						</h4>
						
					<h4>- Map</h4>
					<div id="map2" style="width: 100%; height: 400px;"></div>
										
					<input type="hidden" id="cInput" /> <input type="hidden" id="long_two"/>
					<input type="hidden" id="lat_two"/> 
					<h4>- Color -</h4>
						<h6 style="color:grey">- 변경하시고 싶은 색상을 선택해주세요</h6>
							<input type="radio" id="radioR" name="radioNm" value = "#CD1039" onclick="changeColor(this.value)"><label style="color:#CD1039">Red</label>
							<input type="radio" id="radioO" name="radioNm" value = "#FF8200" onclick="changeColor(this.value)"><label style="color:#FF8200">Orange</label>
							<input type="radio" id="radioY" name="radioNm" value = "#FFDC3C" onclick="changeColor(this.value)"><label style="color:#FFDC3C">Yellow</label>
							<input type="radio" id="radioG" name="radioNm" value = "#3CA03C" onclick="changeColor(this.value)"><label style="color:#3CA03C">Green</label>
							<input type="radio" id="radioB" name="radioNm" value = "#3788d8" onclick="changeColor(this.value)"><label style="color:#3788d8">Blue</label>
							<input type="radio" id="radioN" name="radioNm" value = "#0000CD" onclick="changeColor(this.value)"><label style="color:#0000CD">Navy</label>
							<input type="radio" id="radioP" name="radioNm" value = "#5A5AFF" onclick="changeColor(this.value)"><label style="color:#5A5AFF">Pupple</label>
					<input type="hidden" id="modiColor" />
				</div>

				<div class="modal-footer">
					<button class="btn btn-default btn-lg active" id="modall"
						onclick="modi()">수정</button>
					<button class="btn btn-default btn-lg active" id="modalY"
						onclick="del()">삭제</button>
					<button class="btn btn-default btn-lg active" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="modiCancel()">취소</button>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=367206e7f756996ede961457360b24ef&libraries=services"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
	<script type="text/javascript" src="/resources/js/main.min.js"></script>
	<script type="text/javascript" src="/resources/js/locales-all.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="/resources/js/datepickerJs/bootstrap-datepicker.js"></script>

	<script type="text/javascript" src="/resources/js/timePickerJs/jquery.timepicker.min.js"></script>
	
	<script type="text/javascript" src="/resources/js/cal.js"></script>
 	
	
</body>
</html>