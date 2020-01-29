package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageCreateAccount extends PageBase {
	@AndroidFindBy(xpath = "//*[@text='Edit']")
	private MobileElement btnCreateAccount;
	
	@AndroidFindBy(xpath = "//*[@class='android.widget.EditText' and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup']]")
	private MobileElement txtAccountName;
	
	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup']]]]]]/*[@text and @class='android.widget.TextView'])[3]")
	private MobileElement errMes;
	
	public MobileElement entryAccount(String name) {
		return (MobileElement) driver.findElement(By.xpath("//*[@text='"+name+"']"));
	}
	
	public String inputAccountName(String accnName) {
		enter(txtAccountName, accnName);
		return accnName;
		
	}
	
	public void tapCreateAccount() {
		tap(btnCreateAccount);
	}
	
	public void isCreateSuccess(String val) {
		isElementPresent(entryAccount(val));
	}
	
	public void isErrPopupShown() {
		isElementPresent(errMes);
	}
	
}
