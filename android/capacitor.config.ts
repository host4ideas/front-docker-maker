import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dockermaker.app',
  appName: 'Docker Maker App',
  webDir: 'android-build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
