# Google Play Upload Instructions

## APK Location
```
/root/intelvault/app-release-signed.apk
```

## Upload Steps

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (or create new)
3. Go to **Production** → **Create new release**
4. Upload `app-release-signed.apk`
5. Fill in release notes:
   ```
   Initial release with HB logo and PWA integration.
   Features: Offline reading, push notifications, native app experience.
   ```
6. Review and roll out

## App Details (from google-play-listing.md)

| Field | Value |
|-------|-------|
| App title | Daily Healthy Bites |
| Short description | Science-backed health & longevity insights. Evidence you can trust. |
| Category | Health & Fitness > Health & Nutrition |
| Content rating | Everyone |
| Privacy policy URL | https://dailyhealthybites.net/privacy |

## Required Graphics

| Graphic | Size | File |
|---------|------|------|
| App icon | 512x512 | `android-chrome-512x512.png` |
| Feature graphic | 1024x500 | Need to create |
| Screenshots | Phone screenshots | Need to create |

## Copy APK to local machine

```bash
scp root@204.168.248.0:/root/intelvault/app-release-signed.apk ~/Downloads/
```
