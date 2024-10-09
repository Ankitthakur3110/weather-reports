// Weather.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Weather from "./Weather";
import { useQuery } from "react-query";
import "@testing-library/jest-dom"; // Optional for extended matchers like toBeInTheDocument

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

describe("Weather Component", () => {
  const mockUseQuery = useQuery as jest.Mock;

  it("renders the loading state correctly", () => {
    // Mock useQuery to return loading state
    mockUseQuery.mockReturnValue({
      isLoading: true,
      data: null,
      isError: false,
      error: null,
    });

    render(<Weather />);

    // Assert loading message is displayed
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders weather data correctly", async () => {
    // Mock useQuery to return success state with mock data
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: {
        location: {
          name: "New York",
          country: "USA",
          localtime: "2024-10-09 12:00",
        },
        current: {
          temp_c: 25,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
        },
      },
      isError: false,
      error: null,
    });

    render(<Weather />);

    // Assert weather data is displayed
    expect(screen.getByText(/New York \(USA\)/i)).toBeInTheDocument();
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
    expect(screen.getByAltText(/sunny/i)).toBeInTheDocument();
  });

  it("renders an error message when an error occurs", () => {
    // Mock useQuery to return error state
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: null,
      isError: true,
      error: new Error("Unable to fetch weather data"),
    });

    render(<Weather />);

    // Assert error message is displayed
    expect(screen.getByText(/unable to fetch weather data/i)).toBeInTheDocument();
  });

  it("displays input error when city name is invalid", async () => {
    // Mock useQuery with invalid city
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: null,
      isError: true,
      error: new Error("Invalid city name"),
    });

    render(<Weather />);

    const input = screen.getByPlaceholderText(/enter city/i);
    fireEvent.change(input, { target: { value: "xx" } });

    await waitFor(() =>
      expect(screen.getByText(/invalid city name/i)).toBeInTheDocument()
    );
  });
});
