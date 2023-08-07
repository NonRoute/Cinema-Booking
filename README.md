<h1 align="center">Cinema-Booking</h1>

Cinema Booking Web App with MERN stack (MongoDB, Express, React, NodeJS) & Tailwind CSS

Demo: https://cinema-booking-client.vercel.app/

## Table of Contents
* [Technologies](#technologies)
* [Screenshot](#screenshot)
* [How to run the app](#how-to-run-the-app)

## Technologies
* React v18.2.0
* React Router Dom v6.14.2
* React Hook Form v7.45.4
* Tailwind CSS v3.3.3
* Vite v4.4.8
* NodeJS
* Mongoose v7.4.2
* Express v4.18.2
* MongoDB
* And more...

## Screenshot & Guide
<details>
  <summary>Role</summary>

There are 3 roles on this website with corresponding permissions:

| Role  | Permisson |
|-------------|-------------|
| Viewer (Not logged)  | 1. View released showtimes by selecting a movie (Home page) <br> 2. View released showtimes by selecting a cinema (Cinema page) <br> 3. View released showtimes by selecting a date in the future <br> 4. View released showtimes by cinema's schedule (Schedule page) <br> 5. View seats in released showtimes (Showtime page)|
| User  | 1. All Viewer's permissions <br> 2. Purchase tickets (Showtime page). <br> 3. View purchased tickets (Ticket page)|
| Admin  | 1. All User's permissions <br> 2. View any showtime by selecting a date <br> 3. Add / edit / delete cinema <br> 4. Add / delete theater <br> 5. View theater details (amount of row, column, seats) <br> 6. Add / release / unreleased / delete showtime <br> 7. View booked seats details in each showtime (Showtime page) <br> 8. View / Add / delete movies (Movie page) <br> 9. Search showtimes and view / release / unreleased / delete (Search page) <br> 10. View username, email, role, tickets / change role / delete user and admin (User page)|

</details>

### For Viewer
Viewer have access to 3 pages for viewing released showtimes.

<details>
    <summary>Home page</summary>

1. Select a movie

<img src="./images/home_viewer1.png" width="600">

2. Select a date to view showtimes

<img src="./images/home_viewer2.png" width="600">

3. Optionally, select a cinema to filter

<img src="./images/home_viewer3.png" width="600">

4. Click on a showtime to view seats

<img src="./images/home_viewer4.png" width="600">

</details>

<details>
    <summary>Cinema page</summary>

1. Select a cinema

<img src="./images/cinema_viewer1.png" width="600">

2. Select a date to view its theaters and showtimes

<img src="./images/cinema_viewer2.png" width="600">

3. Click on a showtime to view seats

</details>

<details>
    <summary>Schedule page</summary>

1. Select a cinema

<img src="./images/schedule_viewer1.png" width="600">

2. Select a date to view its schedule for each theater

<img src="./images/schedule_viewer2.png" width="600">

3. Click on a showtime to view seats

<img src="./images/schedule_viewer3.png" width="600">

</details>

<details>
    <summary>Showtime page</summary>

1. View available seats (white boxes) and unavailable seats (gray boxes)

<img src="./images/showtime_viewer1.png" width="600">

2. You will be redirected to the login page if you click "Purchase"

</details>

### For User
User have all viewer permission. Furthermore, user can purchase and view their own tickets.

<details>
    <summary>Showtime page / Purchase tickets</summary>

1. Select available seats 

<img src="./images/showtime_user1.png" width="600">

2. Click the purchase button and confirm to purchase tickets

<img src="./images/showtime_user2.png" width="600">

</details>

<details>
    <summary>Ticket page</summary>

1. View purchased tickets

<img src="./images/ticket_user1.png" width="600">

</details>

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
