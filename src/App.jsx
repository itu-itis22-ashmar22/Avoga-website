import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero, CustomerReviews, Footer, PopularProducts, Services, Subscribe, SuperQuality } from './sections';
import Nav from './components/Nav';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductColorDetailPage from './pages/ProductColorDetailPage';

const App = () => (
  <Router>
    <main className="relative">
      <Nav />
      <Routes>
        <Route path="/" element={
          <>
            <section className="xl:padding-l wide:padding-r padding-b">
              <Hero />
            </section>
             
            <section className="padding">
              <PopularProducts />
            </section>

            <section className="padding">
              <SuperQuality />
            </section>

            <section className="padding-x py-10">
              <Services />
            </section>

            <section className="bg-pale-blue padding">
              <CustomerReviews />
            </section>

            <section className="padding-x sm:py-32 py-16 w-full">
              <Subscribe />
            </section>

            <section className="bg-black padding-x padding-t pb-8">
              <Footer />
            </section>
          </>
        } />
        <Route path="/collection" element={<ProductsPage />} />
        <Route path="/product/:productName" element={<ProductDetailPage />} />
        <Route path="/product/:productName/color/:colorName" element={<ProductColorDetailPage />} />
      </Routes>
    </main>
  </Router>
);

export default App;
