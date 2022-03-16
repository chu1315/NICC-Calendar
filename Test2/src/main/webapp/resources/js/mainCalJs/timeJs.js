
$(document).ready(function(){
	printClock();
	
})
function printClock() {
    var clock = document.getElementById("clock");
    var currentDate = new Date();
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours(),2); 
    var currentMinute = addZeros(currentDate.getMinutes() ,2);
    var currentSeconds =  addZeros(currentDate.getSeconds(),2);

	if(24 > currentHours && currentHours >= 12){ //조건문 제대로 적기
		amPm = 'PM';
	} else if (currentHours == 24){
		amPm = 'AM';
	} 
	
    if(24 > currentHours && currentHours> 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    	amPm = 'PM';	
    	currentHours = addZeros(currentHours - 12,2);
    }

    clock.innerHTML = currentHours+":"+currentMinute+":" + currentSeconds+" <span>"+ amPm+"</span>"; //날짜를 출력해 줌
    
    setTimeout("printClock()",1000);
}
function addZeros(num, digit) { // 자릿수 맞춰주기 2자리 이하일 경우 0을 더해준다
	  var zero = '';
	  num = num.toString();
	  if (num.length < digit) {
	    for (i = 0; i < digit - num.length; i++) {
	      zero += '0';
	    }
	  }
	  return zero + num;
}