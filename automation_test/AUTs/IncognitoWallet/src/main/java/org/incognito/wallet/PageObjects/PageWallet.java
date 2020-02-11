package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.selendroid.androiddriver.R.string;
import com.auto.core.utils.Log;

/**
 * @author rocky a sub-page, a tab of PageDefault
 */
public class PageWallet extends PageHome {

	@AndroidFindBy(xpath = "//*[@text='Add coins to your list']")
	private MobileElement btnAddCoinToList;

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

	private MobileElement lblCoinItem(String name) {
		String xpath = "//*[@class='android.view.ViewGroup' and ./*[./*[@class='android.widget.ImageView']] and ./*[@text='"
				+ name + "']]";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

	private MobileElement btnCoinByName(String name) {
		String xpath = "//android.view.ViewGroup/android.widget.TextView[@text='" + name + "']";
		return (MobileElement) driver.findElement(By.xpath(xpath));
	}

//	private MobileElement lblCoinBalance(String name) {
//		String xpath = "//*[@text='" + name + "']//parent::*//*[@class='android.widget.TextView'][3]";
//		return (MobileElement) driver.findElement(By.xpath(xpath));
//	}

	@AndroidFindBy(xpath = "//*[@text='Privacy']//parent::*//*[@class='android.widget.TextView'][3]")
	private MobileElement lblPrivacyCoinBalance;

	@AndroidFindBy(xpath = "(((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[2]/*[@class='android.view.ViewGroup'])[1]/*[@text])[3]")
	private MobileElement lblPRVUnit;

	public void gotoPageTransaction(String coinName) {
		tap(btnCoinByName(coinName));
	}

	public boolean waitForMainPageDisplayed() throws Exception {
		Log.info("       Waiting for Wallet Screen ...");
		return waitUntilElementPresent(lblPRVUnit, 100);
	}

	public void gotoPageAccount() {
		PageAccount pAccn = new PageAccount();
		Log.info("       Go to Page Account");
		tap(btnSettingGear, 4);
		while (true) {
			if (pAccn.isPageAccountDisplayed()) {
				Log.info("       Page Account is shown");
				return;
			} else {
				Log.info("       Page Acccount not shown -> tap Button again");
				tap(btnSettingGear, 5);
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

	public void gotoCoinItem(String coin) throws Exception {
//		swipe("up", 500);
		waitUntilElementPresent(lblCoinItem(coin), 20);
		tap(lblCoinItem(coin));
		PageTransaction pTran = new PageTransaction();
		while (true) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(lblCoinItem(coin));
			}

		}
	}

	public void gotoPrivacy() throws Exception {
//		swipe("up", 500);
		waitUntilElementPresent(itemPrivacy, 100);
		tap(itemPrivacy);
		PageTransaction pTran = new PageTransaction();
		while (true) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(itemPrivacy);
			}
		}
	}

	public void gotoBTC() throws Exception {
		swipe("up", 500);
		tap(itemBTC);
		PageTransaction pTran = new PageTransaction();
		while (true) {
			if (pTran.isPagePresent())
				return;
			else {
				tap(itemBTC);
			}

		}
	}

	public String getCoinBalance(String coin) throws Exception {
		PageSend pageSend = new PageSend();
		PageTransaction pageTransaction = new PageTransaction();
//		while(btnBack.isDisplayed()) {
//			tap(btnBack);
//		}
		gotoCoinItem(coin);
		pageTransaction.tapBtnSend();
		pageSend.tapBtnMax();
		String balance = pageSend.getAmount();
//		while(btnBack.isDisplayed()) {
//			tap(btnBack);
//		}
		return balance;
	}

	public String getPrivacyCoinBalanceOnWalletScreen(String val) throws Exception {
		waitUntilElementPresent(lblPrivacyCoinBalance, 100);
		boolean flag = false;
		while (!flag) {
			if (lblPrivacyCoinBalance.getText() == val) {
				flag = true;
			} else {
				sleep(5000);
				swipe("up", 2000);
				sleep(5000);
				swipe("up", 2000);
				sleep(5000);
			}
		}
//		waitUntilElementPresent(lblPrivacyCoinBalance, 100);
//		swipe("up", 2000);
//		sleep(10000);
//		waitUntilElementPresent(lblPrivacyCoinBalance, 100);
//		swipe("up", 2000);
//		sleep(10000);
//		waitUntilElementPresent(lblPrivacyCoinBalance, 100);
//		
//		return splitPrice(getText(lblPrivacyCoinBalance));
		return splitPrice(getText(lblPrivacyCoinBalance));
	}

	public void gotoTOMO() throws Exception {
		swipe("down", 500);
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
