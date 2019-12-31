package org.incognito.web.checklist;

import org.incognito.web.WebTestCase;
import org.incognito.web.PageObjects.PageSample;
import org.testng.annotations.Test;

import com.auto.core.helpers.TestHelper;

public class WebDemoTest extends WebTestCase {

	@Test
	public void webTest1() throws Exception {
		PageSample page = new PageSample();
		page.openPage();
		page.search(TestHelper.testParams.get("searchText"));
		Thread.sleep(5000);
		takeScreenshot();
	}
}
