<h1 align="center">Cinema-Booking</h1>

Cinema Booking Web App with MERN stack (MongoDB, Express, React, NodeJS) & Tailwind CSS

Demo: https://cinema-booking-client.vercel.app/

## Table of Contents
* [Technologies](#technologies)
* [Screenshot](#screenshot)
* [How to run the app](#how-to-run-the-app)

## Technologies
* React 18.2.0
* React Router Dom 6.14.2
* React Hook Form 7.45.4
* Tailwind CSS 3.3.3
* Vite 4.4.8
* NodeJS
* Mongoose 7.4.2
* Express 4.18.2
* MongoDB
* And more...

## Screenshot
### Home page

<img src="./images/home.png" width="600">

### Cinema page

**For Admin**   
<img src="./images/cinema_admin.png" width="600">

**For User**    
<img src="./images/cinema_user.png" width="600">

### Schedule page
<img src="./images/schedule.png" width="600">

### Showtime page
<img src="./images/showtime.png" width="600">

### Ticket page
<img src="./images/ticket.png" width="600">

### Movie page
<img src="./images/movie.png" width="600">

### Search page
<img src="./images/search.png" width="600">

### User page
<img src="./images/user.png" width="600">

## How to run the app
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
