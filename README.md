# Embroidery Store (Backend)

The REST API for the Embroidery Store, an e-commerce website for a handmade embroidery business in Lahore, Pakistan. It handles products, orders, customer reviews and admin authentication.

**Frontend repo:** [embroidery-store](https://github.com/majidawan01/embroidery-store)
**Live demo (frontend):** https://embroidery-store-tau.vercel.app

## Key Features

- **Products:** list and view products; admins can create, update and delete them
- **Categories:** Zari Work, Thread Embroidery, Mirror Work, Cutwork and Lace
- **Orders:** customers place orders without an account and track them by order ID
- **Payment methods:** Cash on Delivery, JazzCash or Easypaisa recorded on each order
- **Order status:** pending, confirmed, shipped, delivered or cancelled, updated by the admin
- **Reviews:** customers submit reviews with a rating; the admin approves or deletes them
- **Admin auth:** login with JWT (valid for 7 days), passwords hashed with bcrypt
- **Seed scripts:** load sample products and create or reset the admin account

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- Hosting: Railway (API), MongoDB Atlas (database)

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Admin |
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| POST | `/api/orders` | Public |
| GET | `/api/orders/:orderId` | Public |
| GET | `/api/orders` | Admin |
| PUT | `/api/orders/:orderId/status` | Admin |
| POST | `/api/reviews` | Public |
| GET | `/api/reviews/product/:productId` | Public |
| GET | `/api/reviews` | Admin |
| PUT | `/api/reviews/:id/approve` | Admin |
| DELETE | `/api/reviews/:id` | Admin |

Admin routes need an `Authorization: Bearer <token>` header with the token returned by `/api/auth/login`.

## Screenshots

This repo is an API only. See [embroidery-store](https://github.com/majidawan01/embroidery-store) for app screenshots.

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB database (local or MongoDB Atlas)

### Run

```bash
git clone https://github.com/majidawan01/embroidery-backend.git
cd embroidery-backend
npm install
# create a .env file with the variables listed below
npm run dev      # http://localhost:5000
```

For production use `npm start`.

### Seed data

```bash
node seed.js        # loads 12 sample products
node seedAdmin.js   # creates the admin account from ADMIN_EMAIL and ADMIN_PASSWORD
```

- `seed.js` **deletes all existing products** before adding the sample products. Do not run it against a live database.
- `seedAdmin.js` creates the admin if it does not exist. If an admin with that email already exists, it updates the password instead. Run it again any time you want to change the admin password.

## Environment Variables

| Name | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `PORT` | API port (optional, defaults to 5000) |
| `ADMIN_EMAIL` | Admin login email, used by `seedAdmin.js` |
| `ADMIN_PASSWORD` | Admin password (at least 6 characters), used by `seedAdmin.js` |

## Author

**Majid Awan** · [Portfolio](https://majid-awan-updated-portfolio-stzz.vercel.app) · [LinkedIn](https://www.linkedin.com/in/majid-awan-8210943a3) · [GitHub](https://github.com/majidawan01)
