import { screen, render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import RegisterService from "../services/RegisterService";

describe("RegisterForm", () => {
    it("should display initial form correctly", () => {
        const registerService = new RegisterService();
        render(<RegisterForm registerService={registerService} />);

        const rolesInTest = [
            "input-firstName",
            "input-lastName",
            "input-email",
        ];
        rolesInTest.forEach((role) => {
            const input = screen.getByRole(role) as HTMLInputElement;
            expect(input).toBeInTheDocument();
            expect(input.value).toBe("");
        });

        const btnSubmit = screen.getByRole("register-button");
        expect(btnSubmit.textContent).toBe("Register");
    });
});
