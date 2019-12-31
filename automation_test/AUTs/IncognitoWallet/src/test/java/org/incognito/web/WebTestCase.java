package org.incognito.web;

import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.auto.PageObjectModel.WebPageObject;
import com.auto.core.TestCase;
import com.auto.core.helpers.TestHelper;
import com.auto.core.utils.Log;

public class WebTestCase extends TestCase {

	@BeforeSuite
	public void beforeSuiteBase() {
		pageObject = new WebPageObject(TestHelper.testParams.get("browser"));
	}

	@BeforeMethod
	public void beforeMethodBase() throws Exception {
		Log.info("!!! Start Web driver");
		((WebPageObject) pageObject).startDriver();
	}

	@AfterMethod
	public void afterMethodBase(ITestResult result) {
		if (!result.isSuccess()) {
			takeScreenshot();
		}
		Log.info("!!! Stop Web driver");
		((WebPageObject) pageObject).stopDriver();
	}

	@AfterSuite
	public void afterSuiteBase() {

	}

}
