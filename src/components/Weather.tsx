import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import useDebounce from "@/customHook/useDebounce";
import { motion, AnimatePresence } from "framer-motion";


const fetchWeather = async (city: string) => {
  try {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw new Error(
        error.response?.data?.error?.message || "Unable to fetch weather data"
      );
    } else {
      // Handle other errors (non-Axios errors)
      throw new Error("An unexpected error occurred");
    }
  }
};

const Weather = () => {
  const [city, setCity] = useState("New Delhi");
  const [inputError, setInputError] = useState("");
  const debouncedCity = useDebounce(city, 1000);
  const { data, isLoading, isError, error } = useQuery(
    ["weather", debouncedCity],
    () => fetchWeather(debouncedCity),
    {
      enabled: !!debouncedCity && debouncedCity.length > 2,
      retry: 0, // Retry only once
      onError: (err) => {
        setInputError((err as Error).message);
      },
      onSuccess: () => {
        setInputError("");
      },
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <motion.input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className={`border p-2 w-full mb-4 rounded-lg transition duration-300 focus:outline-none focus:ring ${
          inputError
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-300"
        }`}
        whileFocus={{ scale: 1.05 }}
      />
      {inputError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm mb-2"
        >
          {inputError}
        </motion.p>
      )}

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          Loading...
        </motion.p>
      )}

      {isError && !inputError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-600"
        >
          {error instanceof Error ? error.message : "Error fetching data"}
        </motion.p>
      )}

      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-2xl font-bold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {data.location.name}
              {` (${data.location.country})`}
            </motion.h1>
            <motion.p
              className="text-center text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {new Date(data.location.localtime).toUTCString()}
            </motion.p>
            <motion.p
              className="text-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {data.current.condition.text}
            </motion.p>
            <motion.p
              className="text-4xl font-semibold text-center text-blue-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {data.current.temp_c}°C
            </motion.p>
            <motion.img
              loading="lazy"
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="mx-auto mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Weather;
