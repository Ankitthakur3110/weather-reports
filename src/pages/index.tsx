import Head from 'next/head';
import Weather from '../components/Weather';

const Home = () => (
  <>
    <Head>
      <title>Weather Dashboard</title>
      <meta name="description" content="Check the current weather conditions of any city." />
      <meta property="og:title" content="Weather Dashboard" />
      <meta property="og:description" content="Check the weather of various cities." />
    </Head>
    <div className="min-h-screen bg-gray-100">
      <Weather />
    </div>
  </>
);

export default Home;
