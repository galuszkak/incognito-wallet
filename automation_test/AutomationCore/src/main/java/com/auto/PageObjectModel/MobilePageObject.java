package com.auto.PageObjectModel;

import java.io.File;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.auto.core.helpers.TestHelper;
import com.auto.core.utils.Log;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

public class MobilePageObject {
	public static AppiumDriver<MobileElement> driver;

	/**
	 * Start Appium driver base on parameters which is passed to the test
	 */
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

	/**
	 * init PageFactory to support easier Page Object Model implementation
	 * after calling this method, you can use @FindBy, @AndroidFindBy... annotation.
	 */
	public void initPageFactory() {

		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}

	/**
	 * Stop Appium driver
	 */
	public void stopDriver() {

		driver.quit();
	}

	public MobilePageObject() {
		initPageFactory();
	}

	/**
	 * Create a WebdriverWait object with @timeout
	 * @param timeout
	 * @return
	 */
	public WebDriverWait waits(int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, timeout);
		return wait;
	}

	/**
	 * Create a WebdriverWait object with @timeout = 30s
	 * @return
	 */
	public WebDriverWait waits() {

		return waits(30);
	}

	/**
	 * wait for the element to appear on the screen
	 * @param element
	 * @return
	 */
	public boolean waitForAppear(MobileElement element) {
		try {
			MobileElement e = (MobileElement) waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				return true;
			return false;
		} catch (Exception e2) {
			return false;
		}
	}

	
	/**
	 * Take screenshot of current screen and save as a file in @savePath
	 * @param savePath: absolute path of the file to save the screen shot, the path will automatically append .png at the end
	 * @return
	 */
	public File takeScreenShot(String savePath) {
		try {
			File screenshot = driver.getScreenshotAs(OutputType.FILE);
			File save = new File(savePath + ".png");
			FileUtils.copyFile(screenshot, save);
			Log.info("Screenshot recorded @ " + save.getParentFile().getName() + File.separator + save.getName());
			return save;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
