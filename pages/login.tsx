import LoginForm from "@/features/common/modules/LoginForm";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import React from "react";

const Login = () => {
  return (
    <DefaultLayout
      title="Login"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'>
      <LoginForm />
    </DefaultLayout>
  );
};

export default Login;
