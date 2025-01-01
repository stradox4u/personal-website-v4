export interface StackEntry {
  name: string;
  icon: string;
}

export interface Project {
  name: string;
  slug: string;
  thesis: string;
  description: string;
  image: string;
  stack: StackEntry[];
  url: string;
}


export const projects: Project[] = [
  {
    name: "Paystack-API",
    slug: "paystack-api",
    thesis: "An open source Typescript SDK for the Paystack API, to allow developers interact with the API in a type-safe manner, and enjoy IDE autocompletions.",
    description: `Built using Deno, with the SDK written in Typescript. The SDK is published to JSR at https://jsr.io/@stradox/paystack,
    and is also published to NPM (for CommonJS) at https://www.npmjs.com/package/@stradox/paystack.`,
    image: "/paystack.png",
    stack: [
      { name: "Deno", icon: "logos:deno" },
      { name: "Typescript", icon: "logos:typescript-icon-round" },
      { name: "NPM", icon: "logos:npm" },
      { name: "JSR", icon: "simple-icons:jsr" },
    ],
    url: "https://www.npmjs.com/package/@stradox/paystack",
  },
  {
    name: "Marvel Discover",
    slug: "marvel-discover",
    thesis: "An app to allow visitors to discover random new Marvel Comics characters, as well as discover and purchase the latest comics.",
    description: `Built leveraging the Marvel Comics API. It's built using Vue JS and Tailwind CSS, and is deployed to Netlify.`,
    image: "/marvelDiscover.jpeg",
    stack: [
      { name: "Vue JS", icon: "logos:vue" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Netlify", icon: "logos:netlify-icon" },
    ],
    url: "https://stradox-marvel-finder.netlify.app",
  },
  {
    name: "Archifolios",
    slug: "archifolios",
    thesis: "A portfolio app for Nigerian architects, to allow them to showcase their works to intending clients, be more easily hired, and also democratize the selection process for the clients.",
    description: `Built using Laravel and Inertia JS, with the pages built as Vue JS SFCs styled with Tailwind CSS.
    Data is persisted to a MySQL database, and the app is deployed to a Digital Ocean Droplet, with deployment
    managed by Laravel Forge.`,
    image: "/archifolios-image.png",
    stack: [
      { name: "Vue JS", icon: "logos:vue" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Laravel", icon: "logos:laravel" },
      { name: "Inertia JS", icon: "tabler:brand-inertia" },
      { name: "MySQL", icon: "logos:mysql-icon" },
      { name: "Digital Ocean", icon: "devicon:digitalocean" },
    ],
    url: "https://archifolios.ng"
  },
  {
    name: "Election Collation",
    slug: "election-collation",
    thesis: "A demo of realtime collation of election results, built in response to the opaque 2023 general elections in Nigeria.",
    description: `Built using a Vue JS client side styled using Tailwind CSS and deployed to Netlify, with a 
    Nest JS server using Typescript.Data is persisted to a PostgreSQL database, with Prisma ORM. Realtime 
    communications are handled using Socket IO, and the app is deployed to Render.`,
    image: "/collation-image.png",
    stack: [
      { name: "Vue JS", icon: "logos:vue" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Nest JS", icon: "logos:nestjs" },
      { name: "Typescript", icon: "logos:typescript-icon" },
      { name: "Prisma", icon: "simple-icons:prisma" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "Socket IO", icon: "logos:socket-io" },
      { name: "Render", icon: "simple-icons:render" },
    ],
    url: "https://stradox-collation.netlify.app",
  },
  {
    name: "Monel Shop",
    slug: "monel-shop",
    thesis: "A small shop management application to allow a shop owner manage inventory and sales/purchases.",
    description: `Built using a React SPA client application styled with Tailwind CSS and deployed to Netlify,
    in addition to a Node JS server using Express JS deployed to Railway, all written in Typescript. Data is
    persisted to a cloud MongoDB database with querying handled by Mongoose.`,
    image: "/monel-image.png",
    stack: [
      { name: "React", icon: "logos:react" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Node JS", icon: "logos:nodejs-icon" },
      { name: "Express JS", icon: "skill-icons:expressjs-light" },
      { name: "Typescript", icon: "logos:typescript-icon" },
      { name: "Mongoose", icon: "simple-icons:mongoose" },
      { name: "Railway", icon: "simple-icons:railway" },
      { name: "Netlify", icon: "logos:netlify-icon" },
    ],
    url: "https://monelshop.com.ng",
  },
]