---
title: Progressive Web Apps (PWA)
description: Web apps that feel Native.
category: Core Concepts (Mobile)
---

# Progressive Web Apps (PWA)

## Overview
A **PWA** is a website that uses modern web capabilities to deliver an app-like experience to users. It aims to combine the reach of the web (linkable, no app store) with the capabilities of native apps (offline, notifications).

## The Hero: Service Workers
The core technology behind PWAs is the **Service Worker**. It is a script that runs in the background, separate from the web page. It acts as a network proxy.
- **Offline Support:** It can intercept network requests and serve cached files if the user is offline.
- **Background Sync:** Sync data when connectivity returns.
- **Push Notifications:** Receive updates even when the tab is closed.

## The Manifest
A JSON file (`manifest.json`) that tells the browser how your web app should behave when "installed" on the user's home screen.
- Icons, App Name, Theme Colors.
- Splash screen configuration.
- Display mode (Standalone, hiding the browser URL bar).

## Pros vs Native
- **Pros:** One codebase for Web/iOS/Android. No App Store approval process. Instant updates.
- **Cons:** Limited access to device hardware (though improving). iOS PWA support is historically weaker than Android.
