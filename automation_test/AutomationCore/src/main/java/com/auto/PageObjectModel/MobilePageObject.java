package com.auto.PageObjectModel;

import java.io.File;
import java.util.Map;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.auto.core.helpers.TestHelper;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

public class MobilePageObject {
	public static AppiumDriver<MobileElement> driver;

	public void startDriver() {
		Map<String, String> appiumParam = TestHelper.appiumParams();

		DesiredCapabilities cap = new DesiredCapabilities();
		cap.setCapability("platformName", appiumParam.get("platformName"));
		cap.setCapability("noReset", true);
		cap.setCapability("newCommandTimeout", 600);
		cap.setCapability("deviceName", appiumParam.get("deviceName"));

		if (appiumParam.get("udid") != null) {
			cap.setCapability("udid", appiumParam.get("udid"));
		}

		switch (appiumParam.get("platformName").toLowerCase()) {
		case "android":
			Map<String, String> androidParam = TestHelper.androidParams();

			cap.setCapability("automationName", "uiautomator2");
			cap.setCapability("skipServerInstallation", true);
			cap.setCapability("noSign", true);
			cap.setCapability("appActivity", androidParam.get("appActivity"));
			cap.setCapability("appPackage", androidParam.get("appPackage"));
			break;

		case "ios":
			Map<String, String> iosParam = TestHelper.iosParams();

			cap.setCapability("automationName", "XCUITest");
			cap.setCapability("showXcodeLog", false);
			cap.setCapability("showIOSLog", true);
			cap.setCapability("bundleId", iosParam.get("bundleId"));
			break;
		default:
			break;
		}

		if (appiumParam.get("app") != null) {
			File app = new File(appiumParam.get("app"));
			cap.setCapability("app", app.getAbsolutePath());
		}

		driver = new AndroidDriver<MobileElement>(TestHelper.appiumServiceBuilder, cap);
		initPageFactory();
	}

	public void initPageFactory() {

		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}

	public void stopDriver() {

		driver.quit();
	}

	public MobilePageObject() {
		initPageFactory();
	}

	public WebDriverWait waits(int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, timeout);
		return wait;
	}

	public WebDriverWait waits() {

		return waits(30);
	}
}
