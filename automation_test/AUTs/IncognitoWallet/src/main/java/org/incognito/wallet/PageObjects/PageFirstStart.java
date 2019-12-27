package org.incognito.wallet.PageObjects;

import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;

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
