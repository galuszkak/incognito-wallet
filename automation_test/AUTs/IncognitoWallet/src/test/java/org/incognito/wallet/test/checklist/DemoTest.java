package org.incognito.wallet.test.checklist;

import org.incognito.wallet.PageObjects.PageWallet;
import org.incognito.wallet.test.TestBase;
import org.testng.annotations.Test;

public class DemoTest extends TestBase{

	@Test
	public void test() {
		PageWallet pageMain = new PageWallet();
		pageMain.gotoPagePdex();
	}
}
