import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BishopdaleValley } from './pages/BishopdaleValley';
import { FourTownships } from './pages/FourTownships';
import { People } from './pages/People';
import { Timeline } from './pages/Timeline';
import { Archive } from './pages/Archive';
import { Bishopdale } from './pages/townships/Bishopdale';
import { Thoralby } from './pages/townships/Thoralby';
import { BurtonCumWalden } from './pages/townships/BurtonCumWalden';
import { Newbiggin } from './pages/townships/Newbiggin';
import { Photographs } from './pages/archive/Photographs';
import { Documents } from './pages/archive/Documents';
import { Maps } from './pages/archive/Maps';
import { PeopleFamilies } from './pages/archive/PeopleFamilies';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-texture">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bishopdale-valley" element={<BishopdaleValley />} />
          <Route path="/four-townships" element={<FourTownships />} />
          <Route path="/townships/bishopdale" element={<Bishopdale />} />
          <Route path="/townships/thoralby" element={<Thoralby />} />
          <Route path="/townships/burton-cum-walden" element={<BurtonCumWalden />} />
          <Route path="/townships/newbiggin" element={<Newbiggin />} />
          <Route path="/people" element={<People />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/photographs" element={<Photographs />} />
          <Route path="/archive/documents" element={<Documents />} />
          <Route path="/archive/maps" element={<Maps />} />
          <Route path="/archive/people-families" element={<PeopleFamilies />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
