import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { EditModeProvider } from './contexts/EditModeContext';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const BishopdaleValley = lazy(() => import('./pages/BishopdaleValley').then(m => ({ default: m.BishopdaleValley })));
const FourTownships = lazy(() => import('./pages/FourTownships').then(m => ({ default: m.FourTownships })));
const People = lazy(() => import('./pages/People').then(m => ({ default: m.People })));
const Timeline = lazy(() => import('./pages/Timeline').then(m => ({ default: m.Timeline })));
const Archive = lazy(() => import('./pages/Archive').then(m => ({ default: m.Archive })));

// Township pages
const Bishopdale = lazy(() => import('./pages/townships/bishopdale/Bishopdale').then(m => ({ default: m.Bishopdale })));
const Thoralby = lazy(() => import('./pages/townships/thoralby/Thoralby').then(m => ({ default: m.Thoralby })));
const BurtonCumWalden = lazy(() => import('./pages/townships/burton-cum-walden/BurtonCumWalden').then(m => ({ default: m.BurtonCumWalden })));
const Newbiggin = lazy(() => import('./pages/townships/newbiggin/Newbiggin').then(m => ({ default: m.Newbiggin })));
const BishopdaleIndustry = lazy(() => import('./pages/townships/bishopdale/BishopdaleIndustry').then(m => ({ default: m.BishopdaleIndustry })));
const ThoralbyIndustry = lazy(() => import('./pages/townships/thoralby/ThoralbyIndustry').then(m => ({ default: m.ThoralbyIndustry })));
const BurtonCumWaldenIndustry = lazy(() => import('./pages/townships/burton-cum-walden/BurtonCumWaldenIndustry').then(m => ({ default: m.BurtonCumWaldenIndustry })));
const NewbigginIndustry = lazy(() => import('./pages/townships/newbiggin/NewbigginIndustry').then(m => ({ default: m.NewbigginIndustry })));

// Archive pages
const Photographs = lazy(() => import('./pages/archive/Photographs').then(m => ({ default: m.Photographs })));
const Documents = lazy(() => import('./pages/archive/Documents').then(m => ({ default: m.Documents })));
const Maps = lazy(() => import('./pages/archive/Maps').then(m => ({ default: m.Maps })));
const PeopleFamilies = lazy(() => import('./pages/archive/PeopleFamilies').then(m => ({ default: m.PeopleFamilies })));
const BuildingsPlaces = lazy(() => import('./pages/archive/BuildingsPlaces').then(m => ({ default: m.BuildingsPlaces })));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.AdminLogin })));
const ResetPassword = lazy(() => import('./pages/admin/ResetPassword').then(m => ({ default: m.ResetPassword })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const TownshipsList = lazy(() => import('./pages/admin/TownshipsList').then(m => ({ default: m.TownshipsList })));
const TownshipEditor = lazy(() => import('./pages/admin/TownshipEditor').then(m => ({ default: m.TownshipEditor })));
const PagesEditor = lazy(() => import('./pages/admin/PagesEditor').then(m => ({ default: m.PagesEditor })));
const PagesManager = lazy(() => import('./pages/admin/PagesManager').then(m => ({ default: m.PagesManager })));
const EventsEditor = lazy(() => import('./pages/admin/EventsEditor').then(m => ({ default: m.EventsEditor })));
const PeopleEditor = lazy(() => import('./pages/admin/PeopleEditor').then(m => ({ default: m.PeopleEditor })));
const PhotographsEditor = lazy(() => import('./pages/admin/PhotographsEditor').then(m => ({ default: m.PhotographsEditor })));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary').then(m => ({ default: m.MediaLibrary })));
const UsersAdmin = lazy(() => import('./pages/admin/UsersAdmin').then(m => ({ default: m.UsersAdmin })));
const DynamicTownship = lazy(() => import('./pages/townships/DynamicTownship').then(m => ({ default: m.DynamicTownship })));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 rounded-full border-stone-200 border-t-sage-600 animate-spin"></div>
        <p className="mt-4 text-stone-600">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <EditModeProvider>
        <div className="flex flex-col min-h-screen bg-texture">
          <Header />
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/admin/pages" element={<ProtectedRoute><PagesManager /></ProtectedRoute>} />
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
          </Suspense>
          <Footer />
        </div>
      </EditModeProvider>
    </BrowserRouter>
  );
}

export default App;
