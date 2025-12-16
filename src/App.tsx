import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BishopdaleValley } from './pages/BishopdaleValley';
import { FourTownships } from './pages/FourTownships';
import { People } from './pages/People';
import { Timeline } from './pages/Timeline';
import { Archive } from './pages/Archive';
import { Bishopdale } from './pages/townships/bishopdale/Bishopdale';
import { Thoralby } from './pages/townships/thoralby/Thoralby';
import { BurtonCumWalden } from './pages/townships/burton-cum-walden/BurtonCumWalden';
import { Newbiggin }       from './pages/townships/newbiggin/Newbiggin';
import { BishopdaleIndustry } from './pages/townships/bishopdale/BishopdaleIndustry';
import { ThoralbyIndustry } from './pages/townships/thoralby/ThoralbyIndustry';
import { BurtonCumWaldenIndustry } from './pages/townships/burton-cum-walden/BurtonCumWaldenIndustry';
import { NewbigginIndustry } from './pages/townships/newbiggin/NewbigginIndustry';
import { Photographs } from './pages/archive/Photographs';
import { Documents } from './pages/archive/Documents';
import { Maps } from './pages/archive/Maps';
import { PeopleFamilies } from './pages/archive/PeopleFamilies';
import { BuildingsPlaces } from './pages/archive/BuildingsPlaces';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { TownshipsList } from './pages/admin/TownshipsList';
import { TownshipEditor } from './pages/admin/TownshipEditor';

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
          <Route path="/townships/bishopdale/industry" element={<BishopdaleIndustry />} />
          <Route path="/townships/thoralby" element={<Thoralby />} />
          <Route path="/townships/thoralby/industry" element={<ThoralbyIndustry />} />
          <Route path="/townships/burton-cum-walden" element={<BurtonCumWalden />} />
          <Route path="/townships/burton-cum-walden/industry" element={<BurtonCumWaldenIndustry />} />
          <Route path="/townships/newbiggin" element={<Newbiggin />} />
          <Route path="/townships/newbiggin/industry" element={<NewbigginIndustry />} />
          <Route path="/people" element={<People />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/photographs" element={<Photographs />} />
          <Route path="/archive/documents" element={<Documents />} />
          <Route path="/archive/maps" element={<Maps />} />
          <Route path="/archive/people-families" element={<PeopleFamilies />} />
          <Route path="/archive/buildings-places" element={<BuildingsPlaces />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/townships" element={<TownshipsList />} />
          <Route path="/admin/townships/:id" element={<TownshipEditor />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
