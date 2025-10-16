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
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      {loading ? (
        <LoadingPage />                                                                                          
      ) : (
        <>
          <div className="bg-base-100 shadow-sm rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 p-5">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                className="w-52 sm:w-64 md:w-80 lg:w-96 rounded-2xl object-cover hover:scale-105 transition ease-in-out cursor-pointer"
                src={specificData.image}
                alt="App"
              />
            </div>

            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {specificData.title}
              </h2>
              <p className="text-gray-500 text-base sm:text-lg">
                Developed by:{" "}
                <span className="text-purple-600 font-semibold">
                  {specificData.companyName}
                </span>
              </p>

              <div className="divider"></div>
              {/* review */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
                <div className="border border-gray-300 rounded-xl py-4 shadow text-center bg-white hover:scale-105 transition ease-in-out cursor-pointer">
                  <img
                    src={downloadImg}
                    alt=""
                    className="mx-auto w-7 sm:w-10 mb-1"
                  />
                  <h4 className="font-semibold">Downloads</h4>
                  <p className="font-bold text-3xl sm:text-4xl">
                    {formatDownloads(specificData.downloads)}
                  </p>
                </div>

                <div className="border border-gray-300 rounded-xl py-4 shadow text-center bg-white hover:scale-105 transition ease-in-out cursor-pointer">
                  <img
                    src={ratingImg}
                    alt=""
                    className="mx-auto w-7 sm:w-10 mb-1"
                  />
                  <h4 className="font-semibold">Average Ratings</h4>
                  <p className="font-bold text-3xl sm:text-4xl">
                    {formatDownloads(specificData.ratingAvg)}
                  </p>
                </div>

                <div className="border border-gray-300 rounded-xl py-4 shadow text-center bg-white hover:scale-105 transition ease-in-out cursor-pointer">
                  <img
                    src={reviewsImg}
                    alt=""
                    className="mx-auto w-7 sm:w-10 mb-1"
                  />
                  <h4 className="font-semibold">Reviews</h4>
                  <p className="font-bold text-3xl sm:text-4xl">
                    {formatDownloads(specificData.reviews)}
                  </p>
                </div>
              </div>
              {/* install btn */}
              <div className="mt-8 flex justify-center md:justify-start">
                <button
                  disabled={install}
                  onClick={() => handleInstall()}
                  className="btn btn-success text-white font-bold text-lg sm:text-xl w-full sm:w-auto"
                >
                  {install
                    ? "Installed"
                    : `Install Now (${specificData.size} MB)`}
                </button>
              </div>
            </div>
          </div>

          <div className="divider my-12"></div>

          {/* Chart Section */}

          <ReactCharts ratings={ratings} description={description} />
        </>
      )}

    </div>
  );
};

export default AppDetails;
