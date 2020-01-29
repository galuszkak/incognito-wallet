package com.auto.core.utils;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.log4j.Logger;

public class RandomCharacter {
	protected Logger logger;
	
	
	public RandomCharacter(){
		logger = Logger.getLogger(this.getClass().getName() + "]");
	}
	
	
	//Get random alphabetic characters
	public String getRandomAlphaString(int length) throws Exception {		
		String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";		
		charset = RandomStringUtils.random(length, charset.toCharArray());
		logger.info("        Returned Random Alpha String: " + charset);
		return charset;		
	}
	
	//Get random numeric characters
	public String getRandomNumericString(int length) throws Exception {		
		String charset = "1234567890";		
		charset = RandomStringUtils.random(length, charset.toCharArray());
		logger.info("        Returned Random Numeric String: " + charset);
		return charset;		
	}
	
	//Get random alphanumeric characters
	public String getRandomAlphaNumericString(int length) throws Exception {		
		String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";		
		charset = RandomStringUtils.random(length, charset.toCharArray());
		logger.info("        Returned Random AlphaNumeric String: " + charset);
		return charset;		
	}

	//Get a random Non-Zero numeric characters
	public String getNonZeroRandomNumericString(int length) throws Exception {		
		String charset = "123456789";		
		charset = RandomStringUtils.random(length, charset.toCharArray());
		logger.info("        Returned Non-Zero Random Numeric String: " + charset);
		return charset;		
	}
	//Get random alphabetic and special characters
	public String getRandomAlphaStringwithSpecialCharacters(int length) throws Exception {
		String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ>&\"'";
		charset = RandomStringUtils.random(length, charset.toCharArray());
		logger.info("        Returned Random AlphaNumeric String: " + charset);
		return charset;
	}
}