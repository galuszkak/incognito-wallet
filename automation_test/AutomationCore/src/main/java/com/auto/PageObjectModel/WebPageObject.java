package com.auto.PageObjectModel;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.auto.core.utils.Log;

import io.github.bonigarcia.wdm.WebDriverManager;

public class WebPageObject extends PageObject {

	protected static String browser;
	protected String pageUrl;

	public static void setBrowser(String browser) {
		WebPageObject.browser = browser;
	}

	public WebPageObject(String browser) {
		WebPageObject.browser = browser;
	}
	
	public WebPageObject() {
	}

	public void startDriver() throws Exception{
		Log.info("Starting new driver:", browser);
		switch (browser.toLowerCase()) {
		case "chrome":
			WebDriverManager.chromedriver().setup();
			ChromeOptions options = new ChromeOptions();

			options.addArguments("--disable-gpu");
			options.addArguments("--disable-dev-shm-usage");
			options.addArguments("--no-sandbox");
			driver = new ChromeDriver(options);
			break;
		case "firefox":
			WebDriverManager.firefoxdriver().setup();
			driver = new FirefoxDriver();
			break;
		default:
			throw new Exception("not yet support this browser");
		}
	}

	public void openPage() {
		driver.navigate().to(pageUrl);
	}
}
