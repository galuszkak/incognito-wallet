package org.incognito.wallet.PageObjects;

import com.auto.PageObjectModel.MobilePageObject;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageBase extends MobilePageObject {

	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@text='Account 0']]")
	protected MobileElement btnBack;
	
	public PageBase goBack() {
		btnBack.click();
		return this;
	}

}
