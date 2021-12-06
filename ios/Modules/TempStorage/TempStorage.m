//
//  TempStorage.m
//  VirtualSpace
//
//  Created by Fajar Panca on 05/12/21.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(TempStorage, NSObject)
RCT_EXTERN_METHOD(init)
RCT_EXTERN_METHOD(
                  getAllData: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
@end
