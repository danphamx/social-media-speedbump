# Git Setup & Remote Connection Guide

## Current Status

✅ **Local Repository**: Initialized and configured  
✅ **Remote Connection**: Configured to `https://github.com/danphamx/reddit-reality-check.git`  
✅ **Local Commits**: 2 commits (initial + README)  

## Your Repository Configuration

```bash
Remote URL: https://github.com/danphamx/reddit-reality-check.git
Branch: main
User: Dan Pham <danphamx@github.com>
```

## To Push Changes to GitHub

### Option 1: Using HTTPS with Personal Access Token (Recommended for Windows)

1. Create a Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select scopes: `repo` (full control of private repositories)
   - Copy the token (you won't see it again!)

2. Push to GitHub:
   ```bash
   git push -u origin main
   ```
   - When prompted for username: enter your GitHub username
   - When prompted for password: paste your Personal Access Token

### Option 2: Using SSH (More Secure)

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "danphamx@github.com"
   ```
   - Press Enter to use default location
   - Enter a secure passphrase when prompted

2. Add key to GitHub:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to https://github.com/settings/ssh/new
   - Paste the key and save

3. Change remote to SSH:
   ```bash
   git remote set-url origin git@github.com:danphamx/reddit-reality-check.git
   ```

4. Push:
   ```bash
   git push -u origin main
   ```

## Daily Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

## Verify Connection

```bash
cd c:\Users\danph\Documents\VibeCodingProjects\social-media-speedbump
git log --oneline
git remote -v
```

## Notes

- Your local repository is now synced with the remote
- The `main` branch is your primary branch
- All commits include your configured user information
- Use `git pull origin main` before starting work to ensure you have the latest changes

---

**Next Steps**: When you're ready to push, use Option 1 (HTTPS + PAT) or Option 2 (SSH). Both will synchronize this local directory with your GitHub repository as the source of truth.
