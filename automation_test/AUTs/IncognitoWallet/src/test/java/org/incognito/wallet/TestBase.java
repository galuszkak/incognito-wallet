package org.incognito.wallet;

import java.io.File;
import java.lang.reflect.Method;

import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.auto.PageObjectModel.MobilePageObject;
import com.auto.core.helpers.TestHelper;
import com.auto.core.utils.Log;

public class TestBase {
	protected MobilePageObject pageObject = new MobilePageObject();
	protected ITestContext context;
	protected Method currentMethod;

	@BeforeSuite
	public void beforeSuiteBase(ITestContext context) {
		this.context = context;
		Log.info("=-=-=-=-= Load test parameters =-=-=-=-=");
		TestHelper.loadTestParams(context);

		Log.info("=-=-=-=-= Start Appium service =-=-=-=-=");
		TestHelper.startAppiumService();
	}

	@BeforeMethod
	public void beforeMethodBase(Method method) {
		currentMethod = method;
		Log.info("=-=-=-=-= Start Appium driver =-=-=-=-=");
		pageObject.startDriver();
	}

	@AfterMethod
	public void afterMethodBase(ITestResult result) {
		if (!result.isSuccess()) {
			takeScreenshot();
		}
		Log.info("Stop Appium driver");
		pageObject.stopDriver();
	}

	@AfterSuite
	public void afterSuiteBase() {

	}

	/**
	 * Take screenshot of the current screen
	 * @param fileName: screenshot file name suffix. The final name will be [test method name]_[fileName].png
	 * and will be stored under test-output/[xml test name]
	 */
	protected void takeScreenshot(String fileName) {
		String savePath = context.getOutputDirectory() + File.separator + currentMethod.getName();
		if (!fileName.isEmpty())
			savePath += "_" + fileName;
		File screenshot = pageObject.takeScreenShot(savePath);
		String log = screenshot.getParentFile().getName() + File.separator + screenshot.getName();
		log = "<img src=\"" + log + "\" width=\"256\">";
		Reporter.log(log);
		Reporter.log(screenshot.getName());
	}

	/**
	 * Take screenshot of the current screen
	 * save under test-output/[xml test name]
	 */
	private void takeScreenshot() {
		takeScreenshot("");
	}

}
