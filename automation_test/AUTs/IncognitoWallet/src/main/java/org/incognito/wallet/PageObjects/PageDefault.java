package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * @author rocky
 * This page show when start up the app 
 * Contains 4 sub-pages : Wallet, Node, PApp, Pdex and the default page is Wallet
 */
public class PageDefault extends PageBase {
	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[1]")
	private MobileElement btnWallet;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[2]")
	private MobileElement btnNodes;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[3]")
	private MobileElement btnPapps;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[4]")
	private MobileElement btnPdex;

	
	public boolean isDisplay() {
		return 
				waitForAppear(btnNodes) &
				waitForAppear(btnPapps) &
				waitForAppear(btnPdex) &
				waitForAppear(btnWallet);
	}

	public PagePdex gotoPagePdex() {
		isDisplay();
		btnPdex.click();
		return new PagePdex();
	}
	
	public PageNodes gotoPageNode() {
		isDisplay();
		btnNodes.click();
		return new PageNodes();
	}
	
	public PagePapps gotoPagePapps() {
		isDisplay();
		btnPapps.click();
		return new PagePapps();
	}
	
	public PageWallet gotoPageWallet() {
		isDisplay();
		btnWallet.click();
		return new PageWallet();
	}
}
