package com.dompetdhuafa.app.modules.tempstorage;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mmkv.MMKV;

public class TempStorage {
    Context context;
    String instanceId;
    MMKV mmkv;

   public TempStorage(String instanceId, Context context) {
       this.instanceId = instanceId;
       this.context = context;
   }

   public void init() {
        MMKV.initialize(this.context);
        mmkv = MMKV.mmkvWithID(this.instanceId, MMKV.MULTI_PROCESS_MODE);
        String[] keys = mmkv.allKeys();
        if (keys != null) {
            for(String key: keys) {
                if (mmkv.containsKey(key)) {
                    Bundle bundle = mmkv.decodeParcelable(key, Bundle.class);
                    Log.d("CEK", String.valueOf(bundle));
                    if (bundle != null) {
                        WritableMap map = Arguments.fromBundle(bundle);
                        if (map != null) {
                            Log.d("CEKK", String.valueOf(map));
                        }
                    }
                }
            }
        }
   }
}
