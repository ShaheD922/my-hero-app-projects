import ApplicationCard from "../../Components/ApplicationCard/ApplicationCard";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../CustomContext/LoadingContext";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const AllApps = () => {
  const [allData, setAllData] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [search, setSearch] = useState("");
  const term = search.trim().toLocaleLowerCase();
  const searchedApps = term
    ? allData.filter((app) => app.title.toLocaleLowerCase().includes(term))
    : allData;

  useEffect(() => {
    const allData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("appsData.json");
        const data = res.data;
        if (Array.isArray(data)) {
          setAllData(data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    allData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (

        <div>
          <h1 className="text-6xl font-bold py-5">Our All Applications</h1>
          <p className="text-gray-500">
            Explore All Apps on the Market developed by us. We code for Millions
          </p>


          <div className="w-full flex justify-between text-black pt-7">
            <p className="font-semibold text-xl">
              ({searchedApps.length}) Apps Found
            </p>


            {/* search start */}
            <div className="join">
              <div>
                <label className="input validator join-item">
                  <input

                    defaultValue={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    placeholder="App Name"
                    required
                  />
                </label>


              </div>

              <button className="btn btn-accent text-white join-item">
                Search
              </button>

            </div>

          </div>

          {searchedApps.length === 0 ? (
            <h1 className="text-7xl font-bold text-gray-500 py-20">
              No Apps Found!
            </h1>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1   gap-4 pb-10 p-10">
              {searchedApps?.map((data) => (
                <ApplicationCard data={data} key={data.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllApps;
//