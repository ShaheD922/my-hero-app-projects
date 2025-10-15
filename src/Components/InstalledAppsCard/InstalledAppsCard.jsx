import downloadImg from "../../assets/icon-downloads.png";
import ratingImg from "../../assets/icon-ratings.png";

const InstalledAppsCard = ({ filterDt, handleRemoveDtFromLocalStor }) => {
  // SHow download number in understandable way start
  const formatDownloads = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };
  // SHow download number in understandable way End
  return (
    <div className="card card-side bg-base-100 shadow-sm flex items-center justify-center">
      <figure>
        <img
          className="h-28 w-28 rounded-2xl p-3"
          src={filterDt.image}
          alt="Movie"
        />
      </figure>

      <div className="card-body grid grid-cols-2 items-center">
        <div className="text-start ">
          <h2 className="card-title"> {filterDt.title} </h2>
          <div className="flex gap-7">
            <div className="mt-4 flex gap-2  items-center justify-center">
              <img className="w-4" src={downloadImg} alt="" />{" "}
              <p>{formatDownloads(filterDt.downloads)} </p>
            </div>

            <div className="mt-4 flex gap-2 items-center justify-center">
              <img className="w-4" src={ratingImg} alt="" />{" "}
              <p>{formatDownloads(filterDt.downloads)} </p>
            </div>

            <div className="mt-4 flex gap-2 items-center justify-center">
              <p>{formatDownloads(filterDt.size)} MB </p>
            </div>
          </div>
        </div>
        <div className="justify-self-end-safe">
          <button
            onClick={() => handleRemoveDtFromLocalStor(filterDt.id)}
            className="btn btn-success text-white"
          >
            Uninstall
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstalledAppsCard;