package com.auto.core.utils;

import org.apache.log4j.Logger;
import com.auto.core.helpers.StringHelper;

public class Log {

	public static void info(String... message) {

		String loggerName = Thread.currentThread().getStackTrace()[2].getClassName();
		Logger logger = Logger.getLogger(loggerName);
		logger.info(StringHelper.arrayToString(message));
	}

	public static void warn(String... message) {

		String loggerName = Thread.currentThread().getStackTrace()[2].getClassName();
		Logger logger = Logger.getLogger(loggerName);
		logger.warn(StringHelper.arrayToString(message));
	}

	public static void error(String... message) {

		String loggerName = Thread.currentThread().getStackTrace()[2].getClassName();
		Logger logger = Logger.getLogger(loggerName);
		logger.error(StringHelper.arrayToString(message));
	}

	public static void fatal(String... message) {

		String loggerName = Thread.currentThread().getStackTrace()[2].getClassName();
		Logger logger = Logger.getLogger(loggerName);
		logger.fatal(StringHelper.arrayToString(message));
	}

	public static void debug(String... message) {

		String loggerName = Thread.currentThread().getStackTrace()[2].getClassName();
		Logger logger = Logger.getLogger(loggerName);
		logger.debug(StringHelper.arrayToString(message));
	}
}
