import MMKVStoragePersistHelper from '../Helper/MMKVStoragePersistHelper';
import {Map, fromJS} from 'immutable';
import StartupActions from '../Redux/StartupRedux';

const prevStoreToCompare = {};
export function createCustomPersist(store, config) {
  // rehidration move to tempstorage module
  // do rehidration
  // rehidrated(store, config);

  // do subscription to save
  const {whitelist} = config;
  whitelist.forEach((key) => {
    prevStoreToCompare[key] = undefined;
  });

  store.subscribe(() => {
    whitelist.forEach((key) => {
      const value = store.getState().get(key);
      if (prevStoreToCompare[key] !== value) {
        prevStoreToCompare[key] = value;
        if (prevStoreToCompare[key]) {
          MMKVStoragePersistHelper.setMap(key, prevStoreToCompare[key].toJS());
        }
      }
    });
  });
}

export async function getStoredData(config) {
  const {whitelist} = config;
  const res = await MMKVStoragePersistHelper.getMultipleItems(whitelist);
  return res;
}

export function rehidrated(store, config) {
  const {version, whitelist} = config;
  const startup = () => store.dispatch(StartupActions.startup());
  MMKVStoragePersistHelper.getItem('reducerVersion', async (isError, value) => {
    console.tron.error({isError, value});
    if (isError === undefined && value !== null) {
      console.tron.error({value, version});
      if (value !== version) {
        console.tron.error('MASUK BEDA VERSIOn');
        MMKVStoragePersistHelper.clearAll();
        MMKVStoragePersistHelper.setStringItem('reducerVersion', version);
        startup();
      } else {
        try {
          // rehidrated here
          const datas = await MMKVStoragePersistHelper.getMultipleItems(
            whitelist
          );

          let restored = Map({}).withMutations((s) => {
            datas.forEach((data) => {
              s.set(data[0], fromJS(data[1]));
            });
          });

          datas.forEach((data) => {
            store.getState().set(data[0], fromJS(data[1]));
          });

          let rehydrateAction = {
            type: 'REHYDRATE',
            payload: restored
          };
          // dispatch to `store` to rehydrate and `persistor` to track result
          store.dispatch(rehydrateAction);
        } finally {
          startup();
        }
      }
    } else {
      MMKVStoragePersistHelper.clearAll();
      MMKVStoragePersistHelper.setStringItem('reducerVersion', version);
      startup();
    }
  });
}
