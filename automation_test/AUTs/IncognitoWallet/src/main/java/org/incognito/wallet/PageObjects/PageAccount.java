package org.incognito.wallet.PageObjects;

import org.openqa.selenium.support.ui.ExpectedConditions;

import com.auto.PageObjectModel.MobilePageObject;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageAccount extends MobilePageObject {

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[1]")
	private MobileElement btnWallet;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[2]")
	private MobileElement btnNodes;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[3]")
	private MobileElement btnPapps;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[4]")
	private MobileElement btnPdex;

	public void gotoPdexPage() {
		System.out.println("goto");
		waitForDisplay();
		btnPdex.click();
	}

	public void waitForDisplay() {
		waits().until(ExpectedConditions.visibilityOf(btnPdex));
	}
}
