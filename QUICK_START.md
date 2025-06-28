# دليل البدء السريع - GitHub Actions

## 🚀 البدء السريع

### 1. رفع المشروع إلى GitHub
```bash
# إنشاء مستودع جديد على GitHub أولاً، ثم:
git init
git add .
git commit -m "Initial commit: Project Manager Pro"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/project-manager-pro.git
git push -u origin main
```

### 2. تحديث معلومات المستودع
عدّل ملف `package.json` واستبدل:
```json
"publish": {
  "provider": "github",
  "owner": "YOUR_USERNAME",
  "repo": "project-manager-pro"
}
```

### 3. إنشاء أول إصدار
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 4. مراقبة البناء
- اذهب إلى `https://github.com/YOUR_USERNAME/project-manager-pro/actions`
- ستجد workflow "Build and Release" قيد التشغيل
- انتظر 10-15 دقيقة حتى اكتمال البناء

### 5. تحميل الملفات
بعد اكتمال البناء، ستجد الملفات في:
- **للإصدارات**: `https://github.com/YOUR_USERNAME/project-manager-pro/releases`
- **للاختبار**: تبويب Actions > اختر البناء > Artifacts

## 📦 الملفات المُنتجة

| المنصة | الملف | الحجم المتوقع |
|--------|-------|---------------|
| ويندوز | `Project-Manager-Pro-Setup.exe` | ~150 MB |
| ويندوز | `Project-Manager-Pro.msi` | ~150 MB |
| ماك | `Project-Manager-Pro.dmg` | ~160 MB |
| لينكس | `Project-Manager-Pro.AppImage` | ~155 MB |
| لينكس | `project-manager-pro.deb` | ~150 MB |

## ⚡ اختبار محلي

قبل رفع الكود، اختبر البناء محلياً:
```bash
npm install
npm run build
npm run electron-pack
```

## 🔧 تخصيص البناء

### تغيير اسم التطبيق
في `package.json`:
```json
{
  "name": "your-app-name",
  "productName": "Your App Name",
  "build": {
    "appId": "com.yourcompany.yourapp"
  }
}
```

### إضافة أيقونات مخصصة
ضع الأيقونات في مجلد `assets/`:
- `icon.ico` (ويندوز)
- `icon.icns` (ماك)
- `icon.png` (لينكس)

### تخصيص المثبت
في `package.json` > `build` > `nsis`:
```json
"nsis": {
  "oneClick": false,
  "allowToChangeInstallationDirectory": true,
  "createDesktopShortcut": true,
  "createStartMenuShortcut": true,
  "installerIcon": "assets/installer.ico",
  "uninstallerIcon": "assets/uninstaller.ico"
}
```

## 🐛 حل المشاكل الشائعة

### البناء فشل على ويندوز
```
Error: Cannot find module 'electron'
```
**الحل**: تأكد من وجود `electron` في `devDependencies`

### البناء فشل على ماك
```
Error: Application with identifier com.example.app not found
```
**الحل**: غيّر `appId` في `package.json` ليكون فريداً

### الملفات كبيرة جداً
**الحل**: أضف إلى `package.json`:
```json
"build": {
  "compression": "maximum",
  "nsis": {
    "differentialPackage": true
  }
}
```

### لا توجد أيقونة للتطبيق
**الحل**: تأكد من وجود ملفات الأيقونات في مجلد `assets/`

## 📞 الدعم

- **الوثائق**: [electron-builder docs](https://www.electron.build/)
- **GitHub Actions**: [Actions docs](https://docs.github.com/en/actions)
- **المشاكل**: افتح issue في المستودع

## ✅ قائمة التحقق

- [ ] رفع الكود إلى GitHub
- [ ] تحديث معلومات المستودع في `package.json`
- [ ] إضافة أيقونات التطبيق
- [ ] إنشاء tag للإصدار
- [ ] مراقبة البناء في Actions
- [ ] اختبار الملفات المُنتجة
- [ ] نشر الإصدار للمستخدمين

---

🎉 **مبروك!** تطبيقك جاهز للتوزيع على جميع المنصات!

