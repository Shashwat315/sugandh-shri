# Sugandh Shri — Luxury Fragrance Website

## To Run This Website

### Step 1 — Open this folder in VS Code
File → Open Folder → select the `sugandh-shri` folder (this one)

### Step 2 — Install packages (first time only)
Open terminal with Ctrl+` and run:
```
npm install
```

### Step 3 — Start the website
```
npm run dev
```

Website opens at: http://localhost:5173

### Step 4 — To enable Login/Signup/Payments
Open a SECOND terminal, navigate to the backend folder:
```
cd ../sugandh-shri-backend
npm install
copy .env.example .env
```
Edit `.env` and fill in your MySQL password and Razorpay keys, then:
```
npm run dev
```

## All Pages
| URL | Page |
|-----|------|
| / | Homepage |
| /shop | All Products |
| /attars | Attars Collection |
| /perfumes | Perfumes |
| /essential-oils | Essential Oils |
| /cart | Shopping Cart |
| /checkout | Checkout + Razorpay |
| /login | Sign In |
| /signup | Create Account |
| /account | My Account |
| /return-policy | Return & Refund Policy |
| /gift-sets | Gift Sets |
| /about | About Us |
| /contact | Contact + FAQ |
| /track-order | Order Tracking |
| /scent-quiz | Fragrance Quiz |
