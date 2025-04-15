# Another Eden Character Stats Comparison

A Next.js application to compare and visualize Another Eden characters' stats.

## Features

- Compare up to 4 characters simultaneously
- Interactive radar chart visualization of character stats (PWR, INT, SPD, END, SPR, LCK)
- Separate HP and MP comparison with visual bars
- Compare stats at different Light/Shadow points (from base to 255)
- Responsive design for both desktop and mobile

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
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

## Scraper Script

There is a script to scrape character data from the official Another Eden wiki. The script is located in the `scripts/index.mjs`. To run the scraper, navigate to the `scripts` directory and execute:

```bash
npm run scrape
```

This will replace the `characters.json` file in data directory with the latest data from the wiki. Make sure to have Node.js installed and the necessary permissions to write to the file.

## Technologies Used

- Next.js
- TypeScript
- Recharts for data visualization
- Tailwind CSS for styling
- shadcn/ui for UI components