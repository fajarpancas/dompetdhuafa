//
//  TempStorage.swift
//  VirtualSpace
//
//  Created by Fajar Panca on 05/12/21.
//

import Foundation

@objc(TempStorage)
class TempStorage: NSObject {
  var mmkv: MMKV
  let groupId: String = "group.com.dompetdhuafa.app"
  var objects: [Any] = []
  
  override init() {
    let groupDir: String = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: groupId)!.path
    MMKV.initialize(rootDir: nil, groupDir: groupDir, logLevel: MMKVLogLevel.info)
    self.mmkv = MMKV.init(mmapID: "dompetdhuafa", mode: MMKVMode.multiProcess)!
    MMKV.enableAutoCleanUp(maxIdleMinutes: 10)
    let keys: [String] = self.mmkv.allKeys() as! [String]
    for key: String in keys {
      if (self.mmkv.contains(key: key)) {
        let value: NSDictionary? = self.mmkv.object(of: NSDictionary.classForCoder(), forKey: key) as? NSDictionary
        if (value != nil) {
          var item: [Any?] = []
          item.append(key)
          item.append(value)
          objects.append(item)
        }
      }
    }
  }
  
  @objc
  func getAllData(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve(self.objects)
  }
}

