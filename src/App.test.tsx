import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App Page", () => {
    it("should render registration form", () => {
        render(<App />);
        const appName = screen.getByText("Event Registration");
        expect(appName).toBeInTheDocument();
    });
});
