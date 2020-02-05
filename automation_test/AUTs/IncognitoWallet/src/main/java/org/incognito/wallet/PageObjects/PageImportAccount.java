package org.incognito.wallet.PageObjects;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageImportAccount extends PageBase {
	@AndroidFindBy(xpath = "//*[@text='Edit']")
	private MobileElement btnEdit;
	
	@AndroidFindBy(xpath = "//*[@class='android.widget.EditText' and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup']]")
	private MobileElement txtPrivateKey;
	
	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup']]]]]]/*/*[@class='android.widget.EditText'])[1]")
	private MobileElement txtAccountName;
	
	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Import']]")
	private MobileElement btnImport;
	
	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@text]] and ./*[@text] and ./*[./*[./*[@text]]]]")
	private MobileElement errPopup;
	
	
	
	public String editAccountName() {
		String accountName = "Phat_test";
		tap(btnEdit);
		enter(txtAccountName, accountName);
		return accountName;
		
	}
	
	public void importPrivacyKey(String value) {
		enter(txtPrivateKey,value);
		tap(btnImport);
	}
	
	public void isImportSuccess() {
		
	}
	
	public void isErrPopupShown() {
		isElementPresent(errPopup);
	}
	
}
