<p align="center">
<img align="center" width="150" alt="Rare Kickz Logo" src="./src/assets/rk-short-logo.png" />
</p>
<h1 align="center" style="font-weight: bold;">RareKickz Admin Web</h1>

<p align="center">
  <a href="#tech">Technologies</a> •
  <a href="#started">Getting Started</a> •
  <a href="#arch">Architecture</a>
</p>

<p align="center">
    <b>Front End admin application for managing sneakers and orders.</b>
</p>

<p align="center">
<img align="center" alt="Rare Kickz Logo" src="./src/assets/rk-preview.gif" />
</p>

<h2 id="technologies">💻 Technologies</h2>

- ![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff)

<h2 id="started">🚀 Getting started</h2>
<h3>Prerequisites</h3>

- [Node.js](https://nodejs.org/en/download/package-manager)
- [TypeScript](https://www.npmjs.com/package/typescript)

<h3>Environment Variables</h3>

- There are three environment in total `apiUrl`, `keycloakUrl` and `production`. When running in development mode the `apiUrl` is set to `http://localhost:8080`, `keycloakUrl` is set to `http://localhost:8090` and `production` is set to `false`. You can find the environment files in `src/environments/` folder, and in order to build the application for production execute the following command `npm run build-prod`.

<h3>Starting the Project</h3>

- Clone the project, install the node dependencies by running `npm install` and then you can start the application with `npm run start` if the backend is started correctly.

<h2 id="arch">⛩️ Architecture</h2>
<h3>Modules</h3>
The e-commerce front-end application is divided into several smaller modules, each responsible for managing a specific domain.

- Home – Displays the home screen, featuring a selected premium sneaker, most wanted sneaker and a preview of sales for the last week.
- Orders – Displays order details.
- Sneakers – Responsible for managing sneakers (CRUD).
