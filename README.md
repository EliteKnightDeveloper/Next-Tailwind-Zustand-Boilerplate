<h1 align="center" style="display: flex; justify-content: center; align-items: center;">
  <br>
  <a href="https://azara.ai"><img src="https://avatars.githubusercontent.com/u/128544841?s=200&v=4" alt="Azara Logo" width="50" style="margin-right: 10px;"></a>AzaraAI
</h1>

### Technologies Used

- [Next.js](https://nextjs.org) -- React framework that enables several extra features, including server-side rendering and generating static websites
- [Tailwind CSS](https://tailwindcss.com) -- CSS framework that provides single-purpose utility classes
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -- Small, fast and scalable status management solution
- [Typescript](https://www.typescriptlang.org/) -- Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
- [ESLint](https://eslint.org) - The pluggable linting utility.

## Requirements

To begin using this frontend repo, ensure you have the Node.js installed.

- [Node 18](https://nodejs.org/en/download)

## Setup

After cloning the repository, please follow the below commands to install packages and initialize certain features.

```bash
# install modules
npm install
```

After module is installed, run the below command to run the webapp in dev mode.

```bash
# run dev mode
npm run dev
```

Please make sure that you have environment variables within your repository.
These values should exist within `.env` file.

```
NEXT_PUBLIC_FIREBASE_API_KEY=VALUE
NEXT_PUBLIC_FIREBASE_REGION=VALUE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=VALUE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=VALUE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=VALUE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=VALUE
NEXT_PUBLIC_FIREBASE_APP_ID=VALUE
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=VALUE
NEXT_PUBLIC_API_URL=VALUE
```

You have to change `NEXT_PUBLIC_API_URL` for webapp to target to correct backend url. For example, http://localhost:8000 or https://backend.azara.ai

For the specific secret values, please contact **_@Prem_**

The webapp will be served on http://localhost:3000
