import {
    screen,
    render,
    cleanup,
    fireEvent,
    act,
} from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
    const registerFnMock = jest.fn();
    const registerServiceMock = {
        register: registerFnMock,
    };

    beforeEach(() => {
        render(<RegisterForm registerService={registerServiceMock} />);
    });

    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.clearAllMocks();
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

    it("should display error messages for missing inputs", async () => {
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

    it("should display error message for invalid email", async () => {
        fireEvent.change(screen.getByRole("input-email"), {
            target: { value: "wrongemail#@.com" },
        });
        fireEvent.click(screen.getByRole("register-button"));

        const message = await screen.findByText("Invalid email");
        expect(message).toBeInTheDocument();
    });

    it.only("should register successfully with valid inputs", async () => {
        const mockRegister = {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedone@gmail.com",
        };
        registerFnMock.mockResolvedValueOnce(mockRegister);

        await act(async () => {
            fireEvent.change(screen.getByRole("input-firstName"), {
                target: { value: mockRegister.firstName },
            });
            fireEvent.change(screen.getByRole("input-lastName"), {
                target: { value: mockRegister.lastName },
            });
            fireEvent.change(screen.getByRole("input-email"), {
                target: { value: mockRegister.email },
            });
            fireEvent.click(screen.getByRole("register-button"));
        });

        expect(registerFnMock).toHaveBeenCalledTimes(1);
        expect(registerFnMock).toHaveBeenCalledWith(mockRegister);

        const successMessage = await screen.findByText(
            /Registered Successfully/
        );
        expect(successMessage).toBeInTheDocument();
    });
});
