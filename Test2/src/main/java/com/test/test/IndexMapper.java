package com.test.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.test.test.vo.CalendarVO;
import com.test.test.vo.LogInfoVO;
import com.test.test.vo.UserVO;
import com.test.test.vo.chkUserVO;

@Mapper
public interface IndexMapper {
	public LogInfoVO calendar(String userId);
	
	public void goPop(CalendarVO indexVO);

	public void chkUserIn(chkUserVO chkUserVo);

	public List<CalendarVO> pastCal(String today);

	public List<chkUserVO> modiChk(int id);

	public void delCheck(int id);

	public int getId(CalendarVO indexVO);

	public List<CalendarVO> event();

	public List<CalendarVO> eventTwo(ArrayList<String> color);

	public CalendarVO latlong(CalendarVO indexVo);

	public List<UserVO> showUser();

	public void del(CalendarVO ivo);

	public void modi(CalendarVO modiVo);

	public CalendarVO idPop(int id);

	public CalendarVO getNm(int id);

	public List<CalendarVO> undefinedInsertView();

	public void updateCal(CalendarVO indexVO);

	public CalendarVO author(int id);
	
	public void changePw(LogInfoVO lvo);
	
	public Map<String, Object> getUserMap(LogInfoVO lvo);
}
