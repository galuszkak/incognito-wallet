package com.auto.core.listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.auto.core.utils.Log;

public class Flow implements ITestListener {

	@Override
	public void onTestStart(ITestResult result) {
		Log.info("!!! Start test case: " + result.getInstanceName());
	}

	@Override
	public void onTestSuccess(ITestResult result) {
		Log.info("!!! Test case success: " + result.getInstanceName());

	}

	@Override
	public void onTestFailure(ITestResult result) {
		Log.info("!!! Test case Failure: " + result.getInstanceName());

	}

	@Override
	public void onTestSkipped(ITestResult result) {
		Log.info("!!! Test case Skipped: " + result.getInstanceName());

	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		Log.info("!!! Test case success: " + "% " + result.getInstanceName());

	}

	@Override
	public void onStart(ITestContext context) {
		Log.info("!!! Start test: " + context.getName());

	}

	@Override
	public void onFinish(ITestContext context) {
		Log.info("!!! Done test: " + context.getName());
	}

}
