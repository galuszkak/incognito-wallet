package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageAccount extends PageBase {

	public MobileElement entryAccount(String name) {
		String xpath = "";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}
	
	@AndroidFindBy(xpath = "((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[1]/*/*[@text and ./parent::*[@class='android.view.ViewGroup']])[1]")
	private MobileElement btn3dot;
	
	@AndroidFindBy(xpath = "//*[@text='Import']")
	private MobileElement txtImport;

//	@AndroidFindBy(xpath = "")
//	private MobileElement btnCreate;
//
//	@AndroidFindBy(xpath = "")
//	private MobileElement btnSettingKey;
//	
//	@AndroidFindBy(xpath = "")
//	private MobileElement lblAccountName;
//	
//	@AndroidFindBy(xpath = "")
//	private MobileElement btn3Dot;
	

	public PageImportAccount gotoPageImportAccount() {
		btn3dot.click();
		return new PageImportAccount();
	}
	
	public boolean isImportSectionDisplay() {
		return waitForAppear(txtImport) ;
	}
	
	public void tapImportAccount() {
		txtImport.click();
	}
	
	public void isAccountNameDisplayed(String accName) {
		waitForAppear(entryAccount(accName));
	}
}
