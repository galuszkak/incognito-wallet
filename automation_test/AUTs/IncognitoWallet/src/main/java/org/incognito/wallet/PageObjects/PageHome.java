package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import io.appium.java_client.MobileElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * @author rocky
 * This page show when start up the app 
 * Contains 4 sub-pages : Wallet, Node, PApp, Pdex and the default page is Wallet
 */
public class PageHome extends PageBase {
	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[1]")
	private MobileElement btnWallet;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[2]")
	private MobileElement btnNodes;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[3]")
	private MobileElement btnPapps;

	@AndroidFindBy(xpath = "//android.widget.HorizontalScrollView//android.widget.Button[4]")
	private MobileElement btnPdex;

	@AndroidFindBy(xpath = "((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[2]/*/*/*[@class='android.widget.ProgressBar'])[1]")
	private MobileElement icoLoading;
	
	@AndroidFindBy(xpath = "//*[@class='android.widget.ImageView' and ./parent::*[@class='android.view.ViewGroup'] and (./preceding-sibling::* | ./following-sibling::*)[@class='android.widget.ScrollView']]")
	private MobileElement icoLoadingPRV;
							
	@AndroidFindBy(xpath = "(((//*[@class='android.view.ViewGroup' and ./parent::*[@class='android.widget.ScrollView']]/*[@class='android.view.ViewGroup'])[2]/*[@class='android.view.ViewGroup'])[1]/*[@text])[3]")
	private MobileElement lblPRVUnit;
	
	public boolean isDisplay() throws Exception {
		return 
				waitUntilElementPresent(lblPRVUnit, 100) &
				waitForAppear(btnNodes) &
				waitForAppear(btnPapps) &
				waitForAppear(btnPdex) &
				waitForAppear(btnWallet);
				
	}

	public PagePdex gotoPagePdex() throws Exception {
		isDisplay();
		btnPdex.click();
		return new PagePdex();
	}
	
	public PageNodes gotoPageNode() throws Exception {
		isDisplay();
		btnNodes.click();
		return new PageNodes();
	}
	
	public PagePapps gotoPagePapps() throws Exception {
		isDisplay();
		btnPapps.click();
		return new PagePapps();
	}
	
	public PageWallet gotoPageWallet() throws Exception {
		isDisplay();
		btnWallet.click();
		return new PageWallet();
	}
	
	
}
