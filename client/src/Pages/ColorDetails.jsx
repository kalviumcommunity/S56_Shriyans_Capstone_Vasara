import React, { useEffect, useState } from "react";
import "./ColorDetails.css";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Tshirt from "../Components/Tshirt";
import Jeans from "../Components/Jeans";
import ColorCard from "../Components/ColorCard";
const ColorDetails = () => {
  // console.log(API_URI)
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [loader, setLoader] = useState(true);
  const [Similardata, setSimilarData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      axios.get(`${API_URI}/colordetail/${id}`),
      axios.get(`${API_URI}/colors`)
    ])
    .then(([colorDetailRes, similarColorsRes]) => {
      if (isMounted) {
        setData(colorDetailRes.data);
        setColor1(colorDetailRes.data.color1.code);
        setColor2(colorDetailRes.data.color2.code);

        setSimilarData(similarColorsRes.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      if (isMounted) {
        setLoader(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);
  
  let handleChange = () => {
    let temp = color1;
    setColor1(color2);
    setColor2(temp);
  };

  let filteredDatas = Similardata.filter(
    (item) =>
      item.color1.code === color1 ||
      item.color2.code === color1 ||
      item.color2.code === color2 ||
      item.color1.code === color2
  );
  let filteredData = filteredDatas.slice(1, 4);
  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          <div className="colorDetailsCont">
            <div className="displayCombination">
              <div className="displayPolo">
                <Tshirt color={color1} />
              </div>
              <div className="displayJeans">
                <Jeans color={color2} />
              </div>
            </div>
            <div className="combinationDetails">
              <h1>{data.name}</h1>
              <div className="combiDetail">
                <label htmlFor="">Color 1 </label>{" "}
                <span>{data.color1.name}</span>
              </div>
              <div className="combiDetail">
                <label htmlFor="">Color 2 </label>{" "}
                <span>{data.color2.name}</span>
              </div>
              <div className="combiDetail">
                <label htmlFor="">Prefered Climate </label>{" "}
                <span>{data.climate}</span>
              </div>
              <div className="combiDetail">
                <label htmlFor="">Prefered Mood </label>{" "}
                <span>{data.mood}</span>
              </div>
              <div className="combiDetail">
                <label htmlFor="">Style </label> <span>{data.style}</span>
              </div>
              <div className="tooltip" onClick={handleChange}>
                <div className="icon">
                  <FlipCameraAndroidIcon />
                </div>
                <div className="tooltiptext">Reverse Color</div>
              </div>
            </div>
          </div>
          {filteredData.length > 0 ? (
            <div className="similar-colors">
              <h1>Similar Colors</h1>
              <div className="similar-colors-cont">
                {filteredData.map((item) => (
                  <ColorCard key={item.id} props={item} />
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ColorDetails;
