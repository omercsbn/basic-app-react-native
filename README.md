
# React Native Navigation and Phone Number Validation App

This application is built using React Native and provides a simple implementation of a navigation stack and a phone number validation module.

# Project Description

The application consists of three main screens - a Login screen, a Register screen, and a Main screen. These screens are handled via a navigation stack. In addition, the app provides a module for validating phone numbers according to a specific country code (Turkey in this case).

## LoginScreen

This screen allows users to enter their username or phone number along with their password to log into the application. On successful login, the user is navigated to the Main screen. If the username, phone number, or password is incorrect, an alert is shown to the user.

## RegisterScreen

The Register screen enables new users to register their account by entering a username, phone number, and password. The phone number is validated using the **libphonenumber-js** library. Once the user has successfully registered, they are redirected to the Login screen.

## MainScreen

Once logged in, users are taken to the Main screen. This screen lists all users who have registered for the app. From here, users can delete any user's profile.

# Code Overview

The main components of the application are located in **App.js**, **LoginScreen.js**, **RegisterScreen.js**, and **MainScreen.js**.

- **App.js** defines the navigation stack consisting of the three screens.
- **LoginScreen.js** implements the user login functionality.
- **RegisterScreen.js** manages the user registration process and phone number validation.
- **MainScreen.js** displays the list of registered users and provides an option to delete users.

# Getting Started

To get started with this project:

- Clone the repository
- Install dependencies using npm install
- Run the application using npm start

# Dependencies

- React Native
- @react-navigation/native
- libphonenumber-js
- @react-native-async-storage/async-storage


## Screenshots

![Uygulama Ekran Görüntüsü](https://i.ibb.co/BZ6bJpP/resim-2023-05-30-205546159.png)
- Main Screen/Login Screen


![Uygulama Ekran Görüntüsü](https://i.ibb.co/NNRTJn2/resim-2023-05-30-205731979.png)
- Register Screen(Only TR numbers available for register.)

![Uygulama Ekran Görüntüsü](https://i.ibb.co/McTwrY7/resim-2023-05-30-205850351.png)
- Main Screen(Login successfully.)
  

# Contributing

Contributions, issues, and feature requests are welcome!

Please feel free to check [issues page](https://github.com/omercsbn/basic-app-react-native/issues). If you have any questions, please don't hesitate to contact me.

# License

Distributed under the MIT License. See LICENSE for more information.

# Contact

Ömercan Sabun - omercnsbn@icloud.com
