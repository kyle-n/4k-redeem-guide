package com.uhdredeemguide;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SpreadsheetMapper extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    SpreadsheetMapper(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "SpreadsheetMapper";
    }
}
