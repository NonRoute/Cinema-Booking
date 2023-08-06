<h1 align="center">Cinema-Booking</h1>

Cinema Booking Web App with MERN stack (MongoDB, Express, React, NodeJS) & Tailwind CSS

Demo: https://cinema-booking-client.vercel.app/

## Table of Contents
1. [Screenshot](#Screenshot)
2. [How to run the app](#How-to-run-the-app)

## Screenshot 📷
### Home page

<img src="./images/home.png" width="350">

### Cinema page

**For Admin**   
<img src="./images/cinema_admin.png" width="350">

**For User**    
<img src="./images/cinema_user.png" width="350">

### Showtime page
<img src="./images/showtime.png" width="350">

### Ticket page
<img src="./images/ticket.png" width="350">

### Movie page
<img src="./images/movie.png" width="350">

### Search page
<img src="./images/search.png" width="350">

### User page
<img src="./images/user.png" width="350">

## How to run the app 🖥️
1. Download the code
2. Create .env file in /server
```
PORT=8080
DATABASE=<your MongoDB connection string URI>
JWT_SECRET=<any random JWT secret>
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```
3. Start server side
```
cd server
npm install
npm start
```
4. Start client side
```
cd client
npm install
npm run dev
```