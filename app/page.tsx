import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import EngineeringLab from '@/components/EngineeringLab';
import Building from '@/components/Building';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Marquee />
        <TechStack />
        <Projects />
        <EngineeringLab />
        <Building />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
