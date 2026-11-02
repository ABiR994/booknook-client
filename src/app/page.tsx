import { HeroSlider } from "@/components/home/HeroSlider";

// A layout's title template does not apply to the page in the same segment,
// so the home page sets its full title. Other routes only need `title: "All Books"` etc.
export const metadata = { title: { absolute: "BookNook | Home" } };

export default function HomePage() {
  return <HeroSlider />;
}
