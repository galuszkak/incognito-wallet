package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;
import org.springframework.util.Assert;

import com.auto.core.utils.Log;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageAccount extends PageBase {

	public MobileElement entryAccount(String name) {
		String xpath = "";
		return (MobileElement) driver
				.findElement(By.xpath("//*[@text='YOUR ACCOUNTS']//parent::*//*[@text='" + name + "']"));
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

	public void gotoPageImportAccount() {
		tap(btn3dot);
		while (isImportSectionDisplay() == false) {
			if (isImportSectionDisplay()) {
				return;
			} else {
				tap(btn3dot);
			}

		}
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

	public boolean isPageAccountDisplayed() {
		return isElementPresent(btn3dot);
	}

	public void isAccountNameDisplayed(String accName) {
		assertTrue(isElementPresent(entryAccount(accName)), accName + " Should be displayed");

	}

	public void changeNetWork(String val) {
		Log.info("       Change to network " + val);
		tap(fieldAccountDefault, 7);
		if (val == "test" || val == "testnet") {
			tap(txtTestNet);
		} else {
			tap(txtMainNet);
		}
	}

	public void switchAccount(String val) throws Exception {
		PageWallet pageMain = new PageWallet();
		Log.info("       Switch to Account " + val);
		waitUntilElementPresent(entryAccount(val), 10);
		tap(entryAccount(val));
		waitUntilElementPresent(btnBack, 5);
		tap(btnBack);
		pageMain.waitForMainPageDisplayed();

	}
}
