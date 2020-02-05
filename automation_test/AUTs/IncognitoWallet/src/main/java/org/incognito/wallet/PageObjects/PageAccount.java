package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;
import org.springframework.util.Assert;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageAccount extends PageBase {

	public MobileElement entryAccount(String name) {
		String xpath = "";
		return (MobileElement) driver.findElement(By.xpath("//*[@text='" + name + "']"));
	}

	@AndroidFindBy(xpath = "((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[1]/*/*[@text and ./parent::*[@class='android.view.ViewGroup']])[1]")
	private MobileElement btn3dot;

	@AndroidFindBy(xpath = "//*[@text='Import']")
	private MobileElement txtImportAccn;

	@AndroidFindBy(xpath = "//*[@text='Create']")
	private MobileElement txtCreateAccn;

	@AndroidFindBy(xpath = "(((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[1]/*/*/*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup']]])[1]/*[@class='android.view.ViewGroup' and ./*[@text]])[1]")
	private MobileElement fieldAccountDefault;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Testnet']]")
	private MobileElement txtTestNet;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Mainnet']]")
	private MobileElement txtMainNet;

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
		tap(btn3dot);
		return new PageImportAccount();
	}

	public boolean isImportSectionDisplay() {
		return waitForAppear(txtImportAccn);
	}

	public void tapImportAccount() {
		tap(txtImportAccn);
	}

	public void tapCreateAccount() {
		tap(txtCreateAccn);
	}

	public void isAccountNameDisplayed(String accName) {
		assertTrue(isElementPresent(entryAccount(accName)), accName + " Should be displayed");

	}

	public void changeNetWork(String val) {
		tap(fieldAccountDefault, 7);
		if (val == "test" || val == "testnet") {
			tap(txtTestNet);
		} else {
			tap(txtMainNet);
		}
	}
}
