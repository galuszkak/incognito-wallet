package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertTrue;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageCreateAccount extends PageBase {
	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Create account']]")
	private MobileElement btnCreateAccount;
	
	@AndroidFindBy(xpath = "//*[@class='android.widget.EditText']")
	private MobileElement txtAccountName;
	
	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup']]]]]]/*[@text and @class='android.widget.TextView'])[3]")
	private MobileElement errMes;
	
	public MobileElement entryAccount(String name) {
		return (MobileElement) driver.findElement(By.xpath("//*[@text='"+name+"']"));
	}
	
	public String inputAccountName(String accnName) throws Exception {
		waitUntilElementPresent(txtAccountName, 20);
		enter(txtAccountName, accnName);
		return accnName;
		
	}
	
	public void tapCreateAccount() throws Exception {
		tap(btnCreateAccount);
		waitUntilElementIsNotVisible(btnCreateAccount, 20);
	}
	
	public void isCreateSuccess(String val) {
		assertTrue(isElementPresent(entryAccount(val)));
		
	}
	
	public void isErrPopupShown() {
		assertTrue(isElementPresent(errMes));
	}
	
}
