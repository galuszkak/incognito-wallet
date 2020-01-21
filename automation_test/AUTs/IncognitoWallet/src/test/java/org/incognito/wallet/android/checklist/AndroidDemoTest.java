package org.incognito.wallet.android.checklist;

import org.incognito.wallet.MobileTestBase;
import org.incognito.wallet.PageObjects.PageAccount;
import org.incognito.wallet.PageObjects.PageDefault;
import org.incognito.wallet.PageObjects.PageImportAccount;
import org.incognito.wallet.PageObjects.PageKeys;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

import com.auto.core.utils.Log;

public class AndroidDemoTest extends MobileTestBase {

	@Test(testName = "Import and rename an account")
	public void importAndChangeAccountName() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		pageMain.gotoPageAccount();
		
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPageImportAccount();
		pageAccount.isImportSectionDisplay();
		pageAccount.tapImportAccount();
		
		PageImportAccount pageImport = new PageImportAccount();
		String accountName = pageImport.editAccountName();
		pageImport.importPrivacyKey();
		pageImport.isImportSuccess();
		
		pageMain.isAccountNameUpdated(accountName);
		pageAccount.isAccountNameDisplayed(accountName);
		
		takeScreenshot("done_test");
		
	}

//	@Test(testName = "Copy keys")
	public void copyKeys() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		takeScreenshot("done_test");
//		PageWallet pageWallet = new PageWallet();
//		pageWallet.isDisplay();
//		PageKeys pageKeys = pageWallet.gotoPageAccount().gotoPageKeys();
//		pageKeys.copyPrivateKey();
//		String privateKey = pageKeys.getClipBoard();
//		Log.info(privateKey);
	}
}
