package org.incognito.wallet.PageObjects;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageSend extends PageBase{
	
	@AndroidFindBy()
	private MobileElement btnSend;
	
	@AndroidFindBy()
	private MobileElement fieldTo;
	
	@AndroidFindBy
	private MobileElement fieldAmount;
	
	@AndroidFindBy
	private MobileElement fieldMemo;
	
	@AndroidFindBy 
	private MobileElement btnMax;
	
	@AndroidFindBy
	private MobileElement btnScanQr;
	
	@AndroidFindBy
	private MobileElement valueBalance;
	

}
