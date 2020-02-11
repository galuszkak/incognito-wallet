package org.incognito.wallet.android.checklist;

import java.util.HashMap;
import java.util.Map;

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

import com.auto.core.utils.FileUtils;
import com.auto.core.utils.RandomCharacter;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

public class AndroidDemoTest extends MobileTestBase {

	public static String privacyKey = "112t8rnX3532sCMkBxSStrswQ6JGGdJtvQfVca1fNBwKHhtc23oCjqNULYVm7qCQADckz52N4E1h4YVNGSekp3HdFzAZ9De6zbwwUkRwJXbi";
	
	// Account has money
	public static String privacyKey1 = "112t8rnX7STiuEMUaPvfghTNijyeuhE5Q8jSaj5ueGxSLnDTwErUMutCuaNqoZzW95kMXqjrk6g1ihgFHZp4eWRycoYeyfLD9Kqc2aRRaMMq";
	public static String walletAddr1 = "12S5wHbBwt6HVJHGnGt6sJWMGJNMmryWXL4Ydz8RpMPUpgpxtwSGJFARJJg3AGF8ARdARSdNeyL2UyLxvj7FBu7k8Fo9C27VVXwvRqy";
	public static String accountName = "Phat_le";                
	
	// Account has 10000PRV, 15.1 TOMO
	public static String privacyKeyMain = "112t8rnX35CTQbDxsL7bggAAnKKk9LFGh5d9eK3QpWCFBvVojds1XNzmn21UHjwNPvezLZia4ARgo1T4HDYR79oxuoCZgwZQ1wBmH7p4HRkH";
	public static String walletAddrMain = "12RyJjQgAUCh1GUEdjB1wwEJ3wszT8KLZ1jAeVqY66f3Qj6RAxDRaCaX2CPpXoTybFiR6fmBmanQFYCRZWakS8XPBSTtviT36Yibk4X";									 
	public static String accountNameMain = "Phat_le_2";
	
	public static Map<String,Object> ancestorMapTestcases = new HashMap<String, Object>();
	public static Map<String,Object> ancestorMapAccounts = new HashMap<String, Object>();
	
	public static JSONObject parentTestcases = new JSONObject();
	public static JSONObject parentAccounts = new JSONObject();
	
	//Setting Account
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
		pageImport.editAccountName(accountName);
		pageImport.importPrivacyKey(privacyKey);
		pageImport.isImportSuccess(accountName);
		pageAccount.isAccountNameDisplayed(accountName);
		
		pageMain.gotoPageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapImportAccount();
		
		
		pageImport.editAccountName(accountNameMain);
		pageImport.importPrivacyKey(privacyKeyMain);
		pageImport.isImportSuccess(accountNameMain);
		pageAccount.isAccountNameDisplayed(accountNameMain);

		
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
		pageImport.editAccountName(accountName);
		pageImport.importPrivacyKey(privacyKey);
		pageImport.isErrPopupShown();
		
		//takeScreenshot("done_test");
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
		
		//takeScreenshot("done_test");
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
		
		//takeScreenshot("done_test");
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
		
		//takeScreenshot("done_test");
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
		
//		//takeScreenshot("done_test");
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
		
		//takeScreenshot("done_test");
	}
	
	@SuppressWarnings("unchecked")
	@Test(testName = "Verify that when sending max PRV, user can send success. ")
	public void WS012() throws Exception {
		PageTransaction pageTransaction = new PageTransaction();
		PageAccount pageAccn = new PageAccount();
		PageWallet pageMain  = new PageWallet();
		PageSend pageSend    = new PageSend();
		FileUtils file = new FileUtils();
//		Map<String, String> ws012 = new HashMap<String, String>();
//		Map<String, Object> ws013 = new HashMap<String, Object>();
//		ws012.put("AccnName", accountName);
//		ws012.put("MaxAmmount", "999999999");
//		ws013.put("ws012", ws012);
		
		JSONObject ws012 = new JSONObject();
		JSONObject ws013 = new JSONObject();
		JSONObject ws014 = new JSONObject();
		JSONObject ws015 = new JSONObject();
		ws012.put("AccnName", accountNameMain);
		ws012.put("MaxSend", "999999999");
		ws013.put("AccnName", accountNameMain);
		ws013.put("MaxSend", "999999999");
		ws014.put("AccnName", accountNameMain);
		ws014.put("MaxSend", "999999999");
		ws015.put("AccnName", accountNameMain);
		ws015.put("MaxSend", "999999999");
		
		parentTestcases.put("ws012", ws012);
		parentTestcases.put("ws013", ws013);
		parentTestcases.put("ws014", ws014);
		parentTestcases.put("ws015", ws015);
		
		file.writeToFile(parentTestcases);
		
		pageMain.gotoPageAccount();
		pageAccn.switchAccount(accountNameMain);
		ws012.put("AccnName", accountNameMain);
		pageMain.gotoPrivacy();
		pageTransaction.tapBtnSend();
		pageSend.inputWalletAddress(walletAddr1);
		pageSend.tapBtnMax();
		String fee = pageSend.getFee();
		//tap max again to calculate fee
		pageSend.tapBtnMax();
		String maxAmountWithoutFee = pageSend.getAmount();
		String maxAmount = pageSend.calculateActualPriceSend(maxAmountWithoutFee, fee);
		ws012.put("MaxAmount", maxAmount);
		ancestorMapTestcases.put("ws012", ws012);
		pageSend.tapBtnSend();
		pageSend.backToWalletScreen();
		
		
		// send money back to main account
		/*String balanceAfterSendMax = pageMain.getPrivacyCoinBalanceOnWalletScreen("Privacy");
		pageSend.isValueEqual(balanceAfterSendMax, "0");
		pageMain.gotoPageAccount();
		pageAccn.switchAccount(accountName);
		pageMain.gotoPrivacy();
		
		pageTransaction.tapBtnSend();
		
		pageSend.inputWalletAddress(walletAddrMain);
		pageSend.tapBtnMax();
		maxAmount = pageSend.getAmount();
		fee = pageSend.getFee();
		pageSend.tapBtnMax();
		pageSend.tapBtnSend();
		pageSend.backToWalletScreen();
		String balanceSecondAccnBeforeSend = pageMain.getPrivacyCoinBalanceOnWalletScreen("Privacy");
		pageSend.isValueEqual(balanceSecondAccnBeforeSend, "0");
		
		pageMain.gotoPageAccount();
		pageAccn.switchAccount(accountNameMain);
		
		//Check main account after send back

		pageMain.gotoPrivacy();
		pageTransaction.tapBtnSend();
		
		pageSend.inputWalletAddress(walletAddrMain);
		pageSend.tapBtnMax();
		String maxAmountAfterSend = pageSend.getAmount();
		pageSend.isValueEqual(maxAmountAfterSend, maxAmount);
		*/
		
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
		
		//takeScreenshot("done_test");
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min stable coin and paying fee by PRV, user can send success.( Stable coin : Usdt, Dai...)")
	public void WS015() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min stable coin and paying fee by stable coin if this coin has pair with PRV >=10000, user can send success.( Stable coin : Usdt, Dai...)")
	public void WS016() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending stable coin, User canNOT pay fee by this coin if this coin has pair with PRV <10000( Stable coin : Usdt, Dai...)")
	public void WS017() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max stable coin and paying fee by PRV, user can send success.( Stable coin : Usdt, Dai...)")
	public void WS018() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max stable coin and paying fee by stable coin if this coin has pair with PRV >=10000, user can send success.( Stable coin : Usdt, Dai...)")
	public void WS019() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min ETH(ERC20) and paying fee by PRV, user can send success.( Coin : ETH, ERC20 network..)")
	public void WS020() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min ETH(ERC20) and paying fee by stable coin if this coin has pair with PRV >=10000, user can send success.( ETH, ERC20 network...)")
	public void WS021() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending ETH(ERC20), user cannot pay fee by this coin if this coin has pair with PRV <10000( ETH, ERC20 network...)")
	public void WS022() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max ETH(ERC20) and paying fee by PRV, user can send success.( Coin ETH, ERC20 network...)")
	public void WS023() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max ETH(ERC20)and paying fee by itself if this coin has pair with PRV >=10000, user can send success.( Coin ETH, ERC20 network...)")
	public void WS024() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min BEP 2 and paying fee by PRV, user can send success.( Coin : BEP2 network..)")
	public void WS025() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min BEP 2 and paying fee by this coin if this coin has pair with PRV >=10000, user can send success.( Coin : BEP2 network..)")
	public void WS026() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending BEP 2, User cannot pay fee by this coin if this coin has pair with PRV <10000( Coin : BEP2 network..)")
	public void WS027() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max BEP 2 and paying fee by PRV, user can send success.( Coin : BEP2 network..)")
	public void WS028() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	
	@Test(testName = "Verify that when sending max BEP 2 and paying fee by this coin if this coin has pair with PRV >=10000, user can send success.( Coin : BEP2 network..)")
	public void WS029() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min token incognito  and paying fee by PRV, user can send success.( Coin : Incognito network..)")
	public void WS030() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min token incognito and paying fee by  this coin if this coin has pair with PRV >=10000 user can send success.( Coin : Incognito network..)")
	public void WS031() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending min token incognito , User cannot pay fee by  this coin if this coin has pair with PRV <10000 .( Coin : Incognito network..)")
	public void WS032() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
		
	@Test(testName = "Verify that when sending max token incognito and paying fee by PRV, user can send success.( Coin : Incognito network..)")
	public void WS033() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending max token incognito and paying fee by this coin,if this coin has pair with PRV >=10000 ( Coin : Incognito network..)")
	public void WS034() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
		
	@Test(testName = "Verify that User can receive after sending completed for 5 min. (Need reload page)")
	public void WS035() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when sending money, the status is shown( Pending, completed, failed) ")
	public void WS036() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	//Withdrawing
	@Test(testName = "Verify that when user can withdraw with min stable coin and pay fee by PRV")
	public void WS037() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with stable coin and pay fee by this coin if if this coin has pair with PRV >=10000")
	public void WS038() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
					
	@Test(testName = "Verify that when withdrawing with stable coin, user cannot pay fee by this coin if if this coin has pair with PRV < 10000")
	public void WS039() throws Exception {
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
		
		//takeScreenshot("done_test");
	}			
			
	@Test(testName = "Verify that user can withdraw with max stable coin")
	public void WS040() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with min ETH(ERC20 network) and pay fee by PRV")
	public void WS041() throws Exception {
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
		
		//takeScreenshot("done_test");
	}	
	
	@Test(testName = "Verify that when user can withdraw with ETH(ERC20 network) and pay fee by this coin if if this coin has pair with PRV >=10000")
	public void WS042() throws Exception {
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
		
		//takeScreenshot("done_test");
	}	
	
	@Test(testName = "Verify that when withdrawing with ETH(ERC20 network), user cannot pay fee by this coin if if this coin has pair with PRV < 10000")
	public void WS043() throws Exception {
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
		
		//takeScreenshot("done_test");
	}	
	
	@Test(testName = "Verify that user can withdraw with max ETH(ERC20 network)")
	public void WS044() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with min BEP2 coin and pay fee by PRV")
	public void WS045() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	
	@Test(testName = "Verify that when user can withdraw with BEP2 coin and pay fee by this coin if if this coin has pair with PRV >=10000")
	public void WS046() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
		
	@Test(testName = "Verify that when withdrawing with BEP2 coin, user cannot pay fee by this coin if if this coin has pair with PRV < 10000")
	public void WS047() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can withdraw with max BEP2 coin")
	public void WS048() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with min BTC coin  and pay fee by PRV")
	public void WS049() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with BTC coinand pay fee by this coin if if this coin has pair with PRV >=10000")
	public void WS050() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when withdrawing with BTC coin, user cannot pay fee by this coin if if this coin has pair with PRV < 10000")
	public void WS051() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can withdraw with max BTC coin")
	public void WS052() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with min TOMO coin  and pay fee by PRV")
	public void WS053() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user can withdraw with TOMO coin and pay fee by this coin if if this coin has pair with PRV >=10000")
	public void WS054() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when withdrawing with TOMO coin, user cannot pay fee by this coin if if this coin has pair with PRV < 10000")
	public void WS055() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can withdraw with max TOMO coin")
	public void WS056() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when withdrawing which has status completed, User can receive money. ")
	public void WS057() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	//Deposit

	@Test(testName = "Verify that when user clicks deposit, the address is created which is expired for 2 hours. Status is pending")
	public void WS058() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when address is expired, the status is shown expired")
	public void WS059() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when status expired, user can create others address.")
	public void WS060() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit min ETH success(0.009)")
	public void WS061() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit max ETH")
	public void WS062() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit min BNB success")
	public void WS063() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit max BNB success(0.07)")
	public void WS064() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit min Tomo success(0.1)")
	public void WS065() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit max Tomo success")
	public void WS066() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit min BTC success (0.0002)")
	public void WS067() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that User can deposit max BTC success")
	public void WS068() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit ERC20 network success")
	public void WS069() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit BEP2 network success")
	public void WS070() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit stable coin success")
	public void WS071() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can deposit max stable coin success")
	public void WS072() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can receive money after staus is completed")
	public void WS073() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
		
	//Follow token
	@Test(testName = "Verify that when searching a token which is existed, this token will be filtered")
	public void WS074() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when searching a token which isNOT existed, this token will be NOT filtered")
	public void WS075() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when clicking back icon, wallet screen is shown")
	public void WS076() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when clicking + icon, this token is added into wallet screen, the message will be show")
	public void WS077() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when clicking - icon, this token is removed into wallet screen, the message will be show")
	public void WS078() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when clicking removing token in detail token, this token is removed in wallet screen")
	public void WS079() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	

	@Test(testName = "Verify that user can create incognito token success, this token is shown in wallet screen and token list")
	public void WS080() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user create this token, user can update icon token. (User id)")
	public void WS081() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when user does not create token, user cannot update icon token ( user id)")
	public void WS082() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
			
	
	@Test(testName = "Verify that user can add a ERC20 token success, this token is shown in wallet screen and token list")
	public void WS083() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when adding a ERC20 token success, the information is shown in token correctly")
	public void WS084() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that user can add a BEP2 token success, this token is shown in wallet screen and token list")
	public void WS085() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when adding a BEP2 token success, the information is shown in token correctly")
	public void WS086() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
	
	@Test(testName = "Verify that when inputting invalid information into field, the warning message is shown")
	public void WS087() throws Exception {
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
		
		//takeScreenshot("done_test");
	}
				

}
