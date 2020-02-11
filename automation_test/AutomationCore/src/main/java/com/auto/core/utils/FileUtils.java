package com.auto.core.utils;

import com.auto.core.utils.Log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileDeleteStrategy;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang.RandomStringUtils;

public class FileUtils {

	public static String dir = "Phat_le_2";
	public static String fileName = "accounts.json";
	public static String curDir = "/Users/autonomous/Documents/GitHub/incognito-wallet/automation_test/AutomationCore/src/main/java/file/";

	public Long powerOfNumber(String file) throws IOException {
		Writer output;
		output = new BufferedWriter(new FileWriter(file)); // clears file every time
		output = new BufferedWriter(new FileWriter(file, true));
		output.append("New Line!");
		output.close();
		return null;
	}

	public void createFileWithDir(String filePath, String fileName, String content) throws IOException {
		File dir = new File(filePath);
		Log.info(" dir:" + String.valueOf(dir));
		File file = new File(filePath + fileName);
		Log.info(" dir:" + String.valueOf(file));
		// if folder doesn't exists, then create it
		if (!dir.exists()) {
			dir.mkdir();
			file.createNewFile();
		} else {
			file.createNewFile();
		}
		try (FileOutputStream fop = new FileOutputStream(file)) {
			// get the content in bytes
			Log.info(" In try catch");
			byte[] contentInBytes = content.getBytes();

			fop.write(contentInBytes);
			fop.flush();
			fop.close();

		} catch (IOException e) {
			Log.info(" throw exception");
			e.printStackTrace();
		}
	}

	public static String getFileContents() throws IOException, InterruptedException {
//		String rootDir = System.getProperty("user.dir");
//		String path = new File("C:\\Temp\\your directory\\yourfile.txt").getParent();
//		String currentDir = "/Users/autonomous/Documents/GitHub/incognito-wallet/automation_test/AutomationCore/src/main/java/file/";
		fileName = curDir + fileName;
		File file = new File(fileName);
		BufferedReader br = new BufferedReader(new FileReader(file));
		FileInputStream stream = new FileInputStream(file);
		String result = "";
		String st;
		while ((st = br.readLine()) != null)
			result += st;

		return result;
	}

	public void writeToFile(JSONObject line) throws IOException {
		try {
			fileName = curDir + fileName;
			Writer output;
			output = new BufferedWriter(new FileWriter(fileName, true));
			output.append(line.toJSONString());
			output.flush();
			output.close();
		} catch (IOException e) {
			// TODO: handle exception
		}

	}

	public void jsonToMap(String json) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			@SuppressWarnings("unchecked")
			Map<String, String> map = mapper.readValue(json, Map.class);
			System.out.println(map);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
