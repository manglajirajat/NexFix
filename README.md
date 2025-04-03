# NexFix - Hardware, Paint & Sanitary E-Commerce Store

NexFix is a one-stop solution for all your hardware, tools, sanitaryware, and paint needs. Built on the MERN (MongoDB, Express, React, Node.js) stack, NexFix provides an easy and efficient shopping experience with seamless order tracking and management.

## Live Demo
[NexFix](https://nexfix.vercel.app)

## Features
- **User Authentication** - Sign up, log in, and manage your account securely.
- **Product Listings** - Browse hardware, paints, and sanitaryware with search and filtering options.
- **Cart & Checkout** - Add items to your cart and complete purchases securely.
- **Payment Gateway Integration** - Secure transactions via Cashfree.
- **Order Tracking** - Customers can track their orders in real time.
- **Admin Panel** - Admins can manage products, orders, and users.

## Tech Stack
- **Frontend**: React, Redux, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Storage**: Cloudinary
- **Payment Integration**: Cashfree

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository
```sh
git clone https://github.com/your-username/nexfix.git
cd nexfix
```

### Backend Setup
```sh
cd backend
npm install
```

#### Create a `.env` file in the `backend` directory
```env
PORT=3000
DB_URI=your_mongodb_uri
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_DURATION=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_DURATION=10d
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
EMAIL=your_email
PASSWORD=your_email_password
```

#### Run the Backend Server
```sh
npm start
```

### Frontend Setup
```sh
cd ../frontend
npm install
```

#### Run the Frontend
```sh
npm start
```

## Deployment
NexFix can be deployed using platforms like **Vercel** for the frontend and **Render/Heroku** for the backend.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License
This project is licensed under the MIT License.

---
Developed with ❤️ by the Rajat Mangla.
