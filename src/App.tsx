import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import DocumentDetail from "./components/DocumentDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="documents/">
          <Route path=":documentId" element={<DocumentDetail />} />
          <Route path=":documentId/artboard/:artboardId" />
          <Route path="" />
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to="/documents/e981971c-ff57-46dc-a932-a60dc1804992"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
