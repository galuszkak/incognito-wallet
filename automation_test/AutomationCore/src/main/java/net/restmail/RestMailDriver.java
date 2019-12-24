package net.restmail;

import static com.jayway.restassured.RestAssured.given;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.auto.core.helpers.TimeHelper;
import com.auto.core.utils.Log;
import com.jayway.restassured.builder.RequestSpecBuilder;
import com.jayway.restassured.response.Response;
import com.jayway.restassured.specification.RequestSpecification;

/**
 * @author Rocky
 * "Have you ever wanted to write an automated test of a service that sends email? If you have,
 *  you might have wanted an email address that you can check using a simple REST service that returns JSON...
 *  ..that's what restmail.net is." quote: restmail.net
 */
public class RestMailDriver {
	private static final String defaultUrl = "https://restmail.net";
	private static final String defaultUser = "cinatic";
	private String url;
	private String userName;
	private RequestSpecification spec;
	private JSONArray jsonEmailArray;
	
	/**
	 * init with defaultUrl and defaultUser ("https://restmail.net" & "cinatic")
	 */	
	public RestMailDriver() {
		this.userName = defaultUser;
		this.url = defaultUrl;
		spec = new RequestSpecBuilder().setBaseUri(getBaseURL()).build();
		downloadEmail();
	}
	
	/**
	 * Init with default url: "https://restmail.net"
	 * @param username: username, mail box name
	 */
	public RestMailDriver(String userName) {
		this.userName = userName.toLowerCase();
		this.url = defaultUrl;
		spec = new RequestSpecBuilder().setBaseUri(getBaseURL()).build();
		downloadEmail();
	}
	
	/**
	 * @param url: base url to the rest mail server. Ex: https://restmail.net
	 * @param username: username, mail box name
	 */
	public RestMailDriver (String url, String  username) {
		this.url = url;
		this.userName = username.toLowerCase();
		spec = new RequestSpecBuilder().setBaseUri(getBaseURL()).build();
		downloadEmail();
	}
	
	/**
	 * Rocky
	 * Download email from server
	 * @return Response object which contain data in JSON format
	 * 
	 * Update (10/1/2019) - Add waiting time for download Email if email does not appear.
	 */
	public RestMailDriver downloadEmail() {
		int count = 0;
		Log.debug("Download email from: " + userName +"@restmail.net");
		Response res = given().spec(spec).get().then().extract().response();
		res.prettyPeek();
		while (res.getBody().asString().equals("[]") && count < 180) {
			TimeHelper.sleep(20000);
			res = given().spec(spec).get().then().extract().response();
			res.prettyPeek();
			count += 20;
		}
		jsonEmailArray = new JSONArray(res.asString());
		return this;
	}
	
	/**
	 * Rocky
	 * Return json object of latest email
	 * @return
	 */
	public JSONObject getLatestJsonEmail() {
		checkInboxEmpty();
		JSONObject jO = (JSONObject) jsonEmailArray.get(jsonEmailArray.length()-1);
		Log.debug(String.format("Latest email of %s: \n %s", userName, jO.toString()));
		return jO;
	}
	
	/**
	 * Rocky
	 * Return json object of oldest email
	 * @return
	 */
	public JSONObject getJsonOldestEmail() {
		checkInboxEmpty();
		JSONObject jO = (JSONObject) jsonEmailArray.get(0);
		Log.debug(String.format("Oldest email of %s: \n %s", userName, jO.toString()));
		return jO ;
	}
	
	/**
	 * Rocky
	 * check if inbox is empty -> throw exception
	 */
	public void checkInboxEmpty() {
		if (jsonEmailArray.length() <1) {
			throw  new JSONException(userName + " Mail box is empty!!");
		}
	}
	/**
	 * Rocky
	 * parse the download email  
	 * @return text email body, the email is text only
	 */
	public String getTextEmail() {
		return getLatestJsonEmail().get("text").toString();
	}
	
	/**
	 * Rocky
	 * parse the download email
	 * @return email subject
	 */
	public String getEmailSubject() {
		return getLatestJsonEmail().getString("subject").toString();
	}
	
	/**
	 * Rocky
	 * parse the download email
	 * @return html email body, the email is in html format
	 */
	public String getHtmlEmail() {
		return getLatestJsonEmail().getString("html").toString();
	}
		
	/**
	 * Rocky
	 * Delete all email
	 * @return
	 */
	public boolean deleteAllMail() {
		int code;
		Response res;
		Log.debug("Delete all email in "+ userName);
		res = given().spec(spec).delete().then().extract().response();
		res.prettyPeek();
		code = res.getStatusCode();
		if (code == 200) return true;
		Log.debug("Fail to delete all email in "+ userName);
		return false;		
	}
	
	/**
	 * Rocky
	 * parse the download email
	 * @return attachment email
	 */
	public JSONArray getAttachmentEmail() {
		downloadEmail();
		JSONArray jO =  getLatestJsonEmail().getJSONArray("attachments");
		 return jO;
	}
	
	/**
	 * Rocky
	 * Get email number #th in mail box
	 * @param number
	 * @return
	 */
	public JSONObject getEmailNumber(int number) {
		downloadEmail();
		checkInboxEmpty();
		if (number >= jsonEmailArray.length()) {
			throw new JSONException(userName + ": Email index out of range: " + number);
		}
		JSONObject jO = (JSONObject) jsonEmailArray.get(number);
		Log.debug(String.format("Email number %s of %s: \n %s", number ,userName, jO.toString()));
		return jO;
	}
	
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getUrl() {
		return url;
	}
	public String getBaseURL() {
		String u = url + "/mail/" + userName;
		return u;
	}
	
	public void buildRequest() {
		spec = new RequestSpecBuilder().setBaseUri(getBaseURL()).build();
	}
}