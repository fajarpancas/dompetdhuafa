import {NativeModules} from 'react-native';
import {fromJS, Map} from 'immutable';
import CUSTOM_PERSIST from '../Config/CustomPersistConfig';
import MMKVStoragePersistHelper from '../Helper/MMKVStoragePersistHelper';

class TempStorage {
  restored = Map();

  constructor() {
    this.init = this.init.bind(this);
    this.getRestoreData = this.getRestoreData.bind(this);
  }

  async init() {
    try {
      const value = await MMKVStoragePersistHelper.getStringPromise(
        'reducerVersion'
      );
      if (value !== null) {
        if (value === CUSTOM_PERSIST.version) {
          const datas = await NativeModules.TempStorage.getAllData();
          console.tron.error({datas});
          this.restored = this.restored.withMutations((s) => {
            datas.forEach((data) => {
              s.set(data[0], fromJS(data[1]));
            });
          });
          return;
        }
      }
      await MMKVStoragePersistHelper.clearAll();
      await MMKVStoragePersistHelper.setStringItem(
        'reducerVersion',
        CUSTOM_PERSIST.version
      );
    } catch (error) {
      console.tron.error({ERROR_GET_TEMP_STORAGE: error});
    }
  }

  getRestoreData() {
    return this.restored;
  }
}

export default new TempStorage();
