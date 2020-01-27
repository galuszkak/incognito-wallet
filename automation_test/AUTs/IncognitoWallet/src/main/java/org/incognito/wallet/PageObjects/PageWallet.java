package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * @author rocky a sub-page, a tab of PageDefault
 */
public class PageWallet extends PageDefault {

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Add coins to your list']]")
	private MobileElement btnAddCoinToList;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Issue a privacy coin']]")
	private MobileElement btnIssueCoin;

	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@text]]")
	private MobileElement btnSettingGear;
	
	@AndroidFindBy(xpath = "//*[@text and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.widget.ImageView']]")
	private MobileElement txtAccountName;
	

	private MobileElement btnCoinByName(String name) {
		String xpath = "//android.view.ViewGroup/android.widget.TextView[@text='" + name + "']";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	public PageTransaction gotoPageTransaction(String coinName) {
		btnCoinByName(coinName).click();
		return new PageTransaction();
	}
	
	public PageAccount gotoPageAccount () {
		tap(btnSettingGear);
		return new PageAccount();
	}
	
	
	public boolean isDisplay() {
		return 
				waitForAppear(btnSettingGear) &
				scrollToElement(btnIssueCoin) &
				scrollToElement(btnAddCoinToList) &
				super.isDisplay();
	}
	
	public void isAccountNameUpdated(String accName) {
		assertEquals(txtAccountName.getText(), accName);
	}
}
