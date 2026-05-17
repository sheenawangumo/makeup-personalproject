import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: 1,
  name: "Matte Lipstick",
  brand: "MAC",
  category: "Lips",
  shade: "Ruby Woo",
  price: 19.99,
  stock: 50,
  description: "A classic matte red lipstick",
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    render(
      <ProductCard
        product={mockProduct}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );
    expect(screen.getByText(/Matte Lipstick/i)).toBeInTheDocument();
    expect(screen.getByText(/MAC/i)).toBeInTheDocument();
    expect(screen.getByText(/Ruby Woo/i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();
  });

  it("shows edit fields when Edit button is clicked", () => {
    render(
      <ProductCard
        product={mockProduct}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("calls onDelete when Delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onDelete={mockDelete}
        onUpdate={() => {}}
      />
    );
    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate when Save button is clicked", () => {
    const mockUpdate = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onDelete={() => {}}
        onUpdate={mockUpdate}
      />
    );
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.click(screen.getByText(/Save/i));
    expect(mockUpdate).toHaveBeenCalledWith(1, {
      price: 19.99,
      stock: 50,
    });
  });
});