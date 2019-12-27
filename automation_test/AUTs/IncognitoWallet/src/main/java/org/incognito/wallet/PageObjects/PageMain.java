package org.incognito.wallet.PageObjects;

import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import io.appium.java_client.MobileElement;

public class PageMain extends PageBase {
	@FindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[1]")
	private MobileElement btnWallet;

	@FindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[2]")
	private MobileElement btnNodes;

	@FindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[3]")
	private MobileElement btnPapps;

	@FindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[4]")
	private MobileElement btnPdex;

	public void waitForDisplay() {
		waits().until(ExpectedConditions.visibilityOf(btnPdex));
	}

	public PagePdex gotoPagePdex() {
		waitForDisplay();
		btnPdex.click();
		return new PagePdex();
	}
	
	public PageNodes gotoPageNode() {
		waitForDisplay();
		btnNodes.click();
		return new PageNodes();
	}
	
	public PagePapps gotoPagePapps() {
		waitForDisplay();
		btnPapps.click();
		return new PagePapps();
	}
	
	public PageWallet gotoPageWallet() {
		waitForDisplay();
		btnWallet.click();
		return new PageWallet();
	}
}
