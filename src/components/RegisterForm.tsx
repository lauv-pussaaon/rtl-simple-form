import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RegisterService from "../services/RegisterService";
import Registration from "../models/Registration";
import "./RegisterForm.css";

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});

type RegisterFormProps = {
    registerService: RegisterService;
};

function RegisterForm({ registerService }: RegisterFormProps) {
    const [registration, setRegistration] = useState<Registration | undefined>(
        undefined
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(formData: Registration) {
        const registration = await registerService.register(formData);
        setRegistration(registration);
    }

    if (registration) {
        return (
            <div>
                <h1>Registered Successfully</h1>
                <p>
                    <span>Full Name: </span>
                    {registration.firstName}
                    {registration.lastName}
                </p>
                <p>
                    <span>Email: </span>
                    {registration.email}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1>Event Registration</h1>
            <div className="form-row">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    role="input-firstName"
                    {...register("firstName")}
                />
                {errors.firstName?.message && (
                    <span role="error-firstName" className="input-error">
                        {errors.firstName.message}
                    </span>
                )}
            </div>
            <div className="form-row">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    role="input-lastName"
                    {...register("lastName")}
                />
                {errors.lastName?.message && (
                    <span role="error-lastName" className="input-error">
                        {errors.lastName.message}
                    </span>
                )}
            </div>
            <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    role="input-email"
                    {...register("email")}
                />
                {errors.email?.message && (
                    <span role="error-email" className="input-error">
                        {errors.email.message}
                    </span>
                )}
            </div>
            <button className="btn-register" role="register-button">
                Register
            </button>
        </form>
    );
}

export default RegisterForm;
