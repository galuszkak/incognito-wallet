package com.auto.core;

import java.io.File;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.map.HashedMap;
import org.testng.ITestContext;
import org.testng.Reporter;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.auto.PageObjectModel.PageObject;
import com.auto.core.helpers.TestHelper;
import com.auto.core.utils.Log;

public class TestCase {
	protected ITestContext context;
	protected Method currentMethod;
	protected PageObject pageObject;

	@BeforeSuite
	public void loadTestParam(ITestContext context) {
		this.context = context;
		Log.info("!!! Load test parameters !!!");
		Map env = System.getenv();
		Set<String> envKey = env.keySet();
		for (String key : envKey) {
			System.out.println(String.format("!!! %s : %s",key,env.get(key)));
		}
		TestHelper.loadTestParams(context);
	}

	@BeforeMethod
	public void getCurrentMethod(Method method) {
		currentMethod = method;
	}

	/**
	 * Take screenshot of the current screen
	 * 
	 * @param fileName: screenshot file name suffix. The final name will be [test
	 *                  method name]_[fileName].png and will be stored under
	 *                  test-output/[xml test name]
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
	 * Take screenshot of the current screen save under test-output/[xml test name]
	 */
	protected void takeScreenshot() {
		takeScreenshot("");
	}

}
