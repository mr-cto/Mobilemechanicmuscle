# Mobilemechanicmuscle

This project uses Next.js with the App Router, TypeScript and Tailwind CSS. A form on the homepage collects service requests and sends the data to a configured email address through a serverless API route located at `app/api/send-form/route.ts`.

## Development

1. Install dependencies (requires Node.js >=18):
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to see the form.
   The application uses the `app` directory with a `layout.tsx` and `page.tsx`.

## Environment Variables

Configure the following variables to enable email sending:

- `EMAIL_HOST` – SMTP host
- `EMAIL_PORT` – SMTP port
- `EMAIL_USER` – SMTP username
- `EMAIL_PASS` – SMTP password
- `EMAIL_FROM` – from address
- `EMAIL_TO` – destination address

Create a `.env.local` file with these variables when running locally or set them in your Vercel project.

## Deployment

This project can be deployed to [Vercel](https://vercel.com/). After installing dependencies and configuring environment variables, run:

```bash
npm run build
```

Then deploy with the Vercel CLI or by connecting the repository in the Vercel dashboard.
