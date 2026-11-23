# Srinidhi Enterprises – Install & Start Guide  /  நிறுவல் & தொடக்க வழிகாட்டி

Admin username: **Srinidhi**   (password = the one you set; never share it / கடவுச்சொல்லை யாரிடமும் பகிர வேண்டாம்)

---------------------------------------------------------------------
## 1. FIRST START / முதல் முறை தொடங்க (10 steps)

| # | English | தமிழ் |
|---|---------|-------|
| 1 | Open the app → tap the company name (top) → set **company name, address, phone, GSTIN, logo** (Update). | ஆப்பைத் திறந்து மேலே கம்பெனி பெயரைத் தொட்டு **பெயர், முகவரி, போன், GSTIN, லோகோ** அமைக்கவும். |
| 2 | Settings → choose language **English / தமிழ்**. | Settings → மொழி **English / தமிழ்** தேர்வு. |
| 3 | **Supplier Master** → add Brand + Supplier + Contact person + Contact number. | **Supplier Master** → Brand, Supplier, தொடர்பு நபர், எண் சேர்க்கவும். |
| 4 | **Product Master** → add products (name, MRP, cost per Box, packets per Box, Brand, Supplier). | **Product Master** → பொருள் பெயர், MRP, Box கொள்முதல் விலை, Box-இல் Packet எண்ணிக்கை, Brand, Supplier. |
| 5 | **Opening Stock** → type quantities or **Import Excel** (download the template first). | **Opening Stock** → அளவுகளை உள்ளிடவும் அல்லது **Excel Import** (முதலில் template எடுக்கவும்). |
| 6 | **Customer Database** → add customers (optional – billing also saves them automatically). | **Customer Database** → வாடிக்கையாளர்கள் (பில் போடும்போதும் தானாக சேமிக்கப்படும்). |
| 7 | Buying: **Create PO** → when goods arrive use **Deliveries** (many deliveries per PO; excess allowed). | வாங்க: **Create PO** → சரக்கு வந்ததும் **Deliveries** (ஒரு PO-க்கு பல டெலிவரி; கூடுதலும் ஏற்கப்படும்). |
| 8 | Selling: **New Quotation / New Invoice** → send by WhatsApp → record dispatch in **Sales Deliveries**. | விற்க: **New Quotation / New Invoice** → WhatsApp அனுப்பு → **Sales Deliveries**-இல் டெலிவரி பதிவு. |
| 9 | Costs: **Expenses** (rent, salary, transport…) → **Reports** shows Net Profit / Loss. | செலவுகள்: **Expenses** (வாடகை, சம்பளம், போக்குவரத்து…) → **Reports** நிகர லாபம்/நஷ்டம் காட்டும். |
| 10 | Settings → **Excel Export (whole data)** regularly. Keep the file safe. | Settings → **முழு தரவு Excel Export** அடிக்கடி செய்து பாதுகாக்கவும். |

Each screen has a **? Help** button (what it does, Do / Don't) and the **Help** menu has the full guide.
ஒவ்வொரு திரையிலும் **? Help** பட்டன் உள்ளது (என்ன செய்யும், செய்ய வேண்டியவை / கூடாதவை).

---------------------------------------------------------------------
## 2. INSTALL LIKE A MOBILE APP / மொபைல் ஆப் போல நிறுவ

Android Chrome can NOT install an app from a file opened from the file manager (content://).
It must be opened from an **https** link, or built as an APK. Choose ONE option:

### Option A – Install from a free https link (PWA)  ✅ easiest (5 minutes)
1. On a computer or phone go to **https://app.netlify.com/drop** (free account) .
2. Drag the folder **www** (this bundle) into the page. Netlify gives a link like `https://something.netlify.app`.
3. Open that link in **Chrome on the phone** → ⋮ menu → **Install app** (or "Add to Home screen").
4. The first time needs internet; after that it opens offline like an app.

### Option B – Real APK file (Android) with GitHub (no software needed on your PC)  ✅ recommended
1. Create a free account at **github.com** → **New repository** (private is fine).
2. Upload **ALL files of this bundle** (drag & drop in the browser: `www`, `.github`, `package.json`, `capacitor.config.json`, `localize.js`, `.gitignore`).
   (If `.github` does not upload, use *Add file → Create new file* and type the path `.github/workflows/build-apk.yml`, paste the file content.)
3. Open the **Actions** tab → **Build Android APK** → **Run workflow**. Wait 5–8 minutes.
4. Open the finished run → **Artifacts → Srinidhi-Enterprises-APK** → download, unzip → `app-debug.apk`.
5. Copy the APK to the phone → open it → allow "Install unknown apps" → Install.
   The workflow downloads all libraries into the app, so it works **fully offline**.
   (This is a *debug-signed* APK for direct installs. For Google Play you must sign a release build.)

### Option C – PWABuilder (alternative)
Host the `www` folder as in Option A, then go to **pwabuilder.com**, enter your link, choose **Android** and download the package.

---------------------------------------------------------------------
## 3. ADMIN, ACTIVATION & TERMINATION / நிர்வாகி, செயல்படுத்தல், நிறுத்தல்

* `www/index.html` in this bundle is the **LICENSED copy**: on a new phone it shows **Activation Required** with a **Device ID**.
* **Admin login (username Srinidhi + your password)** opens the app on any phone without an activation code, and opens the **Admin Console**.
* To give the app to someone: they send you their **Device ID + mobile number** → in Admin Console choose validity (days / month / year / **Lifetime**) → **Generate** → send the code. The code works only on that phone and only with that mobile number, so a copied app on another phone stays locked.
* **Terminate any time:** Admin Console → licence register → **Deactivate**, then download **revoke.json** and upload it next to the hosted app (Option A: re-drop the folder; Option B: set the GitHub variable **REVOKE_URL** to the public link of revoke.json). At the next online open the phone shows "Service discontinued". Short validity (e.g. 30 days) also ends service automatically.
* **Move to another phone:** on the old phone Admin Console → **Deactivate this phone**; then issue a new code for the new phone (**Re-issue**).
* Note: browsers cannot read a SIM number, so the mobile number is a registered identity checked at activation together with the Device ID.

---------------------------------------------------------------------
## 4. IMPORTANT NOTES / முக்கிய குறிப்புகள்
* Data stays on each phone. Export Excel regularly. Clearing browser/app data deletes the data.
* Deleting data, clearing stock and restoring ask for double confirmation and (if enabled) admin approval.
* The first load of Option A needs internet; Option B works offline.
