<h1 align="center">Cinema-Booking</h1>

Cinema Booking Web App with MERN stack (MongoDB, Express, React, NodeJS) & Tailwind CSS

Demo: https://cinema-booking-client.vercel.app/

## Table of Contents
* [Technologies](#technologies)
* [Screenshot](#screenshot)
* [Guide](#guide)
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

## Screenshots & Main Features
<h2 align="center">Home page 🎥</h2>
<p align="center">
    <img src="./images/screenshot1.png" width="600">
</p>

<h2 align="center">Responsive design 📱</h2>
<p align="center">
    <img src="./images/screenshot2.png" width="180">
</p>

<h2 align="center">Cinema page 🏢</h2>
<p align="center">
    <img src="./images/screenshot3.png" width="600">
</p>

<h2 align="center">View Schedule 🕙</h2>
<p align="center">
<img src="./images/screenshot4.png" width="600">
</p>

<h2 align="center">Book seats 💺</h2>
<p align="center">
<img src="./images/screenshot5.png" width="600">
</p>

<h2 align="center">View Tickets 🎫</h2>
<p align="center">
<img src="./images/screenshot6.png" width="600">
</p>

<h2 align="center">Search showtimes 🔎</h2>
<p align="center">
<img src="./images/search2.png" width="600">
</p>

<h2 align="center">Manage user 🕵️</h2>
<p align="center">
<img src="./images/user1.png" width="600">
</p>

## Guide

### Role / Feature

There are 3 roles on this website with corresponding permissions:

| Role  | Permisson / Feature |
|-------------|-------------|
|[Viewer (Not logged in)](#viewer)  | **1. View released showtimes by choosing from** <br> &emsp;- Movie in home page <br>  &emsp;- Cinema's theater in cinema page <br> &emsp;- Cinema's schedule in schedule page <br> **2. View released showtimes for today and the future** <br> **3. View seats for released showtimes on the Showtime page**|
| [User](#user)   | **1. All Viewer permissions** <br> **2. Purchase tickets on the showtime page** <br> **3. View purchased tickets on the ticket page**|
| [Admin](#admin)   | **1. All User permissions** <br> **2. View all showtimes for any date** <br> **3. Manage cinemas** <br> **4. Manage theaters** <br> &emsp;- View theater's row, column, seats information <br> **5. Manage showtimes** <br> &emsp;- Search & filter showtimes <br> &emsp;- View details of booked seats <br> **6. Manage movies** <br> **7. Manage user & admin**|

### Viewer
Viewer have access to these pages for viewing released showtimes.

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

2. Viewer will be redirected to the login page if they click "Purchase"

</details>

### User
User have all viewer permission. Including, the ability to purchase and view their own tickets

<details>
    <summary>Register / Login</summary>

1. To create an user account, fill in a username, email, and password, then click "Register"

<img src="./images/register1.png" width="600">

2. To log in, fill in username and password, then click "Login"

<img src="./images/login1.png" width="600">

</details>

<details>
    <summary>Showtime page / Purchase tickets</summary>

1. Select available seats 

<img src="./images/showtime_user1.png" width="600">

2. Click the "Purchase" button and confirm to purchase tickets

<img src="./images/showtime_user2.png" width="600">

</details>

<details>
    <summary>Ticket page</summary>

1. View purchased tickets

<img src="./images/ticket_user1.png" width="600">

</details>

### Admin
Admin have all permission.

<details>
    <summary>Home page</summary>

1. Admin have the additional ability to view theater's row, column, seats information.

<img src="./images/home_admin1.png" width="600">

2. Select a date by either typing it into the input or selecting from the calendar.

<img src="./images/home_admin2.png" width="600">

</details>

<details>
    <summary>Cinema page</summary>

<img src="./images/cinema_admin1.png" width="600">

1. To add a new cinema, type the cinema's name.

<img src="./images/add_cinema1.png" width="600">

2. Click the "Add" button

<img src="./images/add_cinema2.png" width="600">

3. To edit a cinema's name, click the "Edit" button

<img src="./images/edit_cinema1.png" width="600">

4. Enter the new cinema name and click "Save"

<img src="./images/edit_cinema2.png" width="600">

5. To delete a cinema, click the "Delete" button and confirm by clicking "OK"

<img src="./images/delete_cinema1.png" width="600">

6. To add a theater to the cinema, fill the letter of the last row and the number of the last column seat, then click "Add"

<img src="./images/add_theater1.png" width="600">

7. To delete the last added theater, use the "Delete" button at the bottom of the page

<img src="./images/add_theater2.png" width="600">

8. To add showtime, 
    * Select a movie
    * Fill in the following values:
        * **Showtime:** Movie start time
        * **Repeat:** For example, 1 means the showtime is added for today only, while 4  mean the showtime is added for today and the next 3 days.
        * **Release now:** Check to release this showtime for viewers and users to view or book
        
        **Auto increase**
        * **Showtime:** Check to automatically update the showtime value based on the ending time of this showtime, along with a specified gap. This is useful when adding consecutive movies, ensuring appropriate spacing between showtimes.
        * **Date:** Check to enable automatic increase of showtime to the next day if it exceeds 24 hours
        * **Gap:** The minimum duration between movie showtimes

        **Rounding**
        * **5-min:** Round up the auto-increased showtime value to the nearest 5 minutes, e.g., 12:21 -> 12:25
        * **10-min:** Round up the auto-increased showtime value to the nearest 10 minutes, e.g., 12:21 -> 12:30

    * Click the "Add" button

<img src="./images/add_showtime1.png" width="600">

9. The new showtime will added to the theater. An eye-slash icon indicates that this showtime is not yet released

<img src="./images/add_showtime2.png" width="600">

</details>

<details>
    <summary>Schedule page</summary>

<img src="./images/schedule_admin1.png" width="600">

</details>


<details>
    <summary>Showtime page</summary>

1. View details of booked seats

<img src="./images/showtime_admin1.png" width="600">

</details>

<details>
    <summary>Movie page</summary>

<img src="./images/movie1.png" width="600">

1. To add a movie, fill in the movie name, URL of the poster, and the length in hours (optional) and minutes. Then, click "Add" to add the movie.

<img src="./images/movie2.png" width="600">

</details>

<details>
    <summary>Search page</summary>

<img src="./images/search1.png" width="600">

1. Filter showtime and select to release / unreleased / delete them
2. Click a "View" button to view seats

<img src="./images/search2.png" width="600">

</details>

<details>
    <summary>User page</summary>

1. View usernames, email addresses, roles, and tickets of users.
2. Click the "View Tickets" button to see a user's purchased tickets.
3. Click the "Set Admin" or "Set User" button to change the user's role.
4. Click the "Delete" button to delete the account.

<img src="./images/user1.png" width="600">

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
