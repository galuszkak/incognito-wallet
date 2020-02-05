package org.incognito.wallet.PageObjects;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import freemarker.core.ReturnInstruction.Return;
import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageSend extends PageBase {

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup' and ./*[@class='android.widget.TextView']])[2]")
	private MobileElement btnSend;

	@AndroidFindBy(xpath = "//*[@class='android.widget.EditText' and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup' and ./*[@class='android.widget.ImageView']]]")
	private MobileElement txtTo;
							//
	@AndroidFindBy(xpath = "//*[@class='android.widget.EditText' and (./preceding-sibling::* | ./following-sibling::*)[@class='android.view.ViewGroup' and ./*[@text='Max']]]")
	private MobileElement txtAmount;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*/*[@class='android.widget.EditText'])[3]")
	private MobileElement txtMemo;

	@AndroidFindBy(xpath = "//*[@text='Max']")
	private MobileElement btnMax;

	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup' and (./preceding-sibling::* | ./following-sibling::*)[@class='android.widget.EditText']]]")
	private MobileElement btnScanQr;

	@AndroidFindBy(xpath = "//*[@class='android.widget.TextView' and ./parent::*[@class='android.view.ViewGroup' and ./parent::*[@class='android.view.ViewGroup']] and (./preceding-sibling::* | ./following-sibling::*)[./*[@text]]]")
	private MobileElement valueBalance;

	@AndroidFindBy(xpath = "//*[@text='Sent successfully']")
	private MobileElement txtSendSuccessfully;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[9]")
	private MobileElement txtAmountSendSuccessfully;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[11]")
	private MobileElement txtFeeSuccessfully;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[7]")
	private MobileElement test1;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[9]")
	private MobileElement test2;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[6]")
	private MobileElement test3;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[5]")
	private MobileElement test4;

	@AndroidFindBy(xpath = "(//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@text])[11]")
	private MobileElement test5;

	@AndroidFindBy(xpath = "//*[@class='android.view.ViewGroup' and ./*[@text='Back to Wallet']]")
	private MobileElement btnBackToWallet;

	@AndroidFindBy(xpath = "((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[4]/*[@class='android.widget.TextView'])[2]")
	private MobileElement txtFee;

	public void tapBtnSend() {
		swipe("down", 500);
		tap(btnSend);
	}

	public void tapBtnMax() {
		tap(btnMax);
	}

	public void inputWalletAddress(String val) {
		enter(txtTo, val);
	}

	public void inputAmount(String val) {
		enter(txtAmount, val);
	}

	public String getFee() throws InterruptedException {
		waitUntilElementPresent(txtFee, 5);
		return txtFee.getText();
	}
	
	public String getMaxAmount() throws InterruptedException {
		sleep(1000);
		return txtAmount.getText();
	}

	public void isSendSuccessfully(String amount, String fee) throws InterruptedException {
		waitUntilElementPresent(txtSendSuccessfully, 40);
		assertTrue(isElementPresent(txtSendSuccessfully));
		assertEquals(amount, splitPrice(txtAmountSendSuccessfully.getText()),
				"Amount " + amount + " should be displayed.");
		assertEquals(splitPrice(fee), splitPrice(txtFeeSuccessfully.getText()), "Fee " + fee + " should be displayed.");
	}

}
