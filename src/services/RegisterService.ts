import Registration from "../models/Registration";

class RegisterService {
    public async register(
        registration: Registration
    ): Promise<Registration | undefined> {
        const { firstName, lastName, email } = registration;
        return new Promise((resolve) => {
            if (firstName && lastName && email) {
                const registration = {
                    firstName,
                    lastName,
                    email,
                };
                resolve(registration);
            } else {
                resolve(undefined);
            }
        });
    }
}

export default RegisterService;
