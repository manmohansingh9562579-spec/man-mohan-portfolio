import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import EngineeringLab from '@/components/EngineeringLab';
import Building from '@/components/Building';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import GitHubSection from '@/components/GitHubSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <EngineeringLab />
        <Building />
        <Experience />
        <Achievements />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
