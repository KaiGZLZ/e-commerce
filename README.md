# E-Commerce Project

This is a web application created with [React](https://react.dev/) for the Frontend, also using libraries such as [ChakraUI](https://chakra-ui.com/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview). On the other hand, for the Backend [express.js](https://expressjs.com/) was the chosen technology.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Backend configuration](#backend-configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Introduction

The project aims to implement an E-Commerce capable of managing product purchase and sale services through contact numbers or directly from the email, being able to validate transfer data, as well as tracking and status of purchases. carried out.

The system was made in such a way that it allows the most basic operations of all E-Commerce to be carried out, such as the main page, entry and modification of products, categories, filters, pagination, individual description, shopping cart. As well as other functionalities related to purchases, such as email notifications when making a purchase, modification of the status of the purchase (make or confirm the payment, send the package, etc.), display of the status of the purchase, history of purchases made, among other features

The performance of the page was also improved, making use of the cache system provided by RTK Query, in addition to other different functionalities that this library brings.

## Features

- 🛒 Posibility to process purchases with or without user registration
- 🛍️ UI Libraries used which speeds up the responsive development.
- 🚀 Performance improvements with cache systems.
- 💡 Modular architecture for easy development and scaling.
- 📱 Responsive design for optimal viewing on all devices.
- 📦 Customizable and expandable according to the needs of your project.
- 💸 Open for the integration of payment gateways

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/KaiGZLZ/e-commerce.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

5. Install backend dependencies:

   ```bash
   npm install
   ```

### Backend configuration

Initially, a .env file must be created in which the following environment variables must be created

```text
SECRET = SECRET_WORD_FOR_ENCRYPTION

URL_CONFIRMATION_EMAIL = http://localhost:3000/authenticate/
URL_RECOVER_PASSWORD = http://localhost:3000/change-password/
URL_WATCH_PURCHASE_DETAILS = http://localhost:3000/sales/sale/

EMAIL_HOST = EMAIL_HOST
EMAIL_PASSWORD_HOST = EMAIL_PASSWORD_HOST

```

- SECRET corresponds to the word for creating the JWT authentication token.

- In the case of the URL, initially it is localhost/3000, but it can change depending on the port on which you are working

- Finally, given that the system works by using Gmail email as a means of communication to make purchases and notifications, a Gmail email and its respective [authentication key](https://support.google.com/mail/answer/185833?hl=en) will be needed, which will be obtained directly from the service provider. It must be clarified that the email must be Gmail in addition to the fact that the password is not the email password, but another [special password for web applications](https://support.google.com/mail/answer/185833?hl=en)

## Usage

To start the development server and preview the project locally:

For the **Frontend**, position yourself in the corresponding folder and run:

```bash
npm start
```

For the **Backend**, position yourself in the corresponding folder and run:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the project in action.

## Deployment

To build and deploy the project for production, use:

```bash
npm run build
```

This will generate the optimized files in the `dist` directory, which you can then deploy to your chosen hosting platform.

## Contributing

Contributions are welcome! If you find a bug, have an enhancement suggestion, or want to contribute in any way, please open an issue or a pull request in this repository. We value and appreciate your feedback.

---

---

---

Thanks for checking out the E-Commerce Project! I hope that
It can serve as a starting point for a project, to obtain ideas on how to implement a project with the technologies used or reuse some of the solutions implemented in this work, in other different projects. Happy coding! 🚀🌠
