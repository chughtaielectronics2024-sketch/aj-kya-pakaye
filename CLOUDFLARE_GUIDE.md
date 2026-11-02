# کلائوڈ فلیئر (Cloudflare Pages) پر چلانے کی مکمل گائیڈ

آپ کی ایپلیکیشن اب **Cloudflare Pages** پر چلنے کے لیے 100% تیار (Pre-configured) کر دی گئی ہے۔
اس میں ضروری فائلز شامل کر دی گئی ہیں:
- `public/_redirects` (کلائنٹ راؤٹنگ اور ریفریش کے لیے)
- `public/_headers` (سیکیورٹی، کیشنگ اور PWA کی تیز رفتاری کے لیے)
- `wrangler.toml` (کلائوڈ فلیئر کنفیگریشن)
- `functions/api/` (کلائوڈ فلیئر سرور لیس فنکشنز)

---

## طریقہ نمبر 1: Cloudflare Dashboard سے (سب سے آسان اور مفت طریقہ)

### مرحلہ 1: کوڈ کو GitHub پر اپلوڈ کریں
1. اپنے کمپیوٹر پر اس پروجیکٹ کے فولڈر میں جا کر کوڈ کو اپنے GitHub اکاؤنٹ میں ایک نئی Repository (مثلاً `aj-kya-pakaye`) بنا کر Push کر دیں۔

### مرحلہ 2: Cloudflare اکاؤنٹ سے جوڑیں
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) پر جائیں اور لاگ ان کریں۔
2. بائیں جانب مینیو سے **Workers & Pages** پر کلک کریں۔
3. **Create application** پر کلک کریں، پھر **Pages** کا ٹیب منتخب کریں اور **Connect to Git** پر کلک کریں۔
4. اپنے GitHub اکاؤنٹ سے وہ repository (`aj-kya-pakaye`) منتخب کریں۔

### مرحلہ 3: بلڈ سیٹنگز (Build Settings) درج کریں
کلائوڈ فلیئر آپ سے درج ذیل سیٹنگز پوچھے گا، ہو بہو یہ لکھیں:

| فیلڈ (Field) | کیا لکھنا ہے (Value) |
|---|---|
| **Project Name** | `aj-kya-pakaye` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### مرحلہ 4: ماحولیاتی متغیرات (Environment Variables)
نیچے **Environment variables (advanced)** کھولیں اور شامل کریں:
- **Variable name:** `GEMINI_API_KEY`
- **Value:** اپنا Gemini API Key درج کریں۔
- **Variable name:** `NODE_VERSION`
- **Value:** `20`

### مرحلہ 5: ڈپلائی کریں
- نیچے **Save and Deploy** پر کلک کریں۔
- Cloudflare صرف 1 سے 2 منٹ میں ایپ بلڈ کر کے آپ کو ایک لائیو مفت لنک فراہم کر دے گا (مثال: `https://aj-kya-pakaye.pages.dev`)۔

---

## طریقہ نمبر 2: کمپیوٹر ٹرمینل (Wrangler CLI) کے ذریعے براہ راست ڈپلائی

اگر آپ GitHub استعمال نہیں کرنا چاہتے اور سیدھا اپنے لیپ ٹاپ/کمپیوٹر سے اپلوڈ کرنا چاہتے ہیں:

```bash
# 1. پروڈکشن بلڈ تیار کریں
npm run build

# 2. کلائوڈ فلیئر پر ڈپلائی کریں
npx wrangler pages deploy dist --project-name=aj-kya-pakaye
```

پہلی بار چلانے پر کلاؤڈ فلیئر آپ کے براؤزر میں اجازت مانگے گا، اور اس کے بعد چند سیکنڈز میں ایپ انٹرنیٹ پر لائیو ہو جائے گی!

---

## اپنی کسٹم ڈومین (Custom Domain) کیسے جوڑیں؟

Cloudflare Pages پر آپ اپنی کسٹم ڈومین (جیسے `ajkyapakaye.com` یا `mykitchen.pk`) بالکل مفت جوڑ سکتے ہیں:
1. اپنے پروجیکٹ پر کلک کریں۔
2. **Custom domains** ٹیب میں جائیں۔
3. **Set up a custom domain** پر کلک کریں۔
4. اپنی خریدی ہوئی ڈومین درج کریں۔
5. کلائوڈ فلیئر خودکار طریقے سے مفت **SSL Certificate (HTTPS)** فعال کر دے گا اور آپ کی ایپ آپ کی ڈومین پر لائیو ہو جائے گی!
