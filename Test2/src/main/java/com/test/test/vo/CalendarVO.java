package com.test.test.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("CalendarVO")
public class CalendarVO {
	private int id;
	private String title;
	private String start;
	private double longtitude;
	private double latitude;
	private String color;
	private String end;
	private String content;
	private String chkSuccess;
	private String nm;
	private String today;
	private String r_dt;
	private String undefinedChk;
	private String author;
	private String team;
	private String resourceEditable;
	private String allDay;
	
	public String getAllDay() {
		return allDay;
	}
	public void setAllDay(String allDay) {
		this.allDay = allDay;
	}
	public String getResourceEditable() {
		return resourceEditable;
	}
	public void setResourceEditable(String resourceEditable) {
		this.resourceEditable = resourceEditable;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getR_dt() {
		return r_dt;
	}
	public void setR_dt(String r_dt) {
		this.r_dt = r_dt;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getUndefinedChk() {
		return undefinedChk;
	}
	public void setUndefinedChk(String undefinedChk) {
		this.undefinedChk = undefinedChk;
	}
	public String getToday() {
		return today;
	}
	public void setToday(String today) {
		this.today = today;
	}
	public String getNm() {
		return nm;
	}
	public void setNm(String nm) {
		this.nm = nm;
	}
	
	public String getChkSuccess() {
		return chkSuccess;
	}
	public void setChkSuccess(String chkSuccess) {
		this.chkSuccess = chkSuccess;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public double getLongtitude() {
		return longtitude;
	}
	public void setLongtitude(double longtitude) {
		this.longtitude = longtitude;
	}
	public double getLattitude() {
		return latitude;
	}
	public void setLattitude(double latitude) {
		this.latitude = latitude;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	
}