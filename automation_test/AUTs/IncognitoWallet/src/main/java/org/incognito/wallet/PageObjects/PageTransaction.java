package org.incognito.wallet.PageObjects;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageTransaction extends PageBase {
	@AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.ImageView")
	private MobileElement btnSend;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@class='android.widget.ImageView']] and ./*[@text='RECEIVE']]//parent::*//*[@text='PRV']")
	private MobileElement lblUnit;

	public void tapBtnSend() throws Exception {
		PageSend pSend = new PageSend();
		waitUntilElementPresent(lblUnit, 20);
		tap(btnSend);
		while (true) {
			if (pSend.isPageSendDisplayed()) {
				return;
			} else {
				tap(btnSend);
			}
		}
	}

	public boolean isPagePresent() throws Exception {
		return isElementPresent(btnSend);
	}

}
