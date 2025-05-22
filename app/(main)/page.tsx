'use client';

import Hero from "../../components/home/Hero";
import What from "../../components/home/What";
import Why from "../../components/home/why";
import Solution from "../../components/home/solution";
import Mission from "../../components/home/mission";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <What />
        <Why />
        <Solution />
        <Mission />
      </main>
    </div>
  );
}
