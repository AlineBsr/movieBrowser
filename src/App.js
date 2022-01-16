import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav      from "./components/Nav";        // nav home - disc - profil 
import Home     from "./components/Home";       // tendances (movie / tv ...?)
import Lists    from "./components/Lists";      // liste vidéos
import Details  from "./components/Details";    // details vidéo
import Profil   from "./components/Profil";
import Footer   from "./components/Footer";

function App() {

return (  
  <>
  <Router>
    < Routes>
      <Route  exact path="/" 
        element={ <Home lang="en-US" /> } 
      /> 
      <Route  exact path="/profil"
        element={ <Profil username="TEST" /> }
      />
      <Route  exact path="/movie" 
        element={ <Lists type="movie" lang="en-US"  /> }
      />
      <Route  exact path="/movie/:id" 
        element={ <Details type="movie" lang="en-US" /> }
      />
      <Route  exact path="/tv" 
        element={ <Lists  type="tv"  lang="en-US"/> } 
      />
      <Route  exact path="/tv/:id" 
        element={ <Details type="tv" lang="en-US" /> } 
      /> 
    </Routes>
    
    <Nav />
    <Footer />
      
  </Router>
  </>
  );
}

export default App;