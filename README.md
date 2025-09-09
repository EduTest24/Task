# AI Productivity Suite

This is a full-stack AI-powered productivity suite built with [Next.js](https://nextjs.org). It integrates Google Calendar and Google Tasks, providing a unified dashboard for managing your schedule and to-dos, with AI agents to help automate and organize your workflow.

## Features

- **Unified Dashboard:** View and manage your Google Calendar events and Google Tasks in one place.
- **AI Agents:** Smart agents to help you create, update, and organize tasks and events.
- **Google Integration:** Secure OAuth-based integration with Google Calendar and Tasks APIs.
- **Modern UI:** Responsive, accessible, and beautiful interface using Next.js and custom components.
- **User Authentication:** Secure sign-in/sign-up flows.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your clerk publishable key
CLERK_SECRET_KEY=get this from clerk
MONGODB_URI=
OPENAI_API_KEY=
```

Refer to the Google Cloud Console for your OAuth credentials. MongoDB is used for user storage.

## Project Structure

- `src/app/` - Next.js app directory (pages, layouts, routes)
- `src/components/` - Reusable UI and dashboard components
- `src/lib/` - Utility libraries, Google API clients, and AI agents
- `src/models/` - Mongoose models
- `src/pages/api/` - For backend routes
- `public/` - Static assets

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Google Tasks API](https://developers.google.com/tasks)
- [Google Calendar API](https://developers.google.com/calendar)
- [Mongoose Docs](https://mongoosejs.com/docs/)

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

_Made with ❤️ by Hariom Pandey 3rd year student._
