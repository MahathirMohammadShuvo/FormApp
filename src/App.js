import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import CreatePage from './page/CreatePage';
import ViewPage from './page/ViewPage'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/list_page" element={<ViewPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
