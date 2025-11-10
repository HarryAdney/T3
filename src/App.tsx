import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Timeline } from './pages/Timeline';
import { Maps } from './pages/Maps';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { People } from './pages/People';
import { Buildings } from './pages/Buildings';
import { OfficialRecords } from './pages/OfficialRecords';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-texture">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/official-records" element={<OfficialRecords />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
