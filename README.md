# For Nimu 💛 — Interactive Love Story Website

A custom-built, production-quality, highly interactive love story website created for **Raj (Nimu)** for Boyfriend's Day, culminating in the question: **“Will you be my boyfriend? 💛”**.

---

## 🚀 Quick Start

The local development server is running at:
**[http://127.0.0.1:5173/](http://127.0.0.1:5173/)**

To start the dev server anytime:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

---

## 🎨 Centralized Content Editing

All personal stories, names, memories, and captions are centralized in:
📁 **[`src/data/storyData.ts`](file:///C:/Users/siddhi/.gemini/antigravity-ide/scratch/for-nimu/src/data/storyData.ts)**

You do not need to search through components to change text. Simply open `storyData.ts` to adjust:
- Names (`Raj`, `Nimu`, `Me`)
- Memories (dates, titles, texts, hidden messages)
- Captions for Nimu's photos and Us photos
- The Love Letter paragraphs
- Proposal copy and buttons

---

## 📸 Replacing with Your Real Photos & Song

Drop your files into the matching paths inside `public/`:

```text
public/
├── images/
│   ├── main-us.jpg                     # Primary cinematic background
│   ├── song-cover.jpg                  # Music player cover artwork
│   │
│   ├── memories/
│   │   ├── first-meeting.jpg           # 13 Feb - The day we met
│   │   ├── first-hug.jpg               # 1 Mar - First hug, cuddle & kiss
│   │   ├── alibagh.jpg                 # 13 Mar - Alibagh trip
│   │   ├── hanuman-tikdi.jpg           # 25 May - Hanuman Tikdi
│   │   ├── birthday.jpg                # 30 May - My Birthday
│   │   ├── symbiii.jpg                 # Symbiii Tekadi
│   │   ├── first-gift.jpg              # 23 August - First gift
│   │   └── at-your-place.jpg           # 17–18 September - At your place
│   │
│   ├── nimu/
│   │   ├── 01.jpg .. 06.jpg            # Solo photos of him
│   │
│   └── us/
│       ├── 01.jpg .. 08.jpg            # Cute candid pictures of both of you
│
└── audio/
    └── our-song.mp3                    # Your special song
```

> **Note:** The website features an `ImageWithFallback` component so if any image is loading or missing, it displays an aesthetic golden card without breaking the layout.

---

## 💻 Developer Easter Eggs Included

1. **Browser Console**:
   Open DevTools (`F12` or `Ctrl+Shift+I`):
   - Formatted greeting: `💛 Hey Nimu... Yes. I knew you'd open the console.`
   - Variable `const question = "Will you be my boyfriend?";`
   - Global variables: `window.question` and `window.nimu`

2. **Secret Keyboard Sequence**:
   - Type `sudo` or `nimu` anywhere, or press `~` / `` ` ``:
   - Pops up an interactive bash terminal with access grant and message.

3. **Secret Heart**:
   - Click the little yellow heart in the navigation bar 7 times to reveal the debugger toast:
     *“Okay Nimu... you really clicked that THAT many times? 😂”*

4. **Memory 03 (Alibagh)**:
   - Click **“YOU HAD TO BE THERE 😂”** to reveal the secret beach memory.

5. **Memory 08 (At Your Place)**:
   - Click the subtle bathtub icon 🛁 to reveal the easter egg.

6. **Us Photo Wall**:
   - Click **“COMPILE US 💛”** to trigger the build relationship progress bar and watch the photos animate into a heart-shaped composition.
