import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import WhatIsBalance from "./components/WhatIsBalance";
import WhyItMatters from "./components/WhyItMatters";
import BalanceWheel from "./components/BalanceWheel";
import Tips from "./components/Tips";
import Quiz from "./components/Quiz";
import Resources from "./components/Resources";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero />
        <WhatIsBalance />
        <WhyItMatters />
        <BalanceWheel />
        <Tips />
        <Quiz />
      </main>

      <Resources />
    </>
  );
}
