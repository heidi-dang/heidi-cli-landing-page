<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio.apps/drive/1leWX3yOzZmYiJBJvIM4wWkzWzI361ldp

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Firebase Deployment (CI/CD)

This project uses GitHub Actions for automatic deployment:

- **Pull Requests**: Deploys to a Firebase preview channel with a unique URL
- **Merges to main**: Deploys to production at https://heidi-cli.web.app

### Setting Up CI

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Hosting for your project
3. Create a service account:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Copy the JSON content
4. Add the following GitHub Secrets to this repository:
   - `FIREBASE_SERVICE_ACCOUNT_HEIDI_CLI`: The JSON service account key (entire content)
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID (e.g., `heidi-cli`)

### Local Firebase Deployment

To deploy manually:

```bash
npm run build
firebase deploy
```

## Environment Variables

Create a `.env.local` file in this directory:

```bash
GEMINI_API_KEY=your-gemini-api-key
```

Note: `.env.local` is gitignored and should never be committed.
