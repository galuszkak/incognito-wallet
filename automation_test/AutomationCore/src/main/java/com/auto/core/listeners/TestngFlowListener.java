package com.auto.core.listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.auto.core.utils.Log;

public class TestngFlowListener implements ITestListener {

	@Override
	public void onTestStart(ITestResult result) {
		Log.info("Start test case: " + result.getInstanceName());
	}

	@Override
	public void onTestSuccess(ITestResult result) {
		Log.info("Test success: " + result.getInstanceName());

	}

	@Override
	public void onTestFailure(ITestResult result) {
		Log.info("Test Failure: " + result.getInstanceName());

	}

	@Override
	public void onTestSkipped(ITestResult result) {
		Log.info("Test Skipped: " + result.getInstanceName());

	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		Log.info("Test success: " + "% " + result.getInstanceName());

	}

	@Override
	public void onStart(ITestContext context) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onFinish(ITestContext context) {
		// TODO Auto-generated method stub

	}

}
