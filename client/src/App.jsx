import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Service from './pages/Service'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Header from './components/Header'


export default function App() {
  return (
    <Router >
      <div classname="pt-20">
      <Header/>
      </div>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/service" element={<Service />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}
