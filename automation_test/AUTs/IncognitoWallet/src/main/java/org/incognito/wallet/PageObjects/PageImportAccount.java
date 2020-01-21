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
	
	
	
	
	public String editAccountName() {
		String accountName = "Phat_test";
		btnEdit.click();
		enter(txtAccountName, accountName);
		return accountName;
		
	}
	
	public void importPrivacyKey() {
		txtPrivateKey.sendKeys("112t8rnX3532sCMkBxSStrswQ6JGGdJtvQfVca1fNBwKHhtc23oCjqNULYVm7qCQADckz52N4E1h4YVNGSekp3HdFzAZ9De6zbwwUkRwJXbi");
		btnImport.click();
	}
	
	public void isImportSuccess() {
		
	}
	
	
}
