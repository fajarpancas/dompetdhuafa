package com.dompetdhuafa.app.modules.tempstorage;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mmkv.MMKV;

public class TempStorageModule extends ReactContextBaseJavaModule {
    MMKV mmkv;
    WritableArray args = Arguments.createArray();

    public TempStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        MMKV.initialize(reactContext);
        mmkv = MMKV.mmkvWithID("dompetdhuafa", MMKV.MULTI_PROCESS_MODE);
        String[] keys = mmkv.allKeys();
        if (keys != null) {
            for (String key: keys) {
                if (mmkv.containsKey(key)) {
                    Bundle bundle = mmkv.decodeParcelable(key, Bundle.class);
                    if (bundle != null) {
                        WritableMap value = Arguments.fromBundle(bundle);
                        WritableArray item = Arguments.createArray();
                        item.pushString(key);
                        item.pushMap(value);
                        args.pushArray(item);
                    }
                }
            }
        }
    }

    @Override
    public String getName() {
        return "TempStorage";
    }

    @ReactMethod
    public void getAllData(Promise promise) {
        try {
            promise.resolve(args);
        } catch(Exception e) {
            promise.reject("Error return data", e);
        }
    }
}
