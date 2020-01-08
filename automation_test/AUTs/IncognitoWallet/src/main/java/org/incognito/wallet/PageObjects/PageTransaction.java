package org.incognito.wallet.PageObjects;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

public class PageTransaction extends PageBase {
	@AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.ImageView")
	private MobileElement btnSend;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnReceive;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnDeposit;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnMakeADeposit;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnCoinInfo;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btn3DotMenu;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnRemoveCoin;
	
	@AndroidFindBy(xpath = "")
	private MobileElement btnWithdraw;
	
	@AndroidFindBy(xpath = "")
	private MobileElement txtCoinName;
	
	@AndroidFindBy(xpath = "")
	private MobileElement txtCoinCodeName;
}
