import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DocumentDetail from "./components/DocumentDetail";
import SampleComponent from "./components/SampleComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<SampleComponent />} />
        <Route path="documents/">
          <Route path=":documentId" element={<DocumentDetail />} />
          <Route path=":documentId/artboard/:artboardId" />
          <Route path="" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
