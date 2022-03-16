<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/bootstrap-5.0.0-beta1-dist/css/bootstrap.min.css">
<link rel="stylesheet" href="/resources/plugins/xeicon/xeicon.min.css">
<style>
html, body{
	font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #373a3c;
    text-align: left;
    font-family: ones;
}

@font-face{
	font-family:ones;
	src:url('/resources/font/onestoreGodik/oneMob.ttf');
}

.loginBox{
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items:center;
	width:100%;
	height:100vh;
}

.loginItem {
	top:50%;
	left:50%;
    width: 400px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 15px;
}

.customBtn{
	width:100%;
}

.msg{
	color:red;
	text-align:center;
}

label{
	font-weight: bold;
	margin-bottom: 0.5rem;
}

.ncmsMark{
	text-align:center;
	height: 60px;
}
</style>
<title>NICC 일정관리시스템(v0.1.14)</title>
</head>
<body>
		<div class="loginBox">
		<div class="loginItem shadow-lg">
			<div class="calendarMark mb-4">
				<h3 class="mb-3" style="text-align:center;">NICC 일정관리시스템</h3>
				<div><hr class="dropdown-divider"></div>
<!-- 				<h3 style="font-weight:bold;">로그인</h3> -->
<!-- 				<h5>아이디/비밀번호를 입력해주세요</h5> -->
<!-- 				<a href="/"><img src="http://ncms2.nicc.kr/assets/images/common/ncms_logo_dark.png"/></a> -->
			</div>
			
			<div class="form-group">
				<label>아이디</label>
				<input type="text" id="userId" class="form-control userId" placeholder="ID"/>
			</div>
			<br>
			<div class="form-group">
				<label>비밀번호</label>
				<input type="password" class="form-control userPw" placeholder="PASSWORD"/>
			</div>
			<br>
			<div class="form-group">
				<div class="col-md-12">
					<input id="autoLoginChk" type="checkbox" class="form-check-input" />
					<label for="autoLoginChk" class="form-check-label" style="margin-bottom:0px!important;">자동 로그인</label>
				</div>
			</div>
			<br>
			<div class="msg"></div>
			<br>
			<input type="button" value="로그인" class="btn shadow-sm btn-lg btn-block btn-secondary customBtn" onclick="goCal()" />
		</div>
	</div>
<script src="/resources/js/jQuery/jquery.3.2.1.min.js"></script>
<script type="text/javascript" src="/resources/bootstrap-5.0.0-beta1-dist/js/bootstrap.bundle.min.js"></script>
<script src="/resources/js/mainCalJs/login.js"></script>
</body>
</html>