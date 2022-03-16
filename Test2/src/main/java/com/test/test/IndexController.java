package com.test.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import com.test.test.vo.CalendarVO;
import com.test.test.vo.LogInfoVO;
import com.test.test.vo.UserVO;
import com.test.test.vo.chkUserVO;

@Controller
public class IndexController {

	@Autowired
	IndexService service;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(Locale locale, Model model) {
		return "list";
	}
	
	public String chkLogInAndCookie(HttpSession hs, HttpServletRequest request) {
		Map<String, Object> lvo = (Map<String, Object>)hs.getAttribute("user");
		Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
		if(loginCookie != null) {
			return "calendar";
		} else {
			if(lvo == null) {
				return "login";
			} else {
				return "calendar";
			}
		}
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpSession hs, HttpServletRequest request, Boolean refresh) {
		System.out.println("refresh : " + refresh);
		if(refresh == null || !refresh) {
			return this.chkLogInAndCookie(hs, request);			
		} else {
			return "calendar";
		}
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model, HttpSession hs, HttpServletRequest request) {
		return this.chkLogInAndCookie(hs, request);
	}
	
	@ResponseBody
	@RequestMapping(value = "/calendar", method = RequestMethod.POST)
	public int calendar(LogInfoVO liv, HttpSession hs, @RequestParam("chkCookie")boolean chkCookie,
			HttpServletResponse response) {
		LogInfoVO lvo = service.calendar(liv.getUserId());
		
		if(lvo == null) { // 아이디를 WHERE문으로 써서 없을 경우
			return 1;
		} else if(!(lvo.getUserPw().equals(liv.getUserPw()))) { // 아이디를 WHERE문으로 써서 나왔는데 내가 적은 비밀번호와 디비결과문의 비밀번호가 불일치
			return 2;
		} else if(chkCookie){
			Map<String ,Object> userMap = service.getUserMap(lvo);
			Cookie userCookie = new Cookie("userName", (String) userMap.get("nm"));
			Cookie userCookie2 = new Cookie("userId", (String)userMap.get("userId"));
			Cookie loginCookie = new Cookie("loginCookie", hs.getId());
			loginCookie.setPath("/");
			loginCookie.setMaxAge(60*60*24*7);
			
			userCookie.setPath("/");
			userCookie.setMaxAge(60*60*24*7);
			
			userCookie2.setPath("/");
			userCookie2.setMaxAge(60*60*24*7);
			
			response.addCookie(loginCookie);
			response.addCookie(userCookie);
			response.addCookie(userCookie2);
			hs.setAttribute("user", userMap);
			return 3;
		} else { // 나머지 -> 아이디도 있고, 비밀번호도 일치하는 경우 -> 로그인
				//여기도 세션에 값 넣어줘야함 lvo수정 요망
			Map<String ,Object> userMap = service.getUserMap(lvo);
			Cookie userCookie = new Cookie("userName", (String) userMap.get("nm"));
			Cookie userCookie2 = new Cookie("userId", (String)userMap.get("userId"));
			
			userCookie.setPath("/");
			userCookie.setMaxAge(-1); // -1을 넣으면 세션이 죽으면 쿠키도 죽음
			
			userCookie2.setPath("/");
			userCookie2.setMaxAge(-1);
			
			response.addCookie(userCookie);
			response.addCookie(userCookie2);
			hs.setAttribute("user", userMap);
			return 3;
		}
	}
	
	@RequestMapping(value="/calendar", method=RequestMethod.GET)
	public String goCalendar(HttpSession hs, HttpServletRequest request) {
		return this.chkLogInAndCookie(hs, request);
	}

	@RequestMapping(value = "/pastCal", method = RequestMethod.GET)
	@ResponseBody
	public List<CalendarVO> pastCal(Model model, @RequestParam("today") String today) {
//		System.out.println("pastCal In");
//		System.out.println("pastCal today : " + today);
		List<CalendarVO> list = service.pastCal(today);
		return list;
	}

	@RequestMapping(value = "/showUser", method = RequestMethod.POST)
	@ResponseBody
	public List<UserVO> showUser() {
		List<UserVO> UserList = service.showUser();
		return UserList;
	}

	@RequestMapping(value = "/modiChk", method = RequestMethod.POST)
	@ResponseBody
	public List<chkUserVO> modiChk(CalendarVO calVo) {
		List<chkUserVO> chkUserVoList = service.modiChk(calVo.getId());
		for (int i = 0; i < chkUserVoList.size(); i++) {
		}
		return chkUserVoList;
	}

//	@RequestMapping(value = "/getId", method = RequestMethod.POST)
//	@ResponseBody
//	public int getId(CalendarVO indexVO) {
//		int id = service.getId(indexVO);
//		return id;
//	}

	@RequestMapping(value = "/modal", method = RequestMethod.POST)
	@ResponseBody
	public void goPop(CalendarVO indexVO, @RequestParam(value = "list[]") List<Integer> list) {
		chkUserVO chkUserVo = new chkUserVO();
		
		service.goPop(indexVO);
		System.out.println(indexVO.getId());
		
		chkUserVo.setCalendar_id(indexVO.getId());

		for (int i = 0; i < list.size(); i++) {
			chkUserVo.setC_user_id(list.get(i));
			service.chkUserIn(chkUserVo);
		}
	}

	@ResponseBody
	@RequestMapping(value = "/event", method = RequestMethod.GET)
	public List<CalendarVO> event() {
		List<CalendarVO> list = service.event();

		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getChkSuccess().equals("Y")) {
				list.get(i).setColor("#404040");
			}
		}

		return list;
	}

	@ResponseBody
	@RequestMapping(value = "/eventTwo", method = RequestMethod.GET)
	public List<CalendarVO> eventTwo(@RequestParam("color[]") ArrayList<String> color) {
		
		for(int i = 0; i < color.size();i++) {
			System.out.println(color.get(i));
		}
		
		List<CalendarVO> list = service.eventTwo(color); // 여기에서 문제가 생김.

		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getChkSuccess().equals("Y")) {
				list.get(i).setColor("#404040");
			}

		}
		return list;
	}

	@RequestMapping(value = "/latlong", method = RequestMethod.POST)
	@ResponseBody
	public CalendarVO latlong(CalendarVO indexVo) {
		CalendarVO ind = null;
		try {
			ind = service.latlong(indexVo);
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		return ind;
	}

	@RequestMapping(value = "/detailPastCal", method = RequestMethod.POST)
	@ResponseBody
	public CalendarVO detailPastCal(CalendarVO indexVo) {
		CalendarVO ind = null;
		try {
			ind = service.latlong(indexVo);
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
		return ind;
	}

	@RequestMapping(value = "/modi", method = RequestMethod.POST)
	@ResponseBody
	public void modi(CalendarVO modiVo, @RequestParam(value = "list[]") List<Integer> list) {
		service.delCheck(modiVo.getId());

		chkUserVO chkUserVo = new chkUserVO();
		chkUserVo.setCalendar_id(modiVo.getId());

		for (int i = 0; i < list.size(); i++) {
			chkUserVo.setC_user_id(list.get(i));
			service.chkUserIn(chkUserVo);
		}
		service.modi(modiVo);
	}

	@RequestMapping(value = "/author", method = RequestMethod.POST)
	@ResponseBody
	public CalendarVO author(CalendarVO authorVO) {
		CalendarVO calVO = service.author(authorVO.getId());
//		System.out.println(calVO.getAuthor());
		return calVO;
	}

	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public void del(@RequestParam("id") int id) {
		service.delCheck(id);
		service.del(id);
	}

	@RequestMapping(value = "/undefinedInsertView", method = RequestMethod.GET)
	@ResponseBody
	public List<CalendarVO> undefinedInsertView(Model model, HttpSession hs) {
		List<CalendarVO> undefinedList = service.undefinedInsertView();

		return undefinedList;
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.POST)
	public void logout(HttpSession hs, HttpServletResponse response, HttpServletRequest request) throws IOException {
		hs.invalidate();
		
		Cookie loginCookie = WebUtils.getCookie(request, "loginCookie");
		Cookie userId = WebUtils.getCookie(request, "userId");
		Cookie userName = WebUtils.getCookie(request, "userName");
		if(loginCookie != null) {
			loginCookie.setPath("/");
			loginCookie.setMaxAge(0);
			response.addCookie(loginCookie);
		}
		
		if(userId != null) {
			userId.setPath("/");
			userId.setMaxAge(0);
			response.addCookie(userId);
		}
		
		if(userName != null) {
			userName.setPath("/");
			userName.setMaxAge(0);
			response.addCookie(userName);
		}
		
		request.getSession().invalidate();
	}
	
	@RequestMapping(value="/changePw", method=RequestMethod.POST)
	@ResponseBody
	public int changePw(LogInfoVO liv, @RequestParam String changePw) {
		LogInfoVO lvo = service.calendar(liv.getUserId());
		
		if(lvo == null) { // 아이디를 WHERE문으로 써서 없을 경우
			return 0;
		} else if(!(lvo.getUserPw().equals(liv.getUserPw()))) { // 아이디를 WHERE문으로 써서 나왔는데 내가 적은 비밀번호와 디비결과문의 비밀번호가 불일치
			return 2;
		} else { // 나머지 -> 아이디도 있고, 비밀번호도 일치하는 경우 -> 로그인
			lvo.setUserPw(changePw);
			service.changePw(lvo);
			return 1;
		}
	}
}