These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

zipalign -v 4 app-release-unsigned.apk mybaby.apk