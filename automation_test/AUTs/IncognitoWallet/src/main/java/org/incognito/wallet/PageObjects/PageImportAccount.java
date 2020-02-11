package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;

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

	private MobileElement txtAccnNameAtTop(String name) {
		String xpath = "//*[@text='" + name + "']";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	public void editAccountName(String val) {
		tap(btnEdit);
		enter(txtAccountName, val);
	}

	public void importPrivacyKey(String value) throws Exception {
		enter(txtPrivateKey, value);
		tap(btnImport);
		waitUntilElementIsNotVisible(btnImport, 20);
	}

	public void isImportSuccess(String val) throws Exception {
		assertTrue(isElementPresent(txtAccnNameAtTop(val)));
	}

	public void isErrPopupShown() {
		assertTrue(isElementPresent(errPopup));

	}

}
