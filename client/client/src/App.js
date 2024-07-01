import {Route,Routes} from 'react-router-dom';
import Home from './pages/home';
import Blog from './pages/blog';
import Add from './pages/Add';
import Edit from './pages/edit';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Delete from './pages/delete';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="Add" element={<Add />} />
      <Route path="edit/:id" element={<Edit />} />
      <Route path="delete/:id" element={<Delete />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
