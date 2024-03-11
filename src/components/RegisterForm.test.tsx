import { screen, render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import RegisterService from "../services/RegisterService";

describe("RegisterForm", () => {
    it("should display initial form correctly", () => {
        const registerService = new RegisterService();

        render(<RegisterForm registerService={registerService} />);
        const inputFirstName = screen.getByRole(
            "input-firstName"
        ) as HTMLInputElement;
        expect(inputFirstName).toBeInTheDocument();
        expect(inputFirstName.value).toBe("");
    });
});
