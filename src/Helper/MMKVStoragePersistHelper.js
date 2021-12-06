import MMKVStorage from 'react-native-mmkv-storage';
import {keyPrefix, whitelist} from '../Config/ReduxPersistConst';

class MMKVStoragePersistHelper {
  constructor() {
    this.MMKV = new MMKVStorage.Loader().setProcessingMode(
      MMKVStorage.MODES.MULTI_PROCESS
    );
    // .withInstanceID('virtuslspace')
    // .setAccessibleIOS(MMKVStorage.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY)
    // .initialize();
    // .initialize(); // Returns an MMKV Instance

    this.MMKV.withInstanceID('dompetdhuafa');
    this.MMKV = this.MMKV.initialize();

    // MMKV = MMKV.setProcessingMode(MMKVStorage.MODES.SINGLE_PROCESS); // OR MMKVStorage.MODES.MULTI_PROCESS
    // this.MMKV = MMKV;
  }

  async setItem(key, value) {
    try {
      const res = await this.MMKV.setStringAsync(key, value);
      console.tron.error({RES_SET_ITEM: res});
    } catch (error) {
      console.tron.error({error});
    }
  }

  async setStringItem(key, value) {
    try {
      const res = await this.MMKV.setStringAsync(key, value);
      console.tron.error({RES_SET_ITEM: res});
    } catch (error) {
      console.tron.error({error});
    }
  }

  async setBoolItem(key, value) {
    await this.MMKV.setBoolAsync(key, value);
  }

  async getBoolItem(key) {
    const ret = await this.MMKV.getBoolAsync(key);
    return ret;
  }

  async getItem(key, callback) {
    try {
      console.tron.error({key});
      const res = await this.MMKV.getStringAsync(key);
      if (callback) {
        callback(undefined, res);
        return;
      }
    } catch (error) {
      if (callback) {
        callback(error, undefined);
      }
    }
  }

  async getStringItem(key, callback) {
    try {
      const res = await this.MMKV.getStringAsync(key);
      if (callback) {
        callback(undefined, res);
        return;
      }
    } catch (error) {
      if (callback) {
        callback(error, undefined);
      }
    }
  }

  async removeItem(key, callback) {
    try {
      const res = await this.MMKV.removeItem(key);
      console.tron.error({res});
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  }

  async getAllKeys(callback) {
    try {
      const keys = whitelist.map((key) => `${keyPrefix}${key}`);
      callback(undefined, keys);
    } catch (error) {
      callback(error, undefined);
    }
  }

  async clearAll() {
    try {
      const res = await this.MMKV.clearStore();
      console.tron.error({RES_CLEAR_STORE: res});
    } catch (error) {
      console.tron.error({error});
    }
  }

  setMap(key, object) {
    if (key !== undefined && object !== undefined) {
      this.MMKV.setMap(key, object, (error, result) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }

  async getMultipleItems(keys, type = 'map') {
    try {
      const res = await this.MMKV.getMultipleItemsAsync(keys, type);
      return res;
    } catch (error) {
      console.tron.error({error});
      return {};
    }
  }

  async getStringPromise(key) {
    const res = await this.MMKV.getStringAsync(key);
    return res;
  }
}

export default new MMKVStoragePersistHelper();
