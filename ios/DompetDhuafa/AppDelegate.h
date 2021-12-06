#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <MMKV/MMKV.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) MMKV *mmkv;

@end
