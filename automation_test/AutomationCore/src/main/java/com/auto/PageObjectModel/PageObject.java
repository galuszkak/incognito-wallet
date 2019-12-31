package com.auto.PageObjectModel;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.auto.core.utils.Log;

public class PageObject {
	public static WebDriver driver;

	/**
	 * Start driver base on parameters which is passed to the test
	 * @throws Exception 
	 */
	public void startDriver() throws Exception {
		// must override and define in subclass
	}

	/**
	 * init PageFactory to support easier Page Object Model implementation after
	 * calling this method, you can use @FindBy, @AndroidFindBy... annotation.
	 */
	public void initPageFactory() {

		PageFactory.initElements(driver, this);
	}

	/**
	 * Stop driver
	 */
	public void stopDriver() {

		driver.quit();
	}

	public PageObject() {
		initPageFactory();
	}

	/**
	 * Create a WebdriverWait object with @timeout
	 * 
	 * @param timeout
	 * @return
	 */
	public WebDriverWait waits(int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, timeout);
		return wait;
	}

	/**
	 * Create a WebdriverWait object with @timeout = 30s
	 * 
	 * @return
	 */
	public WebDriverWait waits() {

		return waits(30);
	}

	/**
	 * wait for the element to appear on the screen
	 * 
	 * @param element
	 * @return
	 */
	public boolean waitForAppear(WebElement element) {
		try {
			WebElement e = waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				return true;
			return false;
		} catch (Exception e2) {
			return false;
		}
	}

	/**
	 * Take screenshot of current screen and save as a file in @savePath
	 * 
	 * @param savePath: absolute path of the file to save the screen shot, the path
	 *                  will automatically append .png at the end
	 * @return
	 */
	public File takeScreenShot(String savePath) {
		try {
			File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
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
