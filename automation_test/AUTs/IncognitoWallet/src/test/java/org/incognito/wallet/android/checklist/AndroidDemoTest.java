package org.incognito.wallet.android.checklist;

import org.incognito.wallet.MobileTestBase;
import org.incognito.wallet.PageObjects.PageDefault;
import org.incognito.wallet.PageObjects.PageKeys;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

import com.auto.core.utils.Log;

public class AndroidDemoTest extends MobileTestBase {

	@Test(testName = "Browsing through all tabs")
	public void test() throws Exception {
		PageWallet pageMain = new PageWallet();
		pageMain.isDisplay();
		takeScreenshot("done_test");
		
	}

	@Test(testName = "Copy keys")
	public void copyKeys() {
		PageWallet pageWallet = new PageWallet();
		pageWallet.isDisplay();
		PageKeys pageKeys = pageWallet.gotoPageAccount().gotoPageKeys();
		pageKeys.copyPrivateKey();
		String privateKey = pageKeys.getClipBoard();
		Log.info(privateKey);
	}
}
