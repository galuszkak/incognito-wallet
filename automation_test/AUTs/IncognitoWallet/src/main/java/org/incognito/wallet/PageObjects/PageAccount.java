package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageAccount extends PageBase {

	public MobileElement entryAccount(String name) {
		String xpath = "";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	@AndroidFindBy(xpath = "")
	private MobileElement btnImport;

	@AndroidFindBy(xpath = "")
	private MobileElement btnCreate;

	@AndroidFindBy(xpath = "")
	private MobileElement btnSettingKey;
	
	@AndroidFindBy(xpath = "")
	private MobileElement lblAccountName;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btn3Dot;
	

	public PageKeys gotoPageKeys() {
		btnSettingKey.click();
		return new PageKeys();
	}
	
	public boolean isDisplay() {
		return waitForAppear(btnSettingKey) ;
	}
}
