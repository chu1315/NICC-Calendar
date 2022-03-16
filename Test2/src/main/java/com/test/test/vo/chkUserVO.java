package com.test.test.vo;

import org.apache.ibatis.type.Alias;

@Alias("chkUserVO")
public class chkUserVO {
	private int id;
	private int chkUser_id;
	private int calendar_id;
	private int c_user_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getChkUser_id() {
		return chkUser_id;
	}
	public void setChkUser_id(int chkUser_id) {
		this.chkUser_id = chkUser_id;
	}
	public int getCalendar_id() {
		return calendar_id;
	}
	public void setCalendar_id(int calendar_id) {
		this.calendar_id = calendar_id;
	}
	public int getC_user_id() {
		return c_user_id;
	}
	public void setC_user_id(int c_user_id) {
		this.c_user_id = c_user_id;
	}
	
}
