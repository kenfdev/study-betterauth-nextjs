## Prerequisites

You need to setup the providers before using it: `google`, `github`, `cognito`

## Getting Started

Set the `.env` by copying `.env.example`

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) to login.

Edit `./app/const.ts` to change the provider to either `google`, `github`, `cognito`
