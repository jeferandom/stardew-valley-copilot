# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Build APK
https://dev.to/chinmaymhatre/how-to-generate-apk-using-react-native-expo-kae
```sh
C:\Users\conta\src\open_source\stardew-valley-copilot>expo whoami
WARNING: The legacy expo-cli does not support Node +17. Migrate to the new local Expo CLI: https://blog.expo.dev/the-new-expo-cli-f4250d8e3421.
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│   The global expo-cli package has been deprecated.                        │
│                                                                           │
│   The new Expo CLI is now bundled in your project in the expo package.    │
│   Learn more: https://blog.expo.dev/the-new-expo-cli-f4250d8e3421.        │
│                                                                           │
│   To use the local CLI instead (recommended in SDK 46 and higher), run:   │
│   › npx expo <command>                                                    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
Logged in as jheffmancera

C:\Users\conta\src\open_source\stardew-valley-copilot>eas build -p android --profile preview
Loaded "env" configuration for the "preview" profile: no environment variables specified. Learn more: https://docs.expo.dev/build-reference/variables/
EAS project not configured.
√ Would you like to automatically create an EAS project for @jheffmancera/stardew-valley-farmhand? ... no
EAS project ID configuration canceled for @jheffmancera/stardew-valley-farmhand. Run 'eas init' to configure.
    Error: build command failed.

C:\Users\conta\src\open_source\stardew-valley-copilot>eas build -p android --profile preview
Loaded "env" configuration for the "preview" profile: no environment variables specified. Learn more: https://docs.expo.dev/build-reference/variables/
EAS project not configured.
√ Would you like to automatically create an EAS project for @jheffmancera/stardew-valley-farmhand? ... yes
✔ Created @jheffmancera/stardew-valley-farmhand: https://expo.dev/accounts/jheffmancera/projects/stardew-valley-farmhand on Expo
✔ Linked local project to EAS project 89e79e44-18a4-4efd-98d4-b929a22b3108

📝  Android application id Learn more: https://expo.fyi/android-package
√ What would you like your Android application id to be? ... com.jheffmancera.stardewvalleyfarmhand
✔ Using remote Android credentials (Expo server)
√ Generate a new Android Keystore? ... yes
Detected that you do not have keytool installed locally.
✔ Generating keystore in the cloud...
✔ Created keystore

Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
✔ Uploaded to EAS
✔ Created project metadata file
✔ Uploaded to EAS

Build details: https://expo.dev/accounts/jheffmancera/projects/stardew-valley-farmhand/builds/21d7c824-e14b-4e49-9e78-afd588626f18

Waiting for build to complete. You can press Ctrl+C to exit.
✔ Build finished

🤖 Android app:
https://expo.dev/artifacts/eas/5bonMCc4FB2mysiMCXbvrs.apk

√ Install and run the Android build on an emulator? ... no

C:\Users\conta\src\open_source\stardew-valley-copilot>



```