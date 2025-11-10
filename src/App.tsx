import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Editor } from './pages/Editor';
import { Admin } from './pages/Admin';
import { PuckPage } from './pages/PuckPage';
import { PageManager } from './pages/PageManager';
import { Home } from './pages/Home';
import { FourTownships } from './pages/FourTownships';
import { Timeline } from './pages/Timeline';
import { Maps } from './pages/Maps';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Contribute } from './pages/Contribute';
import { People } from './pages/People';
import { Buildings } from './pages/Buildings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-texture">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/buildings" element={<Buildings />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/bishopdale-valley" element={<PuckPage slug="bishopdale-valley" />} />
            <Route path="/four-townships" element={<FourTownships />} />
            <Route path="/thoralby" element={<PuckPage slug="thoralby" />} />
            <Route path="/newbiggin" element={<PuckPage slug="newbiggin" />} />
            <Route path="/bishopdale" element={<PuckPage slug="bishopdale" />} />
            <Route path="/west-burton" element={<PuckPage slug="west-burton" />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pages" element={<PageManager />} />
            <Route path="/editor/:slug" element={<Editor />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/page/:slug" element={<PuckPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
