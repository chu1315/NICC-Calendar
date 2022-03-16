<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" href="/resources/img/logo.ico">
<link rel="stylesheet" href="/resources/bootstrap-5.0.0-beta1-dist/css/bootstrap.min.css">
<link rel="stylesheet" href="/resources/css/main.css">
<link rel="stylesheet" href="/resources/css/datepickerCss/bootstrap-datepicker.css">
<link rel="stylesheet" href="/resources/css/timePickerCss/jquery.timepicker.css">
<link rel="stylesheet" href="/resources/css/index.css">
<link rel="stylesheet" href="/resources/css/hs-unfold.min.css">
<link rel="stylesheet" href="/resources/plugins/xeicon/xeicon.min.css">
<link rel="stylesheet" href="/resources/css/theme.css">
<style>

.tooltip-inner {
	text-align:left;
    white-space:normal;
    max-width:none;
}

.tooltip-inner{
	white-space:pre-wrap;
}

.tooltip-inner {
  background-color: #21272b !important;
  /*!important is not necessary if you place custom.css at the end of your css calls. For the purpose of this demo, it seems to be required in SO snippet*/
  color: #fff;
}


.tooltip.bs-tooltip-top .tooltip-arrow::before {
  border-top-color: #21272b ;
}

.tooltip.bs-tooltip-bottom .tooltip-arrow::before {
  border-bottom-color: #21272b ;
}

.tooltip.bs-tooltip-start .tooltip-arrow::before {
  border-left-color: #21272b ;
}

.tooltip.bs-tooltip-end .tooltip-arrow::before {
  border-right-color: #21272b ;
}

.form-check{
	padding-left:1em!important;
}

</style>
<title>NICC 일정관리시스템 (v0.1.17)</title>
</head>
<body>
		<div class="dropdown" id="dropdownTop">
		  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style="width:100%">
		    <i class="xi-filter mr-3"></i>Filter
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
		  	<small class="card-subtitle">선택한 팀 데이터만 조회합니다.</small>
                <div>
                	<input name="filterCheck2" type="checkbox" id="calendarEtcCheck2" value="대표">
                	<label class="custom-control-lavel" for="calendarEtcCheck2">대표</label>
                </div>
                
                <div>
                	<input name="filterCheck2" type="checkbox" id="calendarTechCheck2" value="생산기술">
                	<label class="custom-control-lavel" for="calendarTechCheck2">생산기술부</label>
                </div>

                <div>
                	<input name="filterCheck2" type="checkbox" id="calendarManageCheck2" value="경영기획">
                	<label class="custom-control-lavel" for="calendarManageCheck2">경영기획부</label>
                </div>
                
                <div>
                	<input name="filterCheck2" type="checkbox" id="calendarMediaCheck2" value="미디어">
                	<label class="custom-control-lavel" for="calendarMediaCheck2">미디어사업부</label>
                </div>
                
                <div>
                	<input name="filterCheck2" type="checkbox" id="calendarPlatCheck2" value="플랫폼">
                	<label class="custom-control-lavel" for="calendarPlatCheck2">플랫폼사업부</label>
                </div>
                <div class="dropdown-divider"></div>
			    <button class="btn btn-primary" id="filterOkay" style="float:right; margin: 3px;">조회</button>
			    <button class="btn btn-secondary" id="filterAll" style="float:right; margin: 3px;">전체해제</button>
		    </ul>
		</div>
	<div id="calendar-left">
		<a href="#" class="calendarMain">
			<div class="row g-0">
				<div class="col-md-3">
					<span class="display-4">
						<i class="xi-calendar-check"></i>
					</span>
				</div>
				<div class="col-md-9">
					<h5 class="card-title mb-0 mt-2">일정관리시스템</h5>
					<span class="card-text">
						<small class="text-muted">v0.1.17-alpha</small>
					</span>
				</div>
			</div>
		</a>
		<div>
			<div id="clock">
				
			</div>
		</div>
		<div id="userName" style="text-align:center;">
			
		</div>
		<button class="btn btn-sm btn-danger" onclick="logout()">로그아웃</button>
		<button class="btn btn-sm btn-info" onclick="changePwModal()" style="color:white;">비밀번호 변경</button>
		<div class="dropdown" id="dropdownBottom">
		  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style="width:100%">
		    <i class="xi-filter mr-3"></i>Filter
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
		  	<small class="card-subtitle">선택한 팀 데이터만 조회합니다.</small>
                <div>
                	<input name="filterCheck" type="checkbox" id="calendarEtcCheck" value="대표">
                	<label class="custom-control-lavel" for="calendarEtcCheck">대표</label>
                </div>
                
                <div>
                	<input name="filterCheck" type="checkbox" id="calendarTechCheck" value="생산기술">
                	<label class="custom-control-lavel" for="calendarTechCheck">생산기술부</label>
                </div>
                
                <div>
                	<input name="filterCheck" type="checkbox" id="calendarManageCheck" value="경영기획">
                	<label class="custom-control-lavel" for="calendarManageCheck">경영기획부</label>
                </div>
                
                <div>
                	<input name="filterCheck" type="checkbox" id="calendarMediaCheck" value="미디어">
                	<label class="custom-control-lavel" for="calendarMediaCheck">미디어사업부</label>
                </div>
                
                <div>
                	<input name="filterCheck" type="checkbox" id="calendarPlatCheck" value="플랫폼">
                	<label class="custom-control-lavel" for="calendarPlatCheck">플랫폼사업부</label>
                </div>
                <div class="dropdown-divider"></div>
			    <button class="btn btn-primary" id="filterOkay" style="float:right; margin: 3px;">조회</button>
			    <button class="btn btn-secondary" id="filterAll" style="float:right; margin: 3px;">전체해제</button>
		    </ul>
		</div>
	
		<div id="urgentCalendar">
			<div class="pastText" style="text-align: center;">
				<div class="badge bg-primary"><span id="pastText"></span></div>
			</div>
			<div class="pastText2" style="text-align: center;">
				<small>
					<span class="text-danger" style="font-size:15px; text-align: center;">&bullet; 미완료 및 미정 업무</span>
					<span class="text-danger" style="font-size:10pt;">(하단 클릭)</span>
				</small>
			</div>
			
			<div class="mb-2">
			</div>
			
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item" role="presentation" style="flex: 1;text-align: center;">
				  <a class="nav-link active" id="unfinish-tab" data-bs-toggle="tab" href="#unfinish" role="tab" aria-controls="unfinish" aria-selected="true">미완료</a>
				</li>
				<li class="nav-item" role="presentation" style="flex: 1;text-align: center;">
				  <a class="nav-link" id="noDate-tab" data-bs-toggle="tab" href="#noDate" role="tab" aria-controls="noDate" aria-selected="false">미정</a>
				</li>
			  </ul>
			
			
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade active show" id="unfinish" role="tabpane1" aria-labelledby="unfinish-tab">
					<small>
						<table class="table table-hover table-bordered bg-white">
							<tbody id="tbodyId2">
								
							</tbody>
						</table>
					</small>
				</div>
			
				<div class="tab-pane fade" id="noDate" rolde="tabpanel" aria-labelledby="noDate-tab">
					<small>
						<table class="table table-hover table-bordered bg-white">
							<tbody id="tbodyId">
							
							</tbody>
						</table>
					</small>
				</div>
			</div>
			
		</div>
	</div>
	
	<div id="calendar-container" draggable="true">
		<div id="calendar">
		
		</div>
	</div>
		
	<!-- calendar에서 일정을 누르게 되면 나오는 modal 삭제, 수정, 위치변경이 가능해야한다. -->
	<div class="modal fade" id="modiModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="exampleModalLabel" >일정 보기 / 수정</h4>
					<button class="btn btn-default" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="modiCancel()"><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg></button>
				</div>
				<div class="modal-body">
					<div class="row">
						
						<div class="col-md-12 mb-2">
							<input type="checkbox" id="checkBtn" name="checkBtn"/>
							<input type="hidden" id="testChk" value="N"/>
							<label for="checkBtn">완료 된 일정</label>
							&nbsp;
						<input type="hidden" id="latlongId"/>
							<input type="checkbox" id="undefinedCheckBtn" name="undefinedBtn"/>
							<input type="hidden" id="undefinedTestChk" value="N"/>
							<label for="undefinedCheckBtn">미정 업무</label>
						</div>					
						
						<div class="col-md-12 mb-2">
							<label><span class="xi-building"></span>&nbsp;팀 선택</label><br>
							<small style="padding: 0.5em;">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="modiRadioRep" value="대표" name="modiRadioTeam">
									<label class="form-check-label" for="modiRadioRep">대표</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="modiRadioTech" value="생산기술" name="modiRadioTeam">
									<label class="form-check-label" for="modiRadioTech">생산기술부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="modiRadioManage" value="경영기획" name="modiRadioTeam">
									<label class="form-check-label" for="modiRadioManage">경영기획부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="modiRadioMedia" value="미디어" name="modiRadioTeam">
									<label class="form-check-label" for="modiRadioMedia">미디어사업부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="modiRadioPlat" value="플랫폼" name="modiRadioTeam">
									<label class="form-check-label" for="modiRadioPlat">플랫폼사업부</label>
								</div>
							</small>	
						</div>
						<input type="hidden" id="modiTeam"/>
						
						<div class="col-md-12 mb-2">
							<label><span class="xi-paperclip"></span>&nbsp;일정구분</label><br>
							<small style="padding: 0.5em;">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioE2" name="modiRadioNm" value = "#e6bb00" onclick="changeColor(this.value)" >
									<label class="form-check-label" for="radioE2" style="color:#e6bb00">업무</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioR2" name="modiRadioNm" value = "#CD1039" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioR2" style="color:#CD1039">휴가</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioO2" name="modiRadioNm" value = "#FF8200" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioO2" style="color:#FF8200">교육</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioY2" name="modiRadioNm" value = "#0d6efd" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioY2" style="color:#0d6efd">출장</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioG2" name="modiRadioNm" value = "#1da71d" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioG2" style="color:#1da71d">설치</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioB2" name="modiRadioNm" value = "#0000CD" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioB2" style="color:#0000CD">A/S</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioP2" name="modiRadioNm" value = "#9ba0a5" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioP2" style="color:#9ba0a5">기타</label>
								</div>
							</small>
						</div>
						<input type="hidden" id="modiColor" />

						<div class="col-md-12 mb-2">
							<label class="form-label" for="modiMemo"><span class="xi-comment-o"></span>&nbsp;일정제목</label>
							<input type="text" class="form-control" id="modiMemo" placeholder="수정 일정제목 입력" />
						</div>

						<div class="col-md-4">
							<label class="form-label" for="datePicker_start_in"><span class="xi-calendar-check"></span> &nbsp;시작일</label>
							<input type="text" id="datePicker_start" class="form-control"/>
						</div>
						
						<div class="col-md-4">
							<label class="form-label"><span class="xi-calendar-remove"></span> &nbsp;종료일</label>
							<input type="text" id="datePicker_end" class="form-control"/>
							<span><small>* 선택없음 = 종일</small></span>
						</div>
						
						<div class="col-md-4 mb-2">
							<label class="form-label"><span class="xi-time-o"></span> &nbsp;시간</label>
							<input type="text" name="time1" id="end_two" class="form-control">
						</div>

						<div class="col-md-12 mb-2">
							<label class="form-label"><span class="xi-group"></span> &nbsp;일정참여</label>
							<div class="tex_two" id="tex_two"></div>
						</div>

						<div class="col-md-12 mb-2">
							<label class="form-label"><span class="xi-message-o"></span> &nbsp;일정내용</label>
							<textarea id="modiContent" placeholder="내용" class="form-control"></textarea>
						</div>

<!-- 						<div class="col-md-12 mb-2"> -->
<!-- 							<label>업무장소</label> -->
<!-- 							<div id="map2" style="width: 100%; height: 200px;"></div> -->
<!-- 						</div> -->

						<div class="col-md-6">
							<label class="form-label"><span class="xi-user-o"></span>&nbsp;등록자</label>
							<select id="authorEdit" class="form-control">
							</select>
						</div>

					</div>

				</div>
					
				<div class="modal-footer">
					<button class="btn btn-primary" id="modall"
						onclick="modi()">수정</button>
					<button class="btn btn-danger" id="modalY"
						onclick="del()">삭제</button>
					<button class="btn btn-secondary" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="modiCancel()">취소</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- calendar에서 달력 날짜 클릭 했을 때 나오는 modal -->
	<div class="modal fade" id="testModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="exampleModalLabel">일정등록</h4>
					<button class="btn btn-default" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="cancel()">
						<svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
					</button>
				</div>
				<div class="modal-body">

					<div class="row">
						<div class="col-md-12 mb-2">
							<input type="checkbox" id="checkBtn2" name="checkBtn2"/>
							<input type="hidden" id="testChk2" value="N"/>
							<label for="checkBtn2">미정 업무</label>
						</div>
						
						<div class="col-md-12 mb-2">
							<label><span class="xi-building"></span>&nbsp;팀 선택</label><br>
							<small style="padding: 0.5em!important;">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioRep" value="대표" name="radioTeam" checked="checked">
									<label class="form-check-label" for="radioRep">대표</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioTech" value="생산기술" name="radioTeam">
									<label class="form-check-label" for="radioTech">생산기술부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioManage" value="경영기획" name="radioTeam">
									<label class="form-check-label" for="radioManage">경영기획부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioMedia" value="미디어" name="radioTeam">
									<label class="form-check-label" for="radioMedia">미디어사업부</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioPlat" value="플랫폼" name="radioTeam">
									<label class="form-check-label" for="radioPlat">플랫폼사업부</label>
								</div>
							</small>	
						</div>
						<input type="hidden" id="team" value="대표"/>
						
						<div class="col-md-12 mb-2">
							<label><span class="xi-paperclip"></span>&nbsp;일정구분</label><br>
							<small style="padding: 0.5em!important;">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioE" name="radioNm" value = "#e6bb00" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioE" style="color:#e6bb00">업무</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioR" name="radioNm" value = "#CD1039" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioR" style="color:#CD1039">휴가</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioO" name="radioNm" value = "#FF8200" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioO" style="color:#FF8200">교육</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioY" name="radioNm" value = "#0d6efd" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioY" style="color:#0d6efd">출장</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioG" name="radioNm" value = "#1da71d" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioG" style="color:#1da71d">설치</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioB" name="radioNm" value = "#0000CD" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioB" style="color:#0000CD">A/S</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" id="radioP" name="radioNm" value = "#9ba0a5" onclick="changeColor(this.value)">
									<label class="form-check-label" for="radioP" style="color:#9ba0a5">기타</label>
								</div>
							</small>
							<input type="hidden" id="color" />
						</div>
						
						<div class="col-md-12 mb-2">
							<label class="form-label" for="memo"><span class="xi-comment-o"></span>&nbsp;일정제목</label>
							<input type="text" class="form-control" id="memo" placeholder="일정제목 입력" />
						</div>
						
						
						<div class="col-md-4">
							<label class="form-label" for="datePicker_start_in"><span class="xi-calendar-check"></span> &nbsp;시작일</label>
							<input type="text" id="datePicker_start_in" placeholder="시작일" class="form-control"/>
						</div>
						
						<div class="col-md-4">
							<label class="form-label"><span class="xi-calendar-remove"></span> &nbsp;종료일</label>
							<input type="text" id="datePicker" placeholder="종료일" class="form-control"/>
							<span class="text-secondary"><small>선택없음 = 종일</small></span>
						</div>
						
						<div class="col-md-4 mb-2">
							<label class="form-label"><span class="xi-time-o"></span> &nbsp;시간</label>
							<input type="text" name="time1" placeholder="시간선택" id="end" class="form-control"/>
						</div>

						<div class="col-md-12 mb-2">
							<label class="form-label"><span class="xi-group"></span> &nbsp;일정참여</label>
							<div id="tex" >
							
							</div>
						</div>

						<div class="col-md-12 mb-2">
							<label class="form-label"><span class="xi-message-o"></span> &nbsp;일정내용</label>
							<textarea id="content" placeholder="내용" class="form-control"></textarea>
						</div>

<!-- 						<div class="col-md-12 mb-2"> -->
<!-- 							<label class="form-label">&bullet; 업무장소 검색/선택 <small class="badge bg-light text-success">검색 후 지도 위 선택</small></label> -->
<!-- 							<div class="map_wrap"> -->
<!-- 								<div id="menu_wrap" class="bg_white"> -->
<!-- 									<div class="option"> -->
<!-- 										<form onsubmit="searchPlaces(); return false;"> -->
<!-- 											<div class="input-group"> -->
											
<!-- 												<input type="text" value="경주시청" id="keyword" size="15" class="form-control">  -->
<!-- 												<button type="submit" class="btn btn-dark">검색</button>  -->
											
<!-- 											</div> -->
<!-- 										</form> -->
<!-- 									</div> -->
<!-- 									<div id="placesList" style="visibility: hidden"></div> -->
<!-- 									<div id="pagination" style="visibility: hidden"></div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div id="map" style="width: 100%; height: 200px;position:relative;overflow:hidden;"></div> -->
							<input type="hidden" id="pInput" /> <input type="hidden" id="lati" />
							<input type="hidden" id="long" /> <input type="hidden" id="undefinedId"/>
<!-- 						</div> -->

						<div class="col-md-6">
							<label class="form-label"><span class="xi-user-o"></span>&nbsp;등록자</label>
							<select id="authorNew" class="form-control">
							</select>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-primary" id="modalY"
						onclick="okay()">등록</button>
					<button class="btn btn-secondary" type="button"
						data-dismiss="modal" id="closeModalBtn" onclick="cancel()">취소</button>
				</div>
			</div>
		</div>
	</div>
	
<div class="modal fade" id="changePwModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="exampleModalLabel" >비밀번호 변경</h4>
				<button class="btn btn-default" type="button" data-dismiss="modal" id="closeModalBtn" onclick="changePwModalCancel()"><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-6">
						ID
						<input id="changePwUserId" type="text" class="form-control" disabled/>
					</div>
					<div class="col-md-6">
						현재 PW
						<input id="changePwUserPw" type="password" class="form-control" /> 
					</div>
					<div class="col-md-6">
						변경할 PW
						<input id="changePwChangePw" type="password" class="form-control" />
					</div>
					<div class="col-md-6">
						변경할 PW 다시 입력
						<input id="changePwChangePw2" type="password" class="form-control" />
					</div>
					
				</div>
			</div>		
			<div class="modal-footer">
				<button class="btn btn-primary blueBtn nodeInsert" id="modalY" onclick="changePw()"><i class="xi-pen"></i>&nbsp;변경</button>
				<button class="btn btn-secondary" type="button" data-dismiss="modal" id="closeModalBtn" onclick="changePwModalCancel()"><i class="xi-close-circle-o"></i>&nbsp;취소</button>
			</div>
		</div>
	</div>
</div>
	
	<script src="/resources/js/jQuery/jquery.3.2.1.min.js"></script>
<!-- 	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=367206e7f756996ede961457360b24ef&libraries=services"></script> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
	<script type="text/javascript" src="/resources/bootstrap-5.0.0-beta1-dist/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="/resources/js/main.js"></script>
	<script type="text/javascript" src="/resources/js/locales-all.js"></script>
	<script type="text/javascript" src="/resources/js/datepickerJs/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="/resources/js/timePickerJs/jquery.timepicker.min.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/cal.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/pickerJs.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/clutter.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/chkbox.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/undefinedCal.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/pastCal.js"></script>
	<script type="text/javascript" src="/resources/js/mainCalJs/timeJs.js"></script>
	<script type="text/javascript" src="/resources/js/lodash.js"></script>
</body>
</html>