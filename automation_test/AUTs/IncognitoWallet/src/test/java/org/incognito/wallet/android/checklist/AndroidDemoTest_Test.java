package org.incognito.wallet.android.checklist;

import org.incognito.wallet.MobileTestBase;
import org.incognito.wallet.PageObjects.PageAccount;
import org.incognito.wallet.PageObjects.PageCreateAccount;
import org.incognito.wallet.PageObjects.PageHome;
import org.incognito.wallet.PageObjects.PageImportAccount;
import org.incognito.wallet.PageObjects.PageKeys;
import org.incognito.wallet.PageObjects.PageSend;
import org.incognito.wallet.PageObjects.PageTransaction;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

import com.auto.core.utils.Log;
import com.auto.core.utils.RandomCharacter;

public class AndroidDemoTest_Test extends MobileTestBase {

	public static String privacyKey = "112t8rnX3532sCMkBxSStrswQ6JGGdJtvQfVca1fNBwKHhtc23oCjqNULYVm7qCQADckz52N4E1h4YVNGSekp3HdFzAZ9De6zbwwUkRwJXbi";
	
	// Account has money
	public static String privacyKey1 = "112t8rnX7STiuEMUaPvfghTNijyeuhE5Q8jSaj5ueGxSLnDTwErUMutCuaNqoZzW95kMXqjrk6g1ihgFHZp4eWRycoYeyfLD9Kqc2aRRaMMq";
	public static String walletAddr1 = "12S5wHbBwt6HVJHGnGt6sJWMGJNMmryWXL4Ydz8RpMPUpgpxtwSGJFARJJg3AGF8ARdARSdNeyL2UyLxvj7FBu7k8Fo9C27VVXwvRqy";
	                
	
	// Account has 10000PRV, 15.1 TOMO
	public static String privacyKeyMain = "112t8rnX35CTQbDxsL7bggAAnKKk9LFGh5d9eK3QpWCFBvVojds1XNzmn21UHjwNPvezLZia4ARgo1T4HDYR79oxuoCZgwZQ1wBmH7p4HRkH";
	public static String walletAddrMain = "12RyJjQgAUCh1GUEdjB1wwEJ3wszT8KLZ1jAeVqY66f3Qj6RAxDRaCaX2CPpXoTybFiR6fmBmanQFYCRZWakS8XPBSTtviT36Yibk4X";									 
	
	
	
	
	@Test(testName = "Verify that user can import and rename an account")
	public void WS002() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapImportAccount();
		
		PageImportAccount pageImport = new PageImportAccount();
		String accountName = pageImport.editAccountName();
		pageImport.importPrivacyKey(privacyKey);
		pageImport.isImportSuccess();
		
//		pageMain.isAccountNameUpdated(accountName);
		pageAccount.isAccountNameDisplayed(accountName);
		takeScreenshot("done_test");
		
	}

	@Test(testName = "Verify that user can not import a duplicated account")
	public void WS004() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapImportAccount();
		
		PageImportAccount pageImport = new PageImportAccount();
		String accountName = pageImport.editAccountName();
		pageImport.importPrivacyKey(privacyKey);
		pageImport.isErrPopupShown();
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can create an account with a valid name")
	public void WS005() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapCreateAccount();
		
		PageCreateAccount pageCreate = new PageCreateAccount();
		RandomCharacter random = new RandomCharacter();
		String accountName = "Phat"+random.getRandomNumericString(3);
		pageCreate.inputAccountName(accountName);
		pageCreate.tapCreateAccount();
		pageCreate.isCreateSuccess(accountName);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can not create an account with blank character or special character only")
	public void WS006() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapCreateAccount();
		
		PageCreateAccount pageCreate = new PageCreateAccount();
		String accountNameWithBlankSpace = " ";
		String accountNameWithSpecialChar = "@#$";
		pageCreate.inputAccountName(accountNameWithBlankSpace);
		pageCreate.tapCreateAccount();
		pageCreate.isErrPopupShown();
		pageCreate.inputAccountName(accountNameWithSpecialChar);
		pageCreate.tapCreateAccount();
		pageCreate.isErrPopupShown();
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can create an account with 50 character")
	public void WS007() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapCreateAccount();
		
		PageCreateAccount pageCreate = new PageCreateAccount();
		RandomCharacter random = new RandomCharacter();
		String name50 = random.getRandomAlphaString(50);
		pageCreate.inputAccountName(name50);
		pageCreate.tapCreateAccount();
		pageCreate.isCreateSuccess(name50);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that can not create a duplicated account name")
	public void WS008() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapCreateAccount();
		
		PageCreateAccount pageCreate = new PageCreateAccount();
		RandomCharacter ranChar = new RandomCharacter();
		String accountName = "Phat"+ranChar.getRandomNumericString(3);
		pageCreate.inputAccountName(accountName);
		pageCreate.tapCreateAccount();
		pageCreate.isCreateSuccess(accountName);
		

		pageMain.gotoPageAccount();
		
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapCreateAccount();
		
		pageCreate.inputAccountName(accountName);
		pageCreate.tapCreateAccount();
		pageCreate.isErrPopupShown();
		
		takeScreenshot("done_test");
	}
	
	//Sending and receiving token
	@Test(testName = "Verify that when sending min PRV, user can send success.")
	public void WS010() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPrivacy();
		
		PageTransaction pageTransaction = new PageTransaction();
		pageTransaction.tapBtnSend();
		
		PageSend pageSend = new PageSend();
		String minAmount = "0.000000001";
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.inputAmount(minAmount);
		String fee = pageSend.getFee();
		pageSend.tapBtnSend();
		pageSend.isSendSuccessfully(minAmount, fee);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending normal PRV, user can send success. ")
	public void WS011() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPrivacy();
		
		PageTransaction pageTransaction = new PageTransaction();
		pageTransaction.tapBtnSend();
		
		PageSend pageSend = new PageSend();
		String minAmount = "1";
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.inputAmount(minAmount);
		String fee = pageSend.getFee();
		pageSend.tapBtnSend();
		pageSend.isSendSuccessfully(minAmount, fee);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max PRV, user can send success. ")
	public void WS012() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPrivacy();
		
		PageTransaction pageTransaction = new PageTransaction();
		pageTransaction.tapBtnSend();
		
		PageSend pageSend = new PageSend();
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.tapBtnMax();
		String maxAmount = pageSend.getMaxAmount();
		String fee = pageSend.getFee();
		pageSend.tapBtnSend();
		pageSend.isSendSuccessfully(maxAmount, fee);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can send BTC success")
	public void WS013() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoBTC();
		
		PageTransaction pageTransaction = new PageTransaction();
		pageTransaction.tapBtnSend();
		
		PageSend pageSend = new PageSend();
		String minAmount = "1";
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.inputAmount(minAmount);
		String fee = pageSend.getFee();
		pageSend.tapBtnSend();
		pageSend.isSendSuccessfully(minAmount, fee);
		
		takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can send Tomo succes")
	public void WS014() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoTOMO();
		
		PageTransaction pageTransaction = new PageTransaction();
		pageTransaction.tapBtnSend();
		
		PageSend pageSend = new PageSend();
		String amount = "";
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.inputAmount(amount);
		pageSend.tapBtnSend();
		
		takeScreenshot("done_test");
	}
	
	

}
