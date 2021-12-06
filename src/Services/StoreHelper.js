class StoreHelper {
  storeInstance;

  constructor() {
    this.putStoreInstance = this.putStoreInstance.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  putStoreInstance(instance) {
    this.storeInstance = instance;
  }

  dispatch(action) {
    if (this.storeInstance) {
      this.storeInstance.dispatch(action);
    }
  }
}

export default new StoreHelper();
