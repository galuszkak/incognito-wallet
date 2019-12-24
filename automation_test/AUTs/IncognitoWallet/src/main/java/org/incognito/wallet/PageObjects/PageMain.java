package org.incognito.wallet.PageObjects;

import org.openqa.selenium.support.ui.ExpectedConditions;

import com.auto.PageObjectModel.MobilePageObject;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageMain extends MobilePageObject {
	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[1]")
	private MobileElement btnWallet;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[2]")
	private MobileElement btnNodes;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[3]")
	private MobileElement btnPapps;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[4]")
	private MobileElement btnPdex;

	public void waitForDisplay() {
		waits().until(ExpectedConditions.visibilityOf(btnPdex));
	}
	
	public PagePdex gotoPagePdex() {
		waitForDisplay();
		btnPdex.click();
		return new PagePdex();
	}
}
