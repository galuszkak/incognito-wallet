package org.incognito.web.checklist;

import org.incognito.web.WebTestCase;
import org.incognito.web.PageObjects.PageSample;
import org.testng.annotations.Test;

public class WebDemoTest extends WebTestCase {

	@Test
	public void webTest1() {
		PageSample page = new PageSample();
		page.openPage();
		takeScreenshot();
	}
}
