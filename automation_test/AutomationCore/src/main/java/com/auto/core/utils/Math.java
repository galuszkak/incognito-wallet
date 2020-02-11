package com.auto.core.utils;

import com.auto.core.utils.Log;

public class Math {

	public Long powerOfNumber(String base, String exponent) {
		Log.info("Base: " + base + " Exponent: " + exponent);
		float baseAsFloat = Float.parseFloat(base);
		float exponentAsFloat = Float.parseFloat(exponent);

		long result = 1;
		while (exponentAsFloat != 0) {
			result *= baseAsFloat;
			--exponentAsFloat;
		}
		Log.info("Result: " + result);
		return result;
	}
	
	public String convertMoney(String money, String exponent) {
		Log.info("Money: " + money + " Exponent: " + exponent);
		float baseAsFloat = Float.parseFloat(money);
		float exponentAsFloat = Float.parseFloat(exponent);

		long result = 0;
		while (exponentAsFloat != 0) {
			result *= baseAsFloat;
			--exponentAsFloat;
		}
		Log.info("Result: " + result);
		return String.valueOf(result);
	}

}
