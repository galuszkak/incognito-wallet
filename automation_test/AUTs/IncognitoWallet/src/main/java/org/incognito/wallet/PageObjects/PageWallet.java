package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * @author rocky a sub-page, a tab of PageDefault
 */
public class PageWallet extends PageHome {

//	@AndroidFindBy(xpath = "//*[@contentDescription='ico_add_coins_to_your_list']")
//	private MobileElement btnAddCoinToList;

	@AndroidFindBy(xpath = "//*[@text='Add coins to your list']")
	private MobileElement btnAddCoinToList;

//	@AndroidFindBy(xpath = "//*[@contentDescription='btn_issue_a_privacy_coin']")
//	private MobileElement btnIssueCoin;

	@AndroidFindBy(xpath = "//*[@text='Issue a privacy coin']")
	private MobileElement btnIssueCoin;

	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@text]]")
	private MobileElement btnSettingGear;

	@AndroidFindBy(xpath = "//*[@text and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.widget.ImageView']]")
	private MobileElement txtAccountName;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@class='android.widget.ImageView']] and ./*[@text='Privacy']]")
	private MobileElement itemPrivacy;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@class='android.widget.ImageView']] and ./*[@text='Privacy BTC']]")
	private MobileElement itemBTC;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@class='android.widget.ImageView']] and ./*[@text='Privacy TOMO']]")
	private MobileElement itemTOMO;

	private MobileElement btnCoinByName(String name) {
		String xpath = "//android.view.ViewGroup/android.widget.TextView[@text='" + name + "']";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	@AndroidFindBy(xpath = "(((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[2]/*[@class='android.view.ViewGroup'])[1]/*[@text])[3]")
	private MobileElement lblPRVUnit;

	public void gotoPageTransaction(String coinName) {
		tap(btnCoinByName(coinName));
	}

	public void gotoPageAccount() {
		PageAccount pAccn = new PageAccount();
		tap(btnSettingGear);
		while (pAccn.isImportSectionDisplay() == false) {
			if (pAccn.isImportSectionDisplay()) {
				return;
			} else {
				tap(btnSettingGear);
			}

		}
	}

	public boolean isDisplay() throws Exception {
		return super.isDisplay() & waitForAppear(btnSettingGear) & scrollToElement(btnIssueCoin)
				& scrollToElement(btnAddCoinToList);

	}

	public void isAccountNameUpdated(String accName) {
		assertEquals(txtAccountName.getText(), accName);
	}

	public void gotoPrivacy() throws InterruptedException {
		swipe("up", 500);
		tap(itemPrivacy);
		PageTransaction pTran = new PageTransaction();
		while (pTran.isPagePresent() == false) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(itemPrivacy);
			}

		}
	}

	public void gotoBTC() throws InterruptedException {
		swipe("up", 500);
		tap(itemBTC);
		PageTransaction pTran = new PageTransaction();
		while (pTran.isPagePresent() == false) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(itemBTC);
			}

		}
	}

	public void gotoTOMO() throws InterruptedException {
		swipe("up", 500);
		tap(itemTOMO);
		PageTransaction pTran = new PageTransaction();
		while (pTran.isPagePresent() == false) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(itemTOMO);
			}

		}

	}
}
