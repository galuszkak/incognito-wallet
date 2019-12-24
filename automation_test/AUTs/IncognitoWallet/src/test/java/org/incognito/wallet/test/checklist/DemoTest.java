package org.incognito.wallet.test.checklist;

import org.incognito.wallet.PageObjects.PageAccount;
import org.incognito.wallet.test.TestBase;
import org.testng.annotations.Test;

public class DemoTest extends TestBase{

	@Test
	public void test() {
		PageAccount pageAccount = new PageAccount();
		pageAccount.gotoPdexPage();
	}
}
