# 🎯 YouTube Auto Mute + Ad Speed Controller

A lightweight Tampermonkey script that **mutes YouTube ads** and plays them at a
custom (configurable) speed. It attempts to restore your original playback speed
once the ad is over.

> ⚠️ **Note:** This script does **not block ads** — it simply speeds them up and
> mutes them. It is designed to reduce annoyance while minimizing detection risk
> by YouTube.

---

## ✨ Features

-   🔇 Mutes video automatically during ads
-   ⏩ Speeds up ads (default: `10x`) to waste less time
-   🧠 Remembers your original playback speed and restores it
-   🎲 Adds random delay before speeding up ads to mimic human behavior
-   🧪 Randomly lets a percentage of ads play normally to avoid triggering
    YouTube’s ad blocker warnings
-   ⚙️ Configurable options in code for full control

---

## 🚀 Installation

1. **Install Tampermonkey**

    - [Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome)
    - [Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)
    - [Edge](https://tampermonkey.net/?ext=dhdg&browser=edge)

2. **Create a new userscript**

    - Click the Tampermonkey icon → _Create a new script_
    - Delete the default code

3. **Paste the script code**

    - Copy everything from
      [`youtube-ads-speedup-mute.js`](./youtube-ads-speedup-mute.js)
    - Paste it into Tampermonkey
    - Save (`Ctrl+S` or `Cmd+S`)

4. **Reload YouTube**

    - The script should now automatically run on YouTube pages

---

## 🛠 Configuration

You can customize two key variables at the top of the script:

```js
const AD_SPEED_MULTIPLIER = 10; // Set how fast ads should play (e.g., 2, 5, 10)
const AD_SKIP_PERCENTAGE = 80; // % of ads to skip (rest will play normally)
```

---

## 🤖 How It Works

-   Detects when an ad is playing using YouTube’s DOM
-   Applies a random delay (200–500ms) before speeding up the ad
-   Mutes the ad audio during this time
-   After the ad ends, your preferred playback speed is restored
-   Occasionally allows ads to play at normal speed to stay under YouTube’s
    radar

---

## ⚠️ Limitations

This script is a **work in progress** and **not foolproof**. YouTube regularly
updates its detection mechanisms, and:

-   It may still trigger the “Ad blocker detected” popup if patterns are too
    obvious
-   It does not block or remove ads — ads still play, just faster and muted
-   It's recommended to keep the speed multiplier reasonable (e.g., `2x–5x`) to
    avoid flagging

---

## 💬 Feedback & Contributions

Pull requests, bug reports, and stealth-improvement ideas are welcome!\
Let’s make YouTube a little less annoying — together.
