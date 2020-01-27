package com.auto.PageObjectModel;

import org.openqa.selenium.Dimension;
import java.io.File;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.auto.core.utils.Log;

import io.appium.java_client.PerformsTouchActions;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidTouchAction;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;



public class PageObject {
	public static WebDriver driver;
	public static PerformsTouchActions performsTouchActions;

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
	
	public boolean enter(WebElement element, String key) {
		try {
			WebElement e = waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				e.click();
				e.clear();
				e.sendKeys(key);
			return false;
		} catch (Exception e2) {
			return false;
		}
	}
	
	public boolean tap(WebElement element) {
		try {
			WebElement e = waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				e.click();
				
			return false;
		} catch (Exception e2) {
			return false;
		}
	}
	
	public void verticalSwipe() {
		Dimension dim = driver.manage().window().getSize();
		int height = dim.getHeight();
		int width = dim.getWidth();
		int x = width/2;
		int starty = (int)(height*0.80);
		int endy = (int)(height*0.20);
		TouchAction action = new TouchAction((PerformsTouchActions) driver);
		action.press(PointOption.point(x, starty)).waitAction(WaitOptions.waitOptions(Duration.ofMillis(1300))).moveTo(PointOption.point(x, endy)).release().perform();	
	}
	
	public boolean scrollToElement(WebElement e) {
		boolean flg = false;
		for (int i = 0; i <= 20; i++) {
			try {
					driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
					e.isDisplayed();
					flg = true;
					break;
			} catch (Exception err) {
				verticalSwipe();
			}
		}
		return flg;
		
	}
	
	public boolean isElementPresent(WebElement e) {
		boolean flg = false;
		for (int i = 0; i <= 20; i++) {
			try {
					driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
					e.isDisplayed();
					flg = true;
					break;
			} catch (Exception err) {
				System.out.println(err);
			}
		}
		return flg;
		
	}
}
