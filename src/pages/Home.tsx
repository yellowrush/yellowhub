import Hero from '../components/Hero';
import HomepageGames from '../components/HomepageGames';
import Footer from '../components/Footer';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <HomepageGames />
      <Footer />
    </div>
  );
}
