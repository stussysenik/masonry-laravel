import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import FindModel from './sections/FindModel';
import LatestAdditions from './sections/LatestAdditions';
import NewsEvents from './sections/NewsEvents';
import SplitSection from './sections/SplitSection';
import GetInTouch from './sections/GetInTouch';
import Atelier from './sections/Atelier';
import Mission from './sections/Mission';
import FollowUs from './sections/FollowUs';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FindModel />
        <LatestAdditions />
        <NewsEvents />
        <SplitSection />
        <GetInTouch />
        <Atelier />
        <Mission />
        <FollowUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
