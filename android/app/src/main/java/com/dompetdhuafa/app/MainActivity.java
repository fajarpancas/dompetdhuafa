package com.dompetdhuafa.app;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;
import com.dompetdhuafa.app.modules.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);  // here
    super.onCreate(savedInstanceState);
  }
}
