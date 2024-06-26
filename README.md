# 1536 Well Microtiter Heatmap

This project is a web application designed to visualize data using heatmaps. It utilizes React along with several important libraries for data processing and visualization.

# Go to page

Runing at: https://1536-well-microtiter-headmmap.vercel.app NOW

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (https://nodejs.org/)

- npm (comes with Node.js)

### Installation

1. Clone the repository:
   git clone [https://github.com/your-username/1536-well-microtier-headmap.git](https://github.com/RaulAcostaDeveloper/1536-well-microtiter-headmmap.git)
   cd 1536-well-microtier-headmap

### Install NPM packages:

npm install

### Running the Project

To start the development server:

npm start

go to http://localhost:3000

### Building for Production
To build the app for production to the build folder:

npm run build


### Libraries Used
Here is a list of the main libraries used in this project:

React and React-DOM - A JavaScript library for building user interfaces.

Plotly.js-basic-dist and react-plotly.js - Used for creating interactive plots.

D3 - JavaScript library for manipulating documents based on data.

PapaParse - A powerful CSV (Comma Separated Values) parser.

@testing-library/react, @testing-library/jest-dom, and @testing-library/user-event - Used for testing React components.

web-vitals - A library for measuring performance on the web.

## Docker instructions
You can create and build a docker container with adding a Docker file and running docker build -t app-name

1._ if you require the docker container compiled, should run this instructions

   a) $ git checkout docker-test

   b) do $ git pull origin docker-test if is necessary

2._ Download and install Docker

https://www.docker.com/products/docker-desktop/

3._ Check if docker is installed
docker --version

4._ Run Docker

5._ Run docker container

docker run -p 3000:3000 1536-well-microtier-headmap

go to http://localhost:3000



# Additional Information

Este `README.md` proporciona una guía clara para configurar el entorno de desarrollo, ejecutar la aplicación, construir la versión para producción y ejecutar pruebas. Además, incluye una descripción de las principales librerías usadas en el proyecto, lo que puede ser útil tanto para usuarios nuevos como existentes del repositorio.

Please visit https://www.raulacostadeveloper.com/dev for more details
