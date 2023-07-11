# Vite + React 18 + TS + TailwindCSS + ESLint + Capacitor

## Configuraciones del proyecto

## Vite

- When we run locally the web server, Vite will be in *dev mode*.
- When we create the web build, Vite will be in *production mode*.
- When we run `npm run build-android` = `vite build --mode android`, we Vite to be in *android mode*.
- Vite environment variables must following the following schema:
`VITE_<ENV_NAME>=<ENV_VALUE>`

## Environment variables

    VITE_APP_ID=CLIENT ID
    VITE_AUTHORITY=https://login.microsoftonline.com/OBJECT ID
    VITE_REDIRECT_URI=http://localhost:3000
    VITE_GRAPH_ENDPOINT=https://graph.microsoft.com/v1.0/me
    VITE_API_URL=

1. `.env.development.local` defines the environment variables in dev mode.

2. `.env.production.local` defines the environment variables in production mode.

3. `.env.android.local` defines the environment variables in android mode.

## Commands

### Web development

1. Initialize dev server:

    ```sh
    npm run dev
    ```

### Web production

1. Build for prod:

    ```sh
    npm run build
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

3. Run on android emulator (Android Studio recommended)

    ```sh
    npx cap sync
    npx cap run android
    ```

4. Build debug and release bundle

    ```sh
    npm run build-web
    npm run build-android
    npx cap sync

    cd ./android
    chmod +x gradlew
    ./gradlew assembleDebug
    #./gradlew assembleRelease
    ```
