package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * @author rocky a sub-page, a tab of PageDefault
 */
public class PageWallet extends PageDefault {

	@AndroidFindBy(xpath = "//android.widget.TextView[@text='Add coins to your list'")
	private MobileElement btnAddCoinToList;

	@AndroidFindBy(xpath = "//android.widget.TextView[@text='Issue a privacy coin'")
	private MobileElement btnIssueCoin;

	@AndroidFindBy(xpath = "")
	private MobileElement btnSettingGear;

	private MobileElement btnCoinByName(String name) {
		String xpath = "//android.view.ViewGroup/android.widget.TextView[@text='" + name + "']";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	public PageTransaction gotoPageTransaction(String coinName) {
		btnCoinByName(coinName).click();
		return new PageTransaction();
	}
	
	public PageAccount  gotoPageAccount () {
		btnSettingGear.click();
		return new PageAccount();
	}
	
	public boolean isDisplay() {
		return waitForAppear(btnSettingGear) &
				waitForAppear(btnIssueCoin) &
				waitForAppear(btnAddCoinToList) &
				super.isDisplay();
	}
}
