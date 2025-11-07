import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BishopdaleValley } from './pages/BishopdaleValley';
import { Timeline } from './pages/Timeline';
import { Gallery } from './pages/Gallery';
import { Maps } from './pages/Maps';
import { Contact } from './pages/Contact';
import { Editor } from './pages/Editor';
import { Admin } from './pages/Admin';
import { PuckPage } from './pages/PuckPage';
import { PageManager } from './pages/PageManager';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-texture">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bishopdale-valley" element={<BishopdaleValley />} />
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
