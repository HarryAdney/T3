import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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
            <Route path="/" element={<PuckPage slug="home" />} />
            <Route path="/bishopdale-valley" element={<PuckPage slug="bishopdale-valley" />} />
            <Route path="/four-townships" element={<PuckPage slug="four-townships" />} />
            <Route path="/timeline" element={<PuckPage slug="timeline" />} />
            <Route path="/maps" element={<PuckPage slug="maps" />} />
            <Route path="/gallery" element={<PuckPage slug="gallery" />} />
            <Route path="/contact" element={<PuckPage slug="contact" />} />
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
