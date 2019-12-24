package org.incognito.wallet.test;

import org.testng.ITestContext;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.auto.PageObjectModel.MobilePageObject;
import com.auto.core.helpers.TestHelper;

public class TestBase {
	protected MobilePageObject pageBase = new MobilePageObject();

	@BeforeSuite
	public void beforeSuiteBase(ITestContext context) {

		System.out.println("Load test parameters");
		TestHelper.loadTestParams(context);
		
		System.out.println("Start Appium service");
		TestHelper.startAppiumService();
	}

	@BeforeMethod
	public void beforeMethodBase() {
		System.out.println("Start Appium driver");
		pageBase.startDriver();
	}

	@AfterMethod
	public void afterMethodBase() {
//		System.out.println("Stop Appium driver");
//		pageBase.stopDriver();
	}

	@AfterSuite
	public void afterSuiteBase() {

	}

}
