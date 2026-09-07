import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkinQuizSection from "../components/SkinQuizSection";

export default function Quiz() {
  return (
    <div className="min-h-screen flex flex-col relative bg-cream text-ink overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_90%_at_15%_0%,#FBF9F2_0%,#F4EFE6_55%,#ECE4D2_100%)]" />
      <Navbar />
      <main className="relative z-10 flex-1">
        <SkinQuizSection />
      </main>
      <Footer />
    </div>
  );
}
