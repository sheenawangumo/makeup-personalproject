import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  it("renders the store name", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Glam Hub Admin/i)).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
  });
});