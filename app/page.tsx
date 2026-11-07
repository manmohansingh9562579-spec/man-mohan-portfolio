import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
const EngineeringPlayground = dynamic(() => import('@/components/EngineeringPlayground'));
const Building = dynamic(() => import('@/components/Building'));
const Experience = dynamic(() => import('@/components/Experience'));
const Achievements = dynamic(() => import('@/components/Achievements'));
const Contact = dynamic(() => import('@/components/Contact'));
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
        <EngineeringPlayground />
        <Building />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
