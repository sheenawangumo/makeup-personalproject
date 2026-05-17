import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddProduct from "../pages/AddProduct";

describe("AddProduct", () => {
  it("renders the form correctly", () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Matte Lipstick/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/MAC/i)).toBeInTheDocument();
  });

  it("shows error when required fields are empty", () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Add Product/i));
    expect(
      screen.getByText(/Please fill in at least the name, brand and price/i)
    ).toBeInTheDocument();
  });

  it("updates input values when typed into", () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );
    const nameInput = screen.getByPlaceholderText(/Matte Lipstick/i);
    fireEvent.change(nameInput, { target: { value: "Blush" } });
    expect(nameInput.value).toBe("Blush");
  });
});