import Footer from "@/features/common/modules/Footer";
import Navigation from "@/features/common/modules/Navigation";
import Head from "next/head";
import router from "next/router";
import React, { useEffect } from "react";

const DefaultLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  useEffect(() => {
    // Check user data in local storage for auth token and expiration
    const tempAuthData = localStorage.getItem("auth");
    const tempUserData = localStorage.getItem("user");
    const authData = !tempAuthData ? "" : JSON.parse(tempAuthData);
    const userData = !tempUserData ? "" : JSON.parse(tempUserData);
    if (authData?.token && userData?.id) {
      const mappingUrl = {
        client: `/dashboard/client/${userData.id}`,
        admin: `/dashboard/admin/${userData.id}`,
      };
      router.push((mappingUrl as any)[userData.role]);
      // Auth token not found, redirect to login
    }
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="theme-color"
          content="#000000"
        />
        <link
          rel="icon"
          href="/logo.png"
        />
      </Head>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
