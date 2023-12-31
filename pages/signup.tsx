import React from "react";
import SignupForm from "@/features/common/modules/SignupForm";
import DefaultLayout from "@/features/Layout/DefaultLayout";

const Signup = () => {
  return (
    <DefaultLayout
      title="Signup"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'>
      <SignupForm />
    </DefaultLayout>
  );
};

export default Signup;
