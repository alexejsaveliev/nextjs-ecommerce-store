<br />
<div align="center">
<h3 align="center">Ecommerce Store</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#email-template-development">Email template</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a minimal ecommerce store app built with Next.js and React. It has the following features:

- User authentication
- Admin panel
- Product management
- Order management
- Email notifications
- Payment processing


### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Tailwind][Tailwind.css]][Tailwind-url]
- [![Prisma][Prisma.js]][Prisma-url]
- [![Shadcn][Shadcn]][Shadcn-url]
- [![Stripe][Stripe]][Stripe-url]
- [![Resend][Resend]][Resend-url]

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- pnpm
  ```sh
  pnpm install pnpm@latest -g
  ```

### Installation

1. Get api keys from [Resend](https://resend.io/) and [Stripe](https://stripe.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/alexejsaveliev/nextjs-ecommerce-store.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following

   ```dotenv
    DATABASE_URL="file:./dev.db"
    ADMIN_USERNAME="your_admin_username"
    ADMIN_HASHED_PASSWORD="your_hashed_admin_password"
    STRIPE_SECRET_KEY="stripe_secret"
    STRIPE_WEBHOOK_SECRET_KEY="stripe_webhook_secret"
    RESEND_API_KEY="resend_api_key"
    RESEND_SENDER_EMAIL="resend_sender_email"

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY="stripe_public"
    NEXT_PUBLIC_VERCEL_URL="http://localhost:3000"
   ```

5. Prepare the database
   ```sh
   pnpx prisma migrate dev
   ```
6. Start the development server
   ```sh
   pnpm dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser
8. To access the admin panel, go to [http://localhost:3000/admin](http://localhost:3000/admin)
   

#### Email template development
[react-email](https://react.email/) is used for email template development. To start the development server for email templates run the following command
   ```sh
   pnpm email
   ```


## Contact

Aleksey Savelyev - [LinkedIn](https://www.linkedin.com/in/alexejsaveliev/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind.css]: https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Prisma.js]: https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Shadcn]: https://img.shields.io/badge/shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Stripe]: https://img.shields.io/badge/stripe-675dff?style=for-the-badge&logo=stripe&logoColor=white
[Stripe-url]: https://stripe.com/
[Resend]: https://img.shields.io/badge/resend-FFA500?style=for-the-badge&logo=resend&logoColor=white
[Resend-url]: https://resend.com/
