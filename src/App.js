import style from './App.module.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FilmsSearch from "./components/FilmsSearch/FilmsSearch";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import FilmDetail from "./components/FilmDetail/FilmDetail";
import store from "./redux/store";
import {Provider} from "react-redux";


function App() {
  return (
      <HashRouter>
          <Provider store={store}>
              <div className={style.App}>
                  <Header />
                  <Routes>
                      <Route path='/' element={<FilmsSearch />}/>
                      <Route path='/*' element={<FilmDetail />}/>
                  </Routes>
                  <Footer />
              </div>
          </Provider>
      </HashRouter>
  );
}

export default App;
