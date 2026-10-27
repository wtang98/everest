import { render, screen } from "@testing-library/react";
import App from "./App";
import Contact from "./pages/contact/contact";

test("renders the refreshed home page and primary navigation", () => {
    render(<App />);

    expect(
        screen.getByRole("heading", {
            name: "A considered approach to your financial future.",
        }),
    ).toBeInTheDocument();
    expect(
        screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
        "href",
        "/contact",
    );
});

test("requires contact details and a message before composing an enquiry", () => {
    render(<Contact currentLanguage="Eng" />);

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email address")).toBeRequired();
    expect(screen.getByLabelText("Your message")).toBeRequired();
    expect(
        screen.getByRole("button", { name: /compose email/i }),
    ).toBeInTheDocument();
});
