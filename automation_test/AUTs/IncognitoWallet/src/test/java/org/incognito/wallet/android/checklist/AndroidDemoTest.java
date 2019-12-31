package org.incognito.wallet.android.checklist;

import org.incognito.wallet.MobileTestBase;
import org.incognito.wallet.PageObjects.PageMain;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

public class AndroidDemoTest extends MobileTestBase {

	@Test
	public void test() throws Exception {
		PageMain pageMain = new PageWallet();
		pageMain.waitForDisplay();
		takeScreenshot("done_test");
		pageMain.gotoPagePdex();
		Thread.sleep(1000);
		pageMain.gotoPageNode();
		Thread.sleep(1000);
		pageMain.gotoPagePapps();
		Thread.sleep(1000);
		pageMain.gotoPageWallet();
		takeScreenshot("done_test_2");
	}
}
