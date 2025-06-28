# دليل GitHub Actions للبناء التلقائي

## نظرة عامة

تم إعداد GitHub Actions workflow لبناء ملفات تنفيذية للتطبيق على جميع المنصات (ويندوز، ماك، لينكس) تلقائياً. يتم تشغيل البناء عند:

- إنشاء tag جديد (للإصدارات)
- Push إلى branch main
- تشغيل يدوي من واجهة GitHub

## الملفات المُنتجة

### ويندوز
- `Project-Manager-Pro-Setup.exe` - مثبت NSIS
- `Project-Manager-Pro.msi` - مثبت MSI
- `Project-Manager-Pro-win.zip` - أرشيف مضغوط

### macOS
- `Project-Manager-Pro.dmg` - صورة قرص للتثبيت
- `Project-Manager-Pro-mac.zip` - أرشيف مضغوط

### Linux
- `Project-Manager-Pro.AppImage` - ملف تنفيذي محمول
- `project-manager-pro.deb` - حزمة Debian/Ubuntu
- `project-manager-pro.rpm` - حزمة Red Hat/Fedora
- `project-manager-pro.tar.gz` - أرشيف مضغوط

## كيفية الاستخدام

### 1. رفع الكود إلى GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/project-manager-pro.git
git push -u origin main
```

### 2. إنشاء إصدار جديد
```bash
# إنشاء tag للإصدار
git tag v1.0.0
git push origin v1.0.0
```

### 3. مراقبة البناء
- اذهب إلى تبويب "Actions" في مستودع GitHub
- ستجد workflow "Build and Release" قيد التشغيل
- انتظر حتى اكتمال البناء على جميع المنصات

### 4. تحميل الملفات
- بعد اكتمال البناء، ستجد الملفات في:
  - تبويب "Releases" (للإصدارات المُعلمة)
  - تبويب "Actions" > "Artifacts" (للبناءات التجريبية)

## إعداد المستودع

### 1. تحديث package.json
تأكد من تحديث معلومات المستودع في `package.json`:
```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "your-username",
      "repo": "project-manager-pro"
    }
  }
}
```

### 2. إعداد الأسرار (اختياري)
لتوقيع التطبيقات على macOS وويندوز، أضف الأسرار التالية في إعدادات المستودع:
- `CSC_LINK` - شهادة توقيع الكود
- `CSC_KEY_PASSWORD` - كلمة مرور الشهادة

### 3. تخصيص البناء
يمكنك تخصيص عملية البناء عبر تعديل:
- `.github/workflows/build.yml` - إعدادات GitHub Actions
- `package.json` - تكوين electron-builder

## استكشاف الأخطاء

### البناء فشل على منصة معينة
- تحقق من logs في تبويب Actions
- تأكد من توافق التبعيات مع المنصة
- راجع تكوين electron-builder

### الملفات لا تظهر في Releases
- تأكد من أن البناء تم تشغيله بواسطة tag
- تحقق من صلاحيات GITHUB_TOKEN
- راجع إعدادات المستودع

### حجم الملفات كبير
- استخدم `electron-builder` مع تحسينات الحجم
- استبعد الملفات غير الضرورية في `package.json`
- فعل ضغط الملفات

## الدعم

للحصول على المساعدة:
- راجع [وثائق electron-builder](https://www.electron.build/)
- راجع [وثائق GitHub Actions](https://docs.github.com/en/actions)
- افتح issue في المستودع للمساعدة

