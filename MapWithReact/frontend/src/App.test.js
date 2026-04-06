import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders map control buttons", () => {
  render(<App />);
  expect(screen.getByText(/line/i)).toBeInTheDocument();
  expect(screen.getByText(/polygon/i)).toBeInTheDocument();
  expect(screen.getByText(/undo/i)).toBeInTheDocument();
});
