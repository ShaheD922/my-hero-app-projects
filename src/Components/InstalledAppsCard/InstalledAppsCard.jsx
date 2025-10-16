import downloadImg from "../../assets/icon-downloads.png";
import ratingImg from "../../assets/icon-ratings.png";

const InstalledAppsCard = ({ filterDt, handleRemoveDtFromLocalStor }) => {
  const formatDownloads = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };

  return (
    <div className="border border-gray-300 card card-side bg-base-100 shadow-sm flex flex-col sm:flex-row items-center justify-center rounded-2xl hover:scale-105 transition ease-in-out p-3 sm:p-0">
      <figure>
        <img
          className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl p-2 sm:p-3 object-cover"
          src={filterDt.image}
          alt=""
        />
      </figure>

      <div className="card-body grid grid-cols-1 sm:grid-cols-2 items-center w-full">
        <div className="text-center sm:text-start">
          <h2 className="card-title text-base sm:text-lg md:text-xl">
            {filterDt.title}
          </h2>

          <div className="flex flex-wrap gap-4 sm:gap-7 justify-center sm:justify-start">
            <div className="mt-2 sm:mt-4 flex gap-2 items-center justify-center">
              <img className="w-4" src={downloadImg} alt="" />
              <p>{formatDownloads(filterDt.downloads)}</p>
            </div>

            <div className="mt-2 sm:mt-4 flex gap-2 items-center justify-center">
              <img className="w-4" src={ratingImg} alt="" />
              <p>{formatDownloads(filterDt.downloads)}</p>
            </div>

            <div className="mt-2 sm:mt-4 flex gap-2 items-center justify-center">
              <p>{formatDownloads(filterDt.size)} MB</p>
            </div>
          </div>
        </div>

        <div className="justify-self-center sm:justify-self-end mt-4 sm:mt-0">
          <button
            onClick={() => handleRemoveDtFromLocalStor(filterDt.id)}
            className="btn btn-active btn-success text-white btn-sm sm:btn-md"
          >
            Uninstall
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstalledAppsCard;
//