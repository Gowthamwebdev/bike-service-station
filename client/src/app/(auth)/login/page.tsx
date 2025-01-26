'use client';
import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { ErrorState, FormState } from "@/src/types/formType";
import apiClient from "@/src/api/apiClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState<ErrorState>({});
  const [loginStatus, setLoginStatus] = useState<string | null>(null); // State for login status message

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!formState.email || !formState.password) {
      setErrors({
        name: !formState.email ? "email is required" : undefined,
        password: !formState.password ? "Password is required" : undefined,
      });
      return;
    }
    console.log(formState.email, formState.password)

    try {
      const response = await apiClient.post("/auth/login", {
        email: formState.email,
        password: formState.password,
      },{
        withCredentials: true 
      });
        console.log("Login successful:", response.data);
      setLoginStatus(response.data.message || "Login successful!");

      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard after successful login
      },2000);
      setErrors({});
      
    } catch (error: any) {
      console.error("Error:", error);
      setLoginStatus(
        error.response?.data?.error || "An unexpected error occurred"
      ); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center w-full pt-32">
      <Form
        className="w-full justify-center items-center space-y-4"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md">
          {/* Name Input */}
          <Input
            isRequired
            name="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            value={formState.email}
            onValueChange={(value) =>
              setFormState((prev) => ({ ...prev, email: value }))
            }
            errorMessage={errors.name}
          />

          {/* Password Input */}
          <Input
            isRequired
            name="password"
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            value={formState.password}
            onValueChange={(value) =>
              setFormState((prev) => ({ ...prev, password: value }))
            }
            errorMessage={errors.password}
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Submit
            </Button>
            <Button
              type="reset"
              variant="bordered"
              onClick={() => {
                setFormState({ email: "", password: "" });
                setErrors({});
                setLoginStatus(null); // Clear status on reset
              }}
            >
              Reset
            </Button>
          </div>

          {/* Login Status Message */}
          {loginStatus && (
            <div
              className={`text-small mt-2 ${
                loginStatus.includes("Welcome") ? "text-success" : "text-danger"
              }`}
            >
              {loginStatus}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
