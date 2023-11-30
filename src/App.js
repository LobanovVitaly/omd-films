import logo from './logo.svg';
import style from './App.module.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FilmsSearch from "./components/FilmsSearch/FilmsSearch";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FilmDetail from "./components/FilmDetail/FilmDetail";

function App() {
  return (
      <BrowserRouter>
          <div className={style.App}>
              <Header />

                  <Routes>
                      <Route path='/' element={<FilmsSearch />}/>
                      <Route path='/*' element={<FilmDetail />}/>
                  </Routes>
              <Footer />
          </div>
      </BrowserRouter>
  );
}

export default App;
