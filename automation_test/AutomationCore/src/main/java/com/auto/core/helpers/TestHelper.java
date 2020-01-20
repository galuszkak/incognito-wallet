package com.auto.core.helpers;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.testng.ITestContext;

import com.auto.core.utils.Log;

import io.appium.java_client.service.local.AppiumServiceBuilder;
import io.appium.java_client.service.local.flags.GeneralServerFlag;

public class TestHelper {

	public static Map<String, String> testParams;
	public static final String testArgsPrefix = "testArg.";
	public static AppiumServiceBuilder appiumServiceBuilder;

	/**
	 * Load all params provided in the xml file and command line input arguments (VM
	 * args), VM args have higher priority
	 * 
	 * @param context
	 * @return testParams
	 */
	public static Map<String, String> loadTestParams(ITestContext context) {

		// retrieve test parameter from command line input if there's any
		// if not, use the parameter from testNG xml file
		testParams = context.getCurrentXmlTest().getAllParameters();

		Properties p = System.getProperties();
		for (String s : p.stringPropertyNames()) {
			if (s.startsWith(testArgsPrefix)) {
				testParams.put(s.split("\\.")[1], p.getProperty(s));
			}
		}
		return testParams;
	}

	public static void printParams(Map<String, String> params) {

		Log.info("Parameters:");
		Set<String> keys = params.keySet();
		for (String key : keys) {
			System.out.println("   " + key + " : " + params.get(key));
		}
	}

	public static AppiumServiceBuilder startAppiumService() {
		appiumServiceBuilder = new AppiumServiceBuilder();
		appiumServiceBuilder.withArgument(GeneralServerFlag.LOG_LEVEL, "info");
		appiumServiceBuilder.usingAnyFreePort();
		appiumServiceBuilder.withArgument(GeneralServerFlag.ROBOT_ADDRESS, TestHelper.testParams.get("udid"));
		return appiumServiceBuilder;
	}

	public static void stopAppiumService() {
	}

	public static Map<String, String> appiumParams() {
		return getParamsWithPrefix("appium.");
	}

	public static Map<String, String> androidParams() {
		return getParamsWithPrefix("android.");
	}

	public static Map<String, String> iosParams() {
		return getParamsWithPrefix("ios.");
	}

	private static Map<String, String> getParamsWithPrefix(String prefix) {
		Map<String, String> params = new HashMap<String, String>();
		for (String key : testParams.keySet()) {
			if (key.startsWith(prefix)) {
				params.put(key.replaceFirst(prefix, ""), testParams.get(key));
			}
		}
		return params;
	}
}
