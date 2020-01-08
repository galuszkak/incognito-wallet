package org.incognito.wallet.PageObjects;

import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;

/**
 * @author rocky
 * only show when open the app for the very first time, this page shows hints, tutorial for the app
 *
 */
public class PageFirstStart extends PageBase {

	@FindBy(xpath = "//android.view.ViewGroup/android.widget.TextView[@text='Next']")
	private MobileElement btnNext;

	@FindBy(xpath = "//android.view.ViewGroup/android.widget.TextView[@text='Okay I got it']")
	private MobileElement btnOkIGotIt;

	public PageWallet gotoPageWallet() {

		isDisplay();
		btnNext.click();
		btnNext.click();
		btnOkIGotIt.click();
		return new PageWallet();
	}

	public boolean isDisplay() {
		return waitForAppear(btnNext);
	}
}
