# Weather Reports

A web-based weather dashboard application that displays weather information for any city using a public weather API. This project is built using **Next.js** with **TypeScript**, **React Query**, and **Tailwind CSS** for seamless data fetching, styling, and performance optimization.

## Features

- **Dynamic Weather Data**: Fetches real-time weather data from the OpenWeather API (or similar).
- **Responsive Design**: Fully responsive interface powered by Tailwind CSS for a smooth user experience on all devices.
- **SEO Optimized**: Proper metadata for search engine optimization.
- **Unit Testing**: Includes unit tests for core components to ensure code reliability.

## Tech Stack

- **Next.js**: For server-side rendering and React-based framework.
- **TypeScript**: Strongly typed language for better code maintainability.
- **React Query**: For efficient data fetching and state management.
- **Tailwind CSS**: For utility-first CSS styling.
- **Jest/Testing Library**: For unit testing of components.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Ankitthakur3110/weather-reports.git
cd weather-reports
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your environment variables by creating a `.env.local` file in the root directory. Add your weather API key:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:3000` to view the app.

## Usage

Enter a city name to get real-time weather details, including:

- Temperature
- Humidity
- Wind Speed
- Weather Condition (Sunny, Cloudy, Rainy, etc.)

## Running Tests

To run the unit tests for the application:

```bash
npm run test
```

## Build and Deployment

To build the application for production:

```bash
npm run build
```

This will create an optimized build in the `.next` folder. You can start the production server using:

```bash
npm run start
```