import { getFeaturedProperties } from "@/features/common/API/getFeaturedProperties";
import FeaturedProperties from "@/features/Home/components/FeaturedProperties";
import HeroBanner from "@/features/Home/components/HeroBanner";
import MeetTheTeam from "@/features/Home/components/MeetTheTeam";
import News from "@/features/Home/components/News";
import Partners from "@/features/Home/components/Partners";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps } from "next";

export default function Home({ featuredProperties }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DefaultLayout
      title="Perum TDL"
      description="Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.">
      <HeroBanner />
      <News />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <MeetTheTeam />
      <Partners />
      {/* <Testimonials /> */}
      {/* <Socialize /> */}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const properties = await getFeaturedProperties();

  return {
    props: {
      featuredProperties: properties,
    },
  };
};
