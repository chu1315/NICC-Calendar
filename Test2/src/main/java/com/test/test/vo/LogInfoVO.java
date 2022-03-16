package com.test.test.vo;

import org.apache.ibatis.type.Alias;

@Alias("LogInfoVO")
public class LogInfoVO {
	private int userPk;
	private String userId;
	private String userPw;
	private int log_user;
	
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	
	public int getUserPk() {
		return userPk;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	
	public String getUserPw() {
		return userPw;
	}
	
	public void setLog_user(int log_user) {
		this.log_user = log_user;
	}
	
	public int getLog_user() {
		return log_user;
	}
}

