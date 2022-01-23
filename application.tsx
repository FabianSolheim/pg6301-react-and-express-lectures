import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return <div>
    <h1>Movie database</h1>

    <ul>
      <li><Link to={"/movies"}>List movies</Link></li>
      <li><Link to={"/movies/new"}>Add movie</Link></li>
    </ul>
  </div>;
}

function Movies() {
  return null;
}

export function Application({ who }: { who: string }) {
  return <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/movies/*"} element={<Movies />} />
      <Route path={"/*"} element={<h1>Not found</h1>} />
    </Routes>
  </BrowserRouter>;
}
