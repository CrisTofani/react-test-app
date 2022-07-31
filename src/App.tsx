import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import DocumentDetail from "./components/DocumentDetail";
import DocumentsHome from "./components/DocumentsHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="documents/">
          <Route path=":documentId" element={<DocumentDetail />} />
          <Route path="" element={<DocumentsHome />} />
        </Route>
        <Route path="*" element={<Navigate to="/documents" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
