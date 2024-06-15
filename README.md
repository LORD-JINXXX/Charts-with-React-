# Charts-with-React

## Overview

#### This is a React application that displays interactive bar charts based on data fetched from a backend Express API. The data is stored in a MongoDB database, and users can apply various filters to dynamically update the charts.

## Features

#### - Fetch data from a backend Express API.
#### - Display data using bar charts with Chart.js.
#### - Apply multiple filters to update the charts dynamically.
#### - Reset filters to view the original dataset.

## Tech Stack

#### - **Frontend:** React, Chart.js, React-Chartjs-2, React-Select
#### - **Backend:** Express.js, MongoDB, Mongoose
#### - **Styling:** Tailwind CSS

## Installation

### Prerequisites

#### Ensure you have the following installed:

#### - Node.js (https://nodejs.org/)
#### - MongoDB (https://www.mongodb.com/)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/LORD-JINXXX/Charts-with-React-.git
    cd charts-with-react/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=8000
    USER_NAME= your_mongo_user_name
    PASSWORD  = your_mongo_password
    CLUSTER_NAME = your_mongo_cluster_name
    DATABASE_NAME = your_mongo_database_name
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

The React application should now be running on `http://localhost:3000`.

## Usage

#### 1. **Home Page:** Visit `http://localhost:3000` to view the dashboard.
#### 2. **Filters:** Use the filters on the page to refine the data displayed in the bar charts.
#### 3. **Reset:** Click the reset button to clear all filters and view the original dataset.

## Project Structure

### Backend

#### - **`backend/index.js`**: Entry point for the Express server.
#### - **`backend/models/Data.js`**: Mongoose schema and model for data.

### Frontend

#### - **`frontend/src/App.js`**: Main React component.
#### - **`frontend/src/Dashboard.jsx`**: Dashboard component containing charts and filters.

## Contributing
#### Fork the repository.
#### Create a new branch: git checkout -b feature-branch-name.
#### Make your changes and commit them: git commit -m 'Add some feature'.
#### Push to the branch: git push origin feature-branch-name.
#### Submit a pull request.
