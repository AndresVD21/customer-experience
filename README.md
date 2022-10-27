# Customer Experience - Challenge

## About

This project is the implementation of the Customer Experience where you can find the list of customers, edit them and add them.

## Tech Stack 💻

The tecnologies used for this project are the following

- **Angular**: This framework was choosed based on the guidelines and the requirements.

- **SCSS**: To handle the styles and the mantainability of them.

- **Redux (NGRX)**: To implement the state management of the application and store the data.

---

## Development 👨🏽‍💻

This project is separated in multiple parts:

### Feature Customer

The main module of the application where the business logic is implemented, everything is separated in various components and the models to represent the Customer are there also (feature-customer/models).

### Services

Here we have the service where we handle the request to get the users from an outside environment (mockapi.io).

### Shared

In this directory we can find components that are for common use.

### Store

Everything related to the state management is create here (actions/reduces/effects/selectors).

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

## Improvement Areas

| Area    | Improvement                                 |
|---------| ------------------------------------------- |
| Testing | Still need to improve in testing angular components. Increase code coverage to make sure every component is redering properly.
