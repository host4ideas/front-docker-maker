# Vite + React 18 + TS + TailwindCSS + ESLint + Capacitor + Electron

## Based on

[electron-vite](https://electron-vite.org/)
[Electron + Vite + React + TS](https://github.com/alex8088/quick-start/tree/master/packages/create-electron/playground/react-ts)
`npm create vite@latest vite-and-capacitor --template react-ts`

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project configurations

### Vite

- When run locally the web server, Vite will be in *dev mode*.
- When create the web build, Vite will be in *web mode*.
- When create the android build, Vite will be in *android mode*.
- electron-vite environment variables must following the following schema:
        - Main env: `MAIN_VITE_<ENV_NAME>=<ENV_VALUE>`
        - Preload env: `PRELOAD_VITE_<ENV_NAME>=<ENV_VALUE>`
        - Renderer env: `RENDERER_VITE_<ENV_NAME>=<ENV_VALUE>`

### Environment variables

    VITE_APP_ID=CLIENT ID
    VITE_AUTHORITY=https://login.microsoftonline.com/OBJECT ID
    VITE_REDIRECT_URI=http://localhost:3000
    VITE_GRAPH_ENDPOINT=https://graph.microsoft.com/v1.0/me
    VITE_API_URL=

1. `.env.development.local` defines the environment variables in dev mode.

2. `.env.web.local` defines the environment variables in web mode.

3. `.env.android.local` defines the environment variables in android mode.

4. `.env.desktop.local` defines the environment variables in desktop mode.

### Android SDK

1. Install Android Studio (tested until Flamingo | 2022.2.1) (Optional)

2. It is mandatory to set up the environment variables for the Android build:

    ```sh
    $env:Path += ";$env:C:\Users\user\AppData\Local\Android\platform-tools"
    $env:ANDROID_SDK_ROOT="C:\Users\user\AppData\Local\Android"
    $env:JAVA_HOME='C:\Program Files\Java\jdk-17'
    ```

## Commands

### Web development

1. Initialize dev server and Electron app (both use .env.development.local):

    ```sh
    npm run dev
    ```

### Web production

1. Build for prod:

    ```sh
    npm run build-web
    ```

### Android

1. Build for android:

    ```sh
    npm run build-android
    ```

2. Set environment variables:

    ```sh
    $env:Path += ";$env:C:\Users\user\AppData\Local\Android\platform-tools"
    $env:ANDROID_SDK_ROOT="C:\Users\user\AppData\Local\Android"
    $env:JAVA_HOME='C:\Program Files\Java\jdk-17'
    ```

3. Run on android emulator (Android Studio recommended):

    ```sh
    npx cap sync
    npx cap run android
    ```

4. Build debug and release bundle:

    ```sh
    npm run build-android
    npx cap sync

    cd ./android
    chmod +x gradlew
    ./gradlew assembleDebug
    #./gradlew assembleRelease
    ```

## Electron

### Development

1. Initialize dev server and Electron app (both use .env.development.local):

    ```sh
    npm run dev
    ```

2. Open DevTools in Electron (disabled in prod):

    `Ctrl + Shift + I`

### Build

    ```sh
    # For windows
    npm run build:win
    
    # For macOS
    npm run build:mac
    
    # For Linux
    npm run build:linux
    ```

## Resources

<https://ionicframework.com/docs/react/adding-ionic-react-to-an-existing-react-project>
<https://staffordwilliams.com/blog/2023/03/06/ionic-capacitor-vite/>
<https://ionicframework.com/docs/react/your-first-app/deploying-mobile>
<https://stackoverflow.com/questions/76158436/how-to-implement-azure-active-directory-msal-in-ionic-react-so-it-works-when-t>
<https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-desktop>
