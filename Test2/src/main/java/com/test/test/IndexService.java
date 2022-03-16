package com.test.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.vo.CalendarVO;
import com.test.test.vo.LogInfoVO;
import com.test.test.vo.UserVO;
import com.test.test.vo.chkUserVO;

@Service
public class IndexService {
	@Autowired
	IndexMapper mapper;
	
	public LogInfoVO calendar(String userId) {
		return mapper.calendar(userId);
	}
	
	public void goPop(CalendarVO indexVO) {
		mapper.goPop(indexVO);
	}

	public void chkUserIn(chkUserVO chkUserVo) {
		mapper.chkUserIn(chkUserVo);
	}

	public List<CalendarVO> pastCal(String today) {
		return mapper.pastCal(today);
	}

	public CalendarVO author(int id) {
		return mapper.author(id);
	}

//	public int getId(CalendarVO indexVO) {
//		return mapper.getId(indexVO);
//	}

	public void delCheck(int id) {
		mapper.delCheck(id);
	}

	public List<chkUserVO> modiChk(int id) {
		return mapper.modiChk(id);
	}

	public List<UserVO> showUser() {
		return mapper.showUser();
	}

	public List<CalendarVO> event() {

		return mapper.event();
	}

	public List<CalendarVO> eventTwo(ArrayList<String> color) {
//		System.out.println("service들어옴");

		return mapper.eventTwo(color);
	}

	public CalendarVO getNm(int id) {
		return mapper.getNm(id);
	}

	public CalendarVO idPop(int id) {
		CalendarVO indexVo = mapper.idPop(id);
		return indexVo;
	}

	public CalendarVO latlong(CalendarVO indexVo) {
		return mapper.latlong(indexVo);
	}

	public void del(int id) {
		CalendarVO ivo = new CalendarVO();
		ivo.setId(id);

		mapper.del(ivo);
	}

	public void modi(CalendarVO modiVo) {

		mapper.modi(modiVo);
	}

	public List<CalendarVO> undefinedInsertView() {
		List<CalendarVO> undefinedList = mapper.undefinedInsertView();

		return undefinedList;
	}

	public void updateCal(CalendarVO indexVO) {
		mapper.updateCal(indexVO);
	}
	
	public void changePw(LogInfoVO lvo) {
		mapper.changePw(lvo);
	}
	
	public Map<String, Object> getUserMap(LogInfoVO lvo){
		return mapper.getUserMap(lvo);
	}

}// class