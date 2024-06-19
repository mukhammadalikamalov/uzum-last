import { Route, Routes } from "react-router-dom";
import Home from "../App";
import BagPage from "../pages/Bag.Page/Bag.Page";
import Favorites from "../pages/Favorites.Page/Favorites";
import ProductPage from "../pages/Product.Page/ProductPage";
import Header2 from "../pages/header2";

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/bag" element={<BagPage />} />
      <Route path="/header2" element={<Header2 />} />

    </Routes>
  );
}
export default RoutesPage;