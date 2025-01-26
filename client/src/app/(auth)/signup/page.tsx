'use client';

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import apiClient from "@/src/api/apiClient";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {

  const router = useRouter();

  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState<null | Record<string, string>>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Real-time password validation
  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use a specific type for the form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;

    // Custom validation checks
    const newErrors: Record<string, string> = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);

    try {
      // API Call
      const response = await apiClient.post("/auth/signup", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful! redirecting...");

      setTimeout(() => {
        router.push('/login');
      }, 2000)

    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({ api: "Signup failed. Please try again later." });
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your name";
            }
            return errors.name;
          }}
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your phone number";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid phone number";
            }
          }}
          label="Phone Number"
          labelPlacement="outside"
          name="phone"
          placeholder="Enter your phone number"
          type="number"
        />

        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your email";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid email address";
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}

      {errors.api && (
        <div className="text-small text-danger mt-2">{errors.api}</div>
      )}
    </Form>
  );
}
