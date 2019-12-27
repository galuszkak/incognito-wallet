package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageWallet extends PageMain {

	@AndroidFindBy (xpath = "//android.widget.TextView[@text='Add coins to your list'")
	private MobileElement btnAddCoinToList;
	
	@AndroidFindBy (xpath = "//android.widget.TextView[@text='Issue a privacy coin'")
	private MobileElement btnIssueCoin;
	
	private MobileElement btnCoinByName(String name) {
		String xpath = "//android.view.ViewGroup/android.widget.TextView[@text='" + name + "']";
		return driver.findElement(By.xpath(xpath));
	}
	
}
