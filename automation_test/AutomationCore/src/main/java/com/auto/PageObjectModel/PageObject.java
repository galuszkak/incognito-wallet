package com.auto.PageObjectModel;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Point;
import org.openqa.selenium.StaleElementReferenceException;

import java.io.File;
import java.time.Duration;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.eclipse.paho.client.mqttv3.logging.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.auto.core.utils.Log;
import com.auto.core.utils.RandomCharacter;

import io.appium.java_client.MobileElement;
import io.appium.java_client.PerformsTouchActions;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidTouchAction;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;

public class PageObject {
	public static WebDriver driver;
	public static PerformsTouchActions performsTouchActions;
	public static AndroidDriver driverA = null;

	/**
	 * Start driver base on parameters which is passed to the test
	 * 
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

	public boolean waitUntilElementPresent(WebElement element, int timeToWait) throws Exception {
		int i = 0;
		while (true) {
			try {
				Log.info("        Finding" + element);
				if (isElementPresent(element))
					return true;
			} catch (NoSuchElementException e) {
				Log.info("        No Such Element: " + element);
				sleep(1000);
			} catch (ElementNotVisibleException e) {
				Log.info("        Element Not Visible: " + element);
				sleep(1000);
			} catch (StaleElementReferenceException e) {
				Log.info("        Stale Element Reference Exception: " + e);
				sleep(1000);
			} catch (Exception e) {
				Log.info("        Exception: " + e);
				sleep(1000);
			} catch (Error e) {
				Log.info("        Error: " + e);
				sleep(1000);
			}
			i++;
			if (i >= timeToWait) {
				Log.warn("       Time out for waiting element visible");
				throw new NoSuchElementException("Time out for waiting element visible");
			}
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
			Log.info("       Enter " + key + " to " + element);
			WebElement e = waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				e.click();
			e.clear();
			Log.info("       Enter:" + key + " to Element:" + element);
			e.sendKeys(key);
			sleep(1000);
			driver.navigate().back();
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

	public boolean tap(WebElement element, int time) {
		try {
			WebElement e = waits().until(ExpectedConditions.visibilityOf(element));
			if (e != null)
				for (int i = 0; i <= time; i++) {
					e.click();
					Thread.sleep(1000);
				}

			return false;
		} catch (Exception e2) {
			return false;
		}
	}

	public void verticalSwipe() {
		try {
			Dimension dim = driver.manage().window().getSize();
			int height = dim.getHeight();
			int width = dim.getWidth();
			int x = width / 2;
			int starty = (int) (height * 0.80);
			int endy = (int) (height * 0.20);
			TouchAction action = new TouchAction((PerformsTouchActions) driver);
			action.press(PointOption.point(x, starty)).waitAction(WaitOptions.waitOptions(Duration.ofMillis(1300)))
					.moveTo(PointOption.point(x, endy)).release().perform();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void horizontalSwipe(WebElement element) {
		try {
			Point location = element.getLocation();
			Dimension dim = driver.manage().window().getSize();
			int height = dim.getHeight();
			int width = dim.getWidth();
			int x = width / 2;
			int starty = (int) (height * 0.80);
			int endy = (int) (height * 0.20);
			TouchAction action = new TouchAction((PerformsTouchActions) driver);
			action.press(PointOption.point(x, starty)).waitAction(WaitOptions.waitOptions(Duration.ofMillis(1300)))
					.moveTo(PointOption.point(x, endy)).release().perform();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
				Log.info("       Element " + e + " IS present.");
				break;
			} catch (NoSuchElementException err) {
				Log.info("       Element " + e + " IS NOT present.");
			} catch (Exception err) {
				Log.info("       Element " + e + " IS NOT present.");
			} catch (Error err) {
				Log.info("       " + err);
			}
		}
		return flg;
	}

	public void scrollToElementIntoView(WebElement e) {

		try {
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", e);
			Thread.sleep(500);
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

	public static void swipe(String direction, long duration) {
		Dimension size = driver.manage().window().getSize();

		int startX = 0;
		int endX = 0;
		int startY = 0;
		int endY = 0;

		switch (direction) {
		case "right":
			startY = (int) (size.height / 2);
			startX = (int) (size.width * 0.90);
			endX = (int) (size.width * 0.05);

			TouchAction action = new TouchAction((PerformsTouchActions) driver);
			action.press(PointOption.point(startX, startY))
					.waitAction(WaitOptions.waitOptions(Duration.ofMillis(duration)))
					.moveTo(PointOption.point(endX, startY)).release().perform();
			Log.info("        Swiping right.");
			break;

		case "left":
			startY = (int) (size.height / 2);
			startX = (int) (size.width * 0.05);
			endX = (int) (size.width * 0.90);
			TouchAction actionl = new TouchAction((PerformsTouchActions) driver);
			actionl.press(PointOption.point(startX, startY))
					.waitAction(WaitOptions.waitOptions(Duration.ofMillis(duration)))
					.moveTo(PointOption.point(endX, startY)).release().perform();
			Log.info("        Swiping left.");
			break;

		case "up":
			endY = (int) (size.height * 0.70);
			startY = (int) (size.height * 0.30);
			startX = (size.width / 2);
			TouchAction actionu = new TouchAction((PerformsTouchActions) driver);
			actionu.press(PointOption.point(startX, startY))
					.waitAction(WaitOptions.waitOptions(Duration.ofMillis(duration)))
					.moveTo(PointOption.point(startX, endY)).release().perform();
			Log.info("        Swiping up.");
			break;

		case "down":
			startY = (int) (size.height * 0.70);
			endY = (int) (size.height * 0.30);
			startX = (size.width / 2);
			TouchAction actiond = new TouchAction((PerformsTouchActions) driver);
			actiond.press(PointOption.point(startX, startY))
					.waitAction(WaitOptions.waitOptions(Duration.ofMillis(duration)))
					.moveTo(PointOption.point(startX, endY)).release().perform();
			Log.info("        Swiping down.");
			break;
		}
	}

	public String splitPrice(String val) {
		String[] arrOfStr = val.split(" ");
		Log.info("        Swiping right.");
		return arrOfStr[0];
	}

	public static void sleep(long val) throws Exception {
		Log.info("       Sleeping :" + val);
		Thread.sleep(val);
	}

	public void dismissKeyboard() {
		driverA.hideKeyboard();
	}

	public boolean waitUntilElementIsNotVisible(WebElement element, int waitTime) throws Exception {
		boolean flag = false;
		for (int i = 0; i < waitTime; i++) {
			try {
				if (!element.isDisplayed()) {
					Log.info("       Element disapeared.");
					flag = true;
					break;
				} else {
					Log.info("       Element appear.");
				}
				Thread.sleep(1000);
			} catch (Exception e) {
				flag = true;
				break;
			}
		}
		return flag;
	}

	public boolean isElementNotPresent(WebElement element, int time) throws Exception {
		boolean flag = false;
		int i = 0;

		while (i < time) {
			try {
				if ((element.isDisplayed() || element.isEnabled())) {

				}
			} catch (Exception e) {
				flag = true;

				break;
			}
			Thread.sleep(1000);
			i++;
		}
		return flag;
	}

	public String getText(WebElement e) throws Exception {
		String temp = "";
		try {
			waitUntilElementPresent(e, 20);
			temp = e.getText();

		} catch (StaleElementReferenceException e1) {

			e1.printStackTrace();
		} catch (NoSuchElementException e1) {

			e1.printStackTrace();
		} catch (Exception e1) {

			e1.printStackTrace();
		}
		return temp;
	}

}
