import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
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
import { ResetPassword } from './pages/admin/ResetPassword';
import { AdminDashboard } from './pages/admin/Dashboard';
import { TownshipsList } from './pages/admin/TownshipsList';
import { TownshipEditor } from './pages/admin/TownshipEditor';
import { PagesEditor } from './pages/admin/PagesEditor';
import { EventsEditor } from './pages/admin/EventsEditor';
import { PeopleEditor } from './pages/admin/PeopleEditor';
import { PhotographsEditor } from './pages/admin/PhotographsEditor';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { UsersAdmin } from './pages/admin/UsersAdmin';
import { DynamicTownship } from './pages/townships/DynamicTownship';

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
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/townships" element={<TownshipsList />} />
          <Route path="/admin/townships/:id" element={<ProtectedRoute><TownshipEditor /></ProtectedRoute>} />
          <Route path="/admin/pages" element={<ProtectedRoute><PagesEditor /></ProtectedRoute>} />
          <Route path="/admin/pages/:id" element={<ProtectedRoute><PagesEditor /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><EventsEditor /></ProtectedRoute>} />
          <Route path="/admin/events/new" element={<ProtectedRoute><EventsEditor /></ProtectedRoute>} />
          <Route path="/admin/events/:id" element={<ProtectedRoute><EventsEditor /></ProtectedRoute>} />
          <Route path="/admin/people" element={<ProtectedRoute><PeopleEditor /></ProtectedRoute>} />
          <Route path="/admin/people/new" element={<ProtectedRoute><PeopleEditor /></ProtectedRoute>} />
          <Route path="/admin/people/:id" element={<ProtectedRoute><PeopleEditor /></ProtectedRoute>} />
          <Route path="/admin/photographs" element={<ProtectedRoute><PhotographsEditor /></ProtectedRoute>} />
          <Route path="/admin/photographs/new" element={<ProtectedRoute><PhotographsEditor /></ProtectedRoute>} />
          <Route path="/admin/photographs/:id" element={<ProtectedRoute><PhotographsEditor /></ProtectedRoute>} />
          <Route path="/admin/media" element={<ProtectedRoute requiredRole="admin"><MediaLibrary /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UsersAdmin /></ProtectedRoute>} />
          {/* Dynamic township route - catches any new townships created via admin */}
          <Route path="/townships/:slug" element={<DynamicTownship />} />
          <Route path="/townships/:slug/industry" element={<DynamicTownship />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
