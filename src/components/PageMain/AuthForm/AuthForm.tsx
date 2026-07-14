import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { signIn, signUp } from "../../../lib/supabaseAuth.js";
import { useUser } from "../../../context/UserContext.js";

import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import loginImage from "../../../assets/images/login-image.jpg";
import { mapAdmin, mapStudent } from "@/types/user.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";

export function AuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const { loginCurrentUser } = useUser();
  const [isVisible, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // states for register
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [idNumber, setIDnumber] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [yearLevel, setYearLevel] = useState("");

  // login
  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Authenticate user using supabase auth function
    const user = await signIn(email, password);

    // handle the case where user is undefined (authentication failed)
    if (!user) {
      alert("Invalid email or password");
      return;
    }
    const mappedUser =
      user.user_type === "student" ? mapStudent(user) : mapAdmin(user);

    // if successful store the user in user context
    // as the current user
    loginCurrentUser(mappedUser);

    // navigate to the appropriate dashboard based on user type
    user.userType === "student" ? navigate("/student") : navigate("/admin");
  }

  // register
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // register the user
    const user = await signUp({
      email,
      password: regPassword,
      userType: "student",
      studentData: {
        first_name: firstName,
        last_name: lastName,
        id_number: idNumber,
        year_level: Number(yearLevel),
      },
    });

    // handle failed registraton
    if (!user) {
      alert("Registration failed");
      return;
    }

    // if successful toggle the register form visibility
    toggleRegisterForm();
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function toggleRegisterForm(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    if (isVisible) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }

  return (
    <div
      className={cn(
        "relative gap-6 w-[90%] h-full sm:w-[65%] md:w-[85%] lg:w-[800px]",
        className,
      )}
      {...props}
    >
      {/* Login Card */}
      <Card
        className={`${isVisible ? "opacity-0 pointer-events-none" : "opacity-100"} 
    absolute inset-0 transition-opacity duration-300 ease-in-out overflow-hidden p-0 bg-transparent flex justify-center border-none border-0 ring-0`}
      >
        <CardContent className="grid p-0 md:grid-cols-2 overflow-hidden bg-card rounded-xl ring-1 ring-foreground/10">
          <form className="p-6 md:p-8" onSubmit={handleSignIn}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your VMC account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  value={email}
                  onChange={handleEmail}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  value={password}
                  onChange={handlePassword}
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button className="h-fit p-2" type="submit">
                  Login
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <Field className="flex">
                <Button
                  className="h-fit p-2"
                  variant="outline"
                  type="button"
                  onClick={toggleRegisterForm}
                >
                  Sign up
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sign up Card */}
      <Card
        className={`${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} 
    absolute inset-0 transition-opacity duration-300 ease-in-out overflow-hidden p-4 bg-transparent h-fit flex justify-center ring-0`}
      >
        <CardContent className="grid p-0 md:grid-cols-2 overflow-hidden bg-card rounded-xl ring-1 ring-foreground/10">
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-6 md:p-8" onSubmit={handleSignUp}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Fill out the form below.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="firstName">First Name:</FieldLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  id="firstName"
                  type="text"
                  placeholder="Apolinario"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name:</FieldLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  id="lastName"
                  type="text"
                  placeholder="Mabini"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="idNumber">ID Number:</FieldLabel>
                <Input
                  value={idNumber}
                  onChange={(e) => setIDnumber(e.target.value)}
                  id="idNumber"
                  type="text"
                  placeholder="26-0COL-XXXXXX"
                  required
                />
                <FieldDescription>Look at your ID.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="yearLevel">Year Level:</FieldLabel>
                {/* <Input
                  value={yearLevel}
                  onChange={(e) => setYearLevel(Number(e.target.value))}
                  id="yearLevel"
                  type="number"
                  placeholder="3"
                  required
                /> */}
                <Select
                  onValueChange={(value) => setYearLevel(value)}
                  value={yearLevel}
                  name="yearLevel"
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="4th" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">1st</SelectItem>
                      <SelectItem value="2">2nd</SelectItem>
                      <SelectItem value="3">3rd</SelectItem>
                      <SelectItem value="4">4th</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <Field className="grid grid-cols-1 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      id="password"
                      type="password"
                      required
                    />
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
              </Field>

              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <Field className="flex">
                <Button
                  variant="outline"
                  type="button"
                  onClick={toggleRegisterForm}
                >
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
