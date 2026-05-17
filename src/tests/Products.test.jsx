import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Products from "../pages/Products";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Matte Lipstick",
          brand: "MAC",
          category: "Lips",
          shade: "Ruby Woo",
          price: 19.99,
          stock: 50,
          description: "A classic matte red lipstick",
        },
        {
          id: 2,
          name: "Foundation",
          brand: "Fenty Beauty",
          category: "Face",
          shade: "150N",
          price: 35.0,
          stock: 30,
          description: "Full coverage foundation",
        },
      ]),
  })
);

describe("Products", () => {
  it("renders the search bar", () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    expect(
      screen.getByPlaceholderText(/Search by name, brand or category/i)
    ).toBeInTheDocument();
  });

  it("updates search input when typed into", () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    const searchBar = screen.getByPlaceholderText(
      /Search by name, brand or category/i
    );
    fireEvent.change(searchBar, { target: { value: "MAC" } });
    expect(searchBar.value).toBe("MAC");
  });
});