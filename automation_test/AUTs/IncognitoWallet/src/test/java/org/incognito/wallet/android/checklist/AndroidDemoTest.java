package org.incognito.wallet.android.checklist;

import org.incognito.wallet.TestBase;
import org.incognito.wallet.PageObjects.PageMain;
import org.incognito.wallet.PageObjects.PageWallet;
import org.testng.annotations.Test;

public class AndroidDemoTest extends TestBase {

	@Test
	public void test() throws Exception {
		PageMain pageMain = new PageWallet();
		pageMain.gotoPagePdex();
		Thread.sleep(1000);
		pageMain.gotoPageNode();
		Thread.sleep(1000);
		pageMain.gotoPagePapps();
		Thread.sleep(1000);
		pageMain.gotoPageWallet();
		takeScreenshot("done_test");
		takeScreenshot("done_test_2");
	}

	@Test
	public void test2() {
		takeScreenshot("done_test");
	}
}
