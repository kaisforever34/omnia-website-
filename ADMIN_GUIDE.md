# Omnia — How to Use Your Private Admin (No Code Needed)

**Your private admin address:** `https://yoursite.netlify.app/admin`
*(Replace `yoursite` with your actual Netlify site name, e.g. `omnia-beautylab.netlify.app/admin`)*

This admin is separate from your customer newsletter — only you can log in.

---

### 1) How to Log In (First Time)

1. On Netlify: go to **Site settings → Identity → Invite users** and invite your fixed admin email (e.g. `you@yourdomain.com`).
2. Check that email → click the invite link → set your password.
3. Now visit `yoursite.netlify.app/admin` → enter your email + password → you are in.
4. No one else can sign up — **Registration is set to Invite only**.

**Forgot password?** On the `/admin` login screen click **Forgot password** → you will receive a reset link at that same fixed email.

---

### 2) How to Edit Each Section (EN and AR are separate)

You will see collections on the left. Each has **English** and **Arabic** versions — edit them independently. The language switcher on the live site (`EN | عربي`) shows the correct version automatically.

**Hero (top of landing page)**
- Open `Hero — English` or `Hero — Arabic`.
- Change: Eyebrow, Headline Line 1 + Line 2, Lead paragraph, Primary CTA text, Secondary CTA text, Hero Image (upload), and the 3 trust-row items directly under the CTA (e.g. `14,000+ women / Ships in 24h`).
- Click **Save** → choose **Set status to In Review** to make a draft, or **Publish → Publish now** to go live.

**Product (centerpiece with 3D viewer)**
- Open `Product — English` / `Product — Arabic`.
- Change: Title, Lead, Viewer hint, Packages (click `Add` to add a tier, drag to reorder, edit price/count/badge), Product Images (upload/replace), Ingredients list (repeatable: name/amount/description), How-To steps (repeatable), Order button text, Guarantee line.
- Images you upload are optimized automatically on publish; you do not need to resize before uploading.

**Testimonials**
- Open `Testimonials — English` / `Testimonials — Arabic`.
- Edit the section title/subtitle/before-after image at the top.
- Below, you see the list of 6 reviews. **Drag the handle** on any review to reorder. Click a review to edit: Name, Location, Quote, Stars (1-5), Weeks to result, Skin concern tag. Click `Add Reviews` to add a new one, `Delete` to remove.

**FAQ**
- Open `FAQ — English` / `FAQ — Arabic`.
- Edit Eyebrow/Title/Lead at top, then the list of Questions. Drag to reorder, click to edit question + answer. Add new with `Add Items`.

**Skin Quiz**
- Open `Skin Quiz — English` / `Skin Quiz — Arabic`.
- Edit Intro (eyebrow/title/lead/button), then the 4 Questions. Each question has: ID, Question Text, and its Options list (value + label + optional icon). Drag options to reorder. Below, edit the Results card: Title, Subtitle, Recommended Package, Price, Routine Steps (add/remove), WhatsApp button text, Disclaimer.

---

### 3) How to Upload an Image

1. In any collection, click the **image field** (e.g. Hero Image, Product Images, Before/After).
2. Click **Choose an image** → **Upload new** → select from your computer.
3. The image is stored in `public/uploads` in your site's repository. You do not need to resize — Netlify will serve a reasonably sized version, and the site's CSS will display it correctly.
4. Save your change.

*Tip:* Use 900×900 transparent PNG for the product hero (like the current `/product/front.png`) for the best 3D viewer look.

---

### 4) How to Preview Before Publishing (and Undo a Mistake)

Because this CMS saves every change as a **commit to your git repository**:

1. After editing, click **Save** → select **Status: In Review** (draft). This saves a draft you can share via the `Review` link without affecting the live site.
2. To see a draft preview: in the CMS top bar, open the **Preview** pane (or click the preview link Netlify shows for the Deploy Preview). Check that the English and Arabic versions look correct.
3. When satisfied, click **Ready** then **Publish → Publish now**. Publishing creates a commit → Netlify automatically rebuilds (`vite build`) and your live site updates within 1–3 minutes. No manual step beyond clicking Publish.

**Undo a mistake:** Every publish is versioned in git.
- In Netlify: **Deploys → pick a previous deploy → Publish deploy** to instantly revert.
- Or in GitHub: **History of `content/.../en.json`** → view diff → **Revert**.

You have **unlimited history** — not just last 5 — and you never need a developer to revert.

---

### Daily Use Summary

- **Log in:** `yoursite.netlify.app/admin` with your one email + password.
- **Edit:** Pick a collection (Hero/Product/Testimonials/FAQ/Quiz) → pick EN or AR → edit fields.
- **Image:** Click image field → Upload new.
- **Preview:** Save as **In Review** → check preview.
- **Publish:** Set to **Ready → Publish now** → live in ~2 minutes.

If you ever need to change the fixed admin email or WhatsApp number (`+971569180737`), tell your developer — they are set in `public/admin/config.yml` and `src/utils/whatsapp.js`.
