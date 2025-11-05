import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { Buildings } from './pages/Buildings';
import { Timeline } from './pages/Timeline';
import { Photos } from './pages/Photos';
import { Maps } from './pages/Maps';
import { About } from './pages/About';
import { Contribute } from './pages/Contribute';
import { Editor } from './pages/Editor';
import { PuckPage } from './pages/PuckPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-texture">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/page/:slug" element={<PuckPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
