package org.incognito.web.PageObjects;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.auto.PageObjectModel.WebPageObject;

public class PageSample extends WebPageObject {

	public PageSample() {
		this.pageUrl = "https://google.com";
	}
	
	@FindBy(xpath = "//input[@role='combobox']")
	WebElement searchBox;
	
	@FindBy(xpath = "//div[@class='FPdoLc tfB0Bf']//input[@name='btnK']")
	WebElement btnSearch;
	
	public PageSample search(String string) {
		waits().until(ExpectedConditions.visibilityOf(searchBox));
		searchBox.sendKeys(string);
		btnSearch.click();
		return this;
	}
}
