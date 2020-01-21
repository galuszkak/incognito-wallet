package org.incognito.wallet.PageObjects;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageSetting extends PageBase {
	@AndroidFindBy(xpath = "((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[1]/*/*[@text and ./parent::*[@class='android.view.ViewGroup']])[1]")
	private MobileElement btn3dot;
	
	@AndroidFindBy(xpath = "//*[@text='Import']")
	private MobileElement txtImport;
	
	
}
