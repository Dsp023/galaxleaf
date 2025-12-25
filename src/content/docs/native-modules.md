---
title: Native Modules
description: Extending React Native.
category: Mobile
---

# Native Modules

## Overview
Sometimes React Native doesn't have a JavaScript API for a specific platform feature (e.g., accessing the Battery Level, Bluetooth, or a specific Payment SDK).
**Native Modules** allow you to write native code (Swift/Kotlin) and expose it to JavaScript.

## How it works
1.  **Write Native Code:** You write a Class in Swift (iOS) or Java/Kotlin (Android) that implements the specific logic.
2.  **Expose Method:** You use macros (like `RCT_EXPORT_METHOD`) to mark functions callable by React Native.
3.  **Call from JS:** In your JavaScript file:
    ```javascript
    import { NativeModules } from 'react-native';
    const { BatteryModule } = NativeModules;
    
    const level = await BatteryModule.getLevel();
    ```

## Expo Modules
If you use Expo, writing native modules is simplified using the **Expo Modules API**, which provides a unified Swift/Kotlin API that works easier than the vanilla React Native boilerplate.
