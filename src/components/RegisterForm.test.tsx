import { screen, render, cleanup } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import RegisterService from "../services/RegisterService";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
    beforeEach(() => {
        const registerService = new RegisterService();
        render(<RegisterForm registerService={registerService} />);
    });

    afterEach(() => {
        cleanup();
    });

    it("should display initial form correctly", () => {
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

    it.only("should display error messages for missing inputs", async () => {
        const messageRoles = [
            "error-firstName",
            "error-lastName",
            "error-email",
        ];
        messageRoles.forEach((role) => {
            const message = screen.queryByRole(role);
            expect(message).not.toBeInTheDocument();
        });

        const user = userEvent.setup();
        const btnSubmit = screen.getByRole("register-button");
        await user.click(btnSubmit);

        const messageErrors = [
            "First name is required",
            "Last name is required",
            "Email is required",
        ];
        messageRoles.forEach((role, index) => {
            const message = screen.getByRole(role);
            expect(message).toBeInTheDocument();
            expect(message.textContent).toBe(messageErrors[index]);
        });
    });
});
