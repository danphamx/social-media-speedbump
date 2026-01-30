# Social Media Speedbump Blocker 
## V4 is out! Now lets you Customzize your Picture, "Helpful reminder," and add your own domain URLs

A Chrome extension that adds a "speedbump" to social media sites to help reduce mindless scrolling and increase intentional browsing.

<img width="2156" height="1285" alt="image" src="https://github.com/user-attachments/assets/5c6eade2-327e-48ec-9250-1793c92fdc93" />

## Overview

The Social Media Speedbump Blocker interrupts your access to distracting social media sites by displaying a custom message, image, and required button click before allowing access. This creates a moment of reflection and friction to combat mindless scrolling.

## Features

### V2 Features
- ✅ Custom speedbump image upload
- ✅ Custom message/text
- ✅ Custom button label
- ✅ Add/remove domains from blocklist
- ✅ Persistent settings via Chrome Storage Sync

### V3 Features
- ✨ Custom favicon support - set your own tab icon
- ✨ Default favicon now uses `skully.png` for visual impact
- ✨ Reset extension to default settings
- ✨ Organized assets in `/img/` folder for cleaner project structure

### V4 Features (Latest)
- 🎯 Sidebar UI - Settings now open as a persistent sidebar instead of a popup
- ⚡ Better UX for accessing and modifying settings without losing context
- 🎨 Optimized layout for sidebar panel display

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/danphamx/reddit-reality-check.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top-right corner)

4. Click "Load unpacked" and select this directory

## Usage

1. Click the extension icon to open the settings sidebar (appears on the right side of your browser)
2. Configure your blocked domains (comma-separated)
3. Customize your speedbump:
   - **Custom Message**: The text displayed on the speedbump
   - **Button Label**: Text for the "proceed" button
   - **Speedbump Image**: Upload an image to display
   - **Favicon**: Upload a custom icon for the browser tab
4. Click **Save Settings** to apply your changes

### Default Configuration

By default, the extension blocks:
- reddit.com
- facebook.com
- instagram.com

And displays: "Stop giving a f*ck and get back to work."

## How It Works

When you visit a blocked domain:
1. The extension replaces the page with a full-screen speedbump UI
2. Your custom image is displayed with your custom message
3. A button forces you to click before proceeding
4. After clicking, you can access the site normally (passing `?passed=true` query param)

The favicon on the tab changes to your custom icon (or the default `skully.png`), providing a visual reminder of the extension's presence.

## Files Structure

```
├── manifest.json          # Chrome extension configuration (Manifest V3)
├── background.js          # Background service worker
├── content.js             # Content script that blocks sites
├── options.html           # Settings sidebar UI
├── options.js             # Settings sidebar logic
├── img/
│   ├── skully.png         # Default favicon
│   ├── dontcare.jpg       # Default speedbump image
│   ├── fav.ico            # Alternative favicon
│   └── icon.icns          # macOS icon
└── README.md              # This file
```

## Customization

All settings are customizable through the extension sidebar (click the extension icon):
- Domain blocklist
- Speedbump message
- Button text
- Speedbump image
- Favicon

Settings are synced across all your Chrome devices via Chrome Storage Sync.

## Version History

- **V4**: Converted popup to sidebar UI for better UX
- **V3**: Added favicon customization and reset functionality
- **V2**: Added custom uploads for image, text, button label, and domains
- **V1**: Basic speedbump blocker for preset domains

## Technical Details

- **Manifest Version**: 3
- **Storage**: Chrome Storage Sync API
- **Permissions**: `storage`
- **Content Scripts**: Applied to all URLs

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

MIT License - feel free to use and modify as needed.

---

**Remember**: This extension is designed to create friction between you and distracting content. Use it as a tool for digital wellness! 🛑
