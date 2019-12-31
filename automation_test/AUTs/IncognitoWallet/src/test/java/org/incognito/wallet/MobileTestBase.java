package org.incognito.wallet;

import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.auto.PageObjectModel.MobilePageObject;
import com.auto.core.TestCase;
import com.auto.core.helpers.TestHelper;
import com.auto.core.utils.Log;

public class MobileTestBase extends TestCase {

	public MobileTestBase() {
		pageObject = new MobilePageObject();
	}

	@BeforeSuite
	public void beforeSuiteBase(ITestContext context) {

		Log.info("=-=-=-=-= Start Appium service =-=-=-=-=");
		TestHelper.startAppiumService();
	}

	@BeforeMethod
	public void beforeMethodBase() throws Exception{
		Log.info("=-=-=-=-= Start Appium driver =-=-=-=-=");
		((MobilePageObject) pageObject).startDriver();
	}

	@AfterMethod
	public void afterMethodBase(ITestResult result) {
		if (!result.isSuccess()) {
			takeScreenshot();
		}
		Log.info("Stop Appium driver");
		((MobilePageObject) pageObject).stopDriver();
	}

	@AfterSuite
	public void afterSuiteBase() {

	}
}
