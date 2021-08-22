package com.samott;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
    MobileAds.initialize(this, new OnInitializationCompleteListener() {
        @Override
        public void onInitializationComplete(InitializationStatus initializationStatus) {
        }
    });
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SaMott";
  }
}
