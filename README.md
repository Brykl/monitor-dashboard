# Monitor-dashboard

Monitor Dashboard is a web application designed to provide real-time monitoring and visualization of server performance and metrics. Built using modern front-end technologies, this dashboard offers an intuitive interface for users to view critical server statistics and statuses.

## Features

Features
 - Real-Time Data: Display server metrics like CPU usage, memory consumption, uptime, and more.
 - Data Fetching: Fetch server data dynamically with Redux to ensure updated information without reloading the page.
 - MUI Integration: Utilizes Material UI for a sleek and consistent user interface.

## Technologies Used
 - React: For building the user interface.
 - Redux: State management for handling server data.
 - Material-UI (MUI): For UI components and styling.
 - TypeScript: For better maintainability and type safety.
 - Node.js: Backend for serving real-time data (if applicable).
 - Restify: API framework for handling server-side requests.
 - Recharts: A charting library built with React, used for visualizing data in various formats, including line charts, bar charts, pie charts, and more.

## Installation
### Clone the repository:
`git clone git@github.com:Brykl/monitor-dashboard.git`
### Project structure
The project consists of two main folders:
 1) server: Contains the backend.
 2) client: Contains the frontend.
### Backend (Server)
 1) Install dependencies (using Node.js 16):
    `cd server`
    `npm install`
 2) Start the server:
    `npm run dev`
    Or build it:
    npm run build
 3) The server will be available at: http://localhost:8080/
    
### Frontend (Client)
 1) Install dependencies (using Node.js 22):
    `cd client`
    `npm install`
 2) Start the frontend:
    `npm run dev`
    Or build it:
    `npm run build`
 3) The client will be available at: http://localhost:5173


        







