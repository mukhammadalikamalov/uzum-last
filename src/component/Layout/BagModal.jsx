import { Link } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";
import DeleteIcon from '@mui/icons-material/Delete'; // Import the DeleteIcon from Material-UI
import Button from '@mui/material/Button'; // Import Button from Material-UI

const BagModal = ({ item }) => {
  const { bagGoods } = GetGoods();

  const myProd = bagGoods && bagGoods.find((good) => +good.prod_id === +item.id);

  return (
    <>
      {item && (
        <Link to={`/product?id=${item.id}`} style={{ textDecoration: 'none' }}>
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}> {/* Added display flex to the container */}
            <img style={{ width: "90px", height: "90px" }} src={item.media[0]} alt="" />
            <div style={{ marginLeft: "10px" }}> {/* Added margin-left for spacing */}
              <p>{item.title.slice(0, 25)}...</p>
              <span>
                {item.price -
                  Math.floor((item.price * item.salePercentage) / 100)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                  " "}
                руб X {myProd && myProd.num}
              </span>
            </div>
            {/* Use the DeleteIcon component from Material-UI */}
            <DeleteIcon style={{ width: "24px", height: "24px", marginTop: '20px', color:" black" }} /> 
          </div>
        </Link>
      )}
   
    </>
  );
};
export default BagModal;
