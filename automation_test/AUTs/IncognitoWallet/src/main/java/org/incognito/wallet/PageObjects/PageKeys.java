package org.incognito.wallet.PageObjects;

import org.openqa.selenium.By;

import io.appium.java_client.MobileElement;

public class PageKeys extends PageBase {

	KeyEntry incogitoAddress = new KeyEntry("Incognito address");
	KeyEntry privateKey = new KeyEntry("Private key");
	KeyEntry publicKey = new KeyEntry("Public key");
	KeyEntry readOnlyKey = new KeyEntry("Readonly key");
	KeyEntry validatorKey = new KeyEntry("Validator key");

	public PageKeys copyIncognitoAddress() {
		incogitoAddress.btnCopy().click();
		return this;
	}

	public PageKeys copyPrivateKey() {
		privateKey.btnCopy().click();
		return this;
	}

	public PageKeys copyPublicKey() {
		publicKey.btnCopy().click();
		return this;
	}

	public PageKeys copyReadonlyKey() {
		readOnlyKey.btnCopy().click();
		return this;
	}

	public PageKeys copyValidatorKey() {
		validatorKey.btnCopy().click();
		return this;
	}

	public class KeyEntry {
		private String keyName;

		public KeyEntry(String keyName) {
			this.keyName = keyName.toUpperCase();
		}

		public String getKeyName() {
			return keyName;
		}
		
		private MobileElement entry() {
			String xpath = "something relate to keyName";
			return (MobileElement) driver.findElement(By.xpath(xpath));
		}

		public MobileElement btnCopy() {
			String xpath = "relative xpath to button";
			return entry().findElement(By.xpath(xpath));
		}
	}
}
