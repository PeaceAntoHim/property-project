import { getProperties } from "@/features/common/API/getProperties";
import FeaturedProperties from "@/features/Home/components/FeaturedProperties";
import HeroBanner from "@/features/Home/components/HeroBanner";
import MeetTheTeam from "@/features/Home/components/MeetTheTeam";
import Partners from "@/features/Home/components/Partners";
import Testimonials from "@/features/Home/components/Testimonials";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { InferGetServerSidePropsType } from "next";
import { AuthOptions, getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]";

export default function Home({ featuredProperties }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DefaultLayout
      title="Tanjung Damai Lestari"
      description="Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.">
      <HeroBanner />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <MeetTheTeam />
      <Partners />
      <Testimonials />
    </DefaultLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context?.req, context?.res, authOptions as unknown as AuthOptions);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  const properties = await getProperties(3);
  return {
    props: {
      session,
      featuredProperties: properties,
    },
  };
};
