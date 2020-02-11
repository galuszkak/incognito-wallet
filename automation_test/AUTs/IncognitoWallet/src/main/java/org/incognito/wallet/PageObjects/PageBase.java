package org.incognito.wallet.PageObjects;

import com.auto.PageObjectModel.MobilePageObject;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import com.auto.core.utils.Log;

public class PageBase extends MobilePageObject {

	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup']]")
	protected MobileElement btnBack;
	
	public PageBase goBack() throws Exception {
		Log.info("       Tap on Back button");
		tap(btnBack);
		sleep(1000);
		return this;
	}

}
