import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import downloadImg from "../../assets/icon-downloads.png";
import ratingImg from "../../assets/icon-ratings.png";
import reviewsImg from "../../assets/icon-review.png";
import ReactCharts from "../ReactCharts/ReactCharts";
import { addToStoreDb, getStoredApp } from "../../Utility/addToLocalStor";
import Swal from "sweetalert2";
import { LoadingContext } from "../../CustomContext/LoadingContext";
import LoadingPage from "../LoadingPage/LoadingPage";

const AppDetails = () => {
  const [specificData, setSpecificData] = useState([]);
  const [install, setInstall] = useState(false);
  const [lsData, setLsData] = useState([]);
  const { id } = useParams();

  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const allData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/appsData.json");
        const data = res.data;
        if (Array.isArray(data)) {
          const app = data.find((item) => item.id === Number(id));
          setSpecificData(app);
          setLoading(false);
        } else {
          console.log("Invalid!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    allData();
  }, [id]);

  // Install Button 

  
  useEffect(() => {
    const firstFunc = async () => {
      setLsData(...lsData, getStoredApp());
      if (getStoredApp().includes(id)) {
        setInstall(true);
      }
    };
    firstFunc();
  }, [id]);

  const handleInstall = () => {
    setLsData(...lsData, getStoredApp());

    if (getStoredApp().includes(id)) {
      Swal.fire({
        title: "How many times do you want to install?",
        icon: "success",
        draggable: true,
      });
      setInstall(true);
    } else {
      addToStoreDb(id);
      setInstall(true);
      Swal.fire({
        title: "App Installed Successfully",
        icon: "success",
        draggable: true,
      });
    }
  };

  const formatDownloads = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };

  const ratings = specificData.ratings;
  const description = specificData.description;

  return (
    <div >
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="card card-side  ">
            <figure>
              <img className="w-96" src={specificData.image} alt="Movie" />
            </figure>
            <div className="card-body  ">
              <div>
                <h2 className="card-title text-3xl pb-3">
                  {" "}
                  {specificData.title}{" "}
                </h2>
                <p className="text-start text-xl text-gray-500">
                  Developed by :{" "}
                  <span className="text-purple-600 font-semibold">
                    {specificData.companyName}
                  </span>
                </p>
                <div className="divider"></div>
              </div>

              <div className="stats  lg:stats-horizontal shadow   grid grid-cols-3">
                <div className="stat">
                  <div className="stat-title mx-auto">
                    <img src={downloadImg} alt="" />
                  </div>
                  <div className="text-center">Downloads</div>
                  <div className="stat-desc font-bold text-5xl text-center">
                    {formatDownloads(specificData.downloads)}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title mx-auto">
                    <img src={ratingImg} alt="" />
                  </div>
                  <div className="text-center">Average Ratings</div>
                  <div className="stat-desc font-bold text-5xl text-center">
                    {formatDownloads(specificData.ratingAvg)}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title mx-auto">
                    <img src={reviewsImg} alt="" />
                  </div>
                  <div className="text-center">Downloads</div>
                  <div className="stat-desc font-bold text-5xl text-center">
                    {formatDownloads(specificData.reviews)}
                  </div>
                </div>
              </div>
              <div className="card-actions mt-7">
                <button
                  disabled={install}
                  onClick={() => handleInstall()}
                  className="btn btn-success text-white text-xl font-bold"
                >
                  {install
                    ? "Installed"
                    : `Install Now (${specificData.size} MB) `}
                </button>
              </div>
            </div>
          </div>
          <div className="divider py-24"></div>
          <ReactCharts ratings={ratings} description={description} />
        </>
      )}
    </div>
  );
};

export default AppDetails;
