import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Compontes/Navbar';
import News from './Compontes/News';

export default class App extends Component {
  render() {
    const pageSize = 5;
    const country = "us";
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} category="general" country={country} />} />
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} category="health" country={country} />} />
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} category="science" country={country} />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} category="sports" country={country} />} />
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} category="business" country={country} />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} category="entertainment" country={country} />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} category="technology" country={country} />} />
        </Routes>
      </Router>
    );
  }
}
