INSTRUCTIONS

Create a sample web app in React/Flutter using the specified API with the following checklist. Format and design is anything you want but make it presentable.

 

Time Limit:  7 days from now


Expectation:

- Creation of API Repository (NodeJS/Laravel)

- Creation of Web Repository (React/ReactNative/Flutter)


You are expected to use two api's as written below: (But can be changed if needed)

LOGIN API URL: http://localhost:8000/api/login

HOME API URL: https://ipinfo.io//geo


App

- On every app open, User should be redirected either in Login Page if not yet logged in and in Home Screen if logged in.


Login Screen

- Implement a simple login form that requires email and password.

 - Should validate that the credentials are correct coming from the Database.

 - Create a User Seeder that will be used to login.

- Redirect to home once entered credentials are correct.


Home Screen

- On Home Screen, should display the IP & Geolocation information of the log user(the one accessing the app) using the provided API URL

- Should be able to enter a new ip address and will display the geo information on the same screen.

- Should display an error if entered data is not a valid ip address.

- Should be able to clear the search and will revert the geolocation to the log user.

- Should display a list of history searches entered.


Optional: (Plus points if accomplished)

- Should be able to click the history and display again the geo information of it.

- Should have a checkbox on the history list and be able to delete multiple histories.

- Should display the map and pin the exact location of the specified ip address (Big Plus)

 

 

Submission: Upload it to github on your account and submit the url link. (Be sure that this is a public repository for us to review it.)

 

Important Note!

Be sure to utilize the package.json/composer.json or if not please specify how you install the external libraries if there's any.

 

If you are done, please submit your work here: Submission Form

 

Submission Requirements: (Please follow the instruction below based on the technology you used)

React + Node.js: Both the frontend and backend should be hosted on Vercel.
React + Other Backend: Host the backend on a platform of your choice; it will then be called by your React frontend.
React Native / Flutter: Please submit the compiled APK file with your hosted API connected.