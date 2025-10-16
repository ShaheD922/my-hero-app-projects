import InstalledAppCard from "../../Components/InstalledAppCard/InstalledAppCard";
import { useContext, useEffect, useState } from "react";
import { getStoredApp, removeFromStoreDb } from "../../Utility/addToLocalStor";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingContext } from "../../CustomContext/LoadingContext";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const InstalledApps = () => {
  const [data, setData] = useState([]);
  const [filteredDt, setFilteredDt] = useState([]);
  const [sort, setSort] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const storedAppIds = getStoredApp().map(Number);
    setData(storedAppIds);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const res = await axios.get("/appsData.json");
        const appsData = res.data;

        if (Array.isArray(appsData)) {
          const filteredData = appsData.filter((app) => data.includes(app.id));
          setFilteredDt(filteredData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (data.length > 0) {
      fetchData();
    }
  }, [data]);

  // Remove Data from local storage
  const handleRemoveDtFromLocalStor = (id) => {
    removeFromStoreDb(id);
    setFilteredDt((prev) => prev.filter((rmId) => rmId.id !== id));
    Swal.fire({
      title: "App Uninstalled Successfully.",
      icon: "success",
      draggable: true,
    });
  };

  // Handle sort
  const handleSortingFunctionality = (sortType) => {
    setSort(sortType);
    if (sortType === "lowToHigh") {
      const sortedBySize = [...filteredDt].sort((a, b) => a.size - b.size);
      setFilteredDt(sortedBySize);
    } else if (sortType === "highToLow") {
      const sortedBySize = [...filteredDt].sort((a, b) => b.size - a.size);
      setFilteredDt(sortedBySize);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="pb-20">
          <h1 className="text-6xl font-bold">Your Installed Apps</h1>
          <p className="text-gray-600 py-5 text-xl">
            Explore All Trending Apps on the Market developed by us
          </p>
          <div className="text-right pb-10">
            <select defaultValue="Sort" className="select">
              <option>Sort By</option>
              <option onClick={() => handleSortingFunctionality("lowToHigh")}>
                Low to High
              </option>

              <option onClick={() => handleSortingFunctionality("highToLow")}>
                High to Low
              </option>
            </select>
          </div>

          <div>
            <InstalledAppCard
              filteredDt={filteredDt}
              handleRemoveDtFromLocalStor={handleRemoveDtFromLocalStor}
            />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default InstalledApps;
