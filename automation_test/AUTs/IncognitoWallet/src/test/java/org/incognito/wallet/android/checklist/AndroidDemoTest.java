package org.incognito.wallet.android.checklist;

import org.incognito.wallet.MobileTestBase;
import org.incognito.wallet.PageObjects.PageAccount;
import org.incognito.wallet.PageObjects.PageCreateAccount;
import org.incognito.wallet.PageObjects.PageDefault;
import org.incognito.wallet.PageObjects.PageImportAccount;
import org.incognito.wallet.PageObjects.PageKeys;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

import com.auto.core.utils.Log;
import com.auto.core.utils.RandomCharacter;

public class AndroidDemoTest extends MobileTestBase {

	public static String privacyKey = "112t8rnX3532sCMkBxSStrswQ6JGGdJtvQfVca1fNBwKHhtc23oCjqNULYVm7qCQADckz52N4E1h4YVNGSekp3HdFzAZ9De6zbwwUkRwJXbi";
	
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
		pageImport.importPrivacyKey(privacyKey);
		pageImport.isImportSuccess();
		
//		pageMain.isAccountNameUpdated(accountName);
		pageAccount.isAccountNameDisplayed(accountName);
		takeScreenshot("done_test");
		
	}

	@Test(testName = "import a duplicated account")
	public void importDuplicatedAccount() throws Exception {
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
	
	@Test(testName = "Create an account with a valid name")
	public void createAnAccountWithValidName() throws Exception {
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
		
		takeScreenshot("done_test");
	}

}
