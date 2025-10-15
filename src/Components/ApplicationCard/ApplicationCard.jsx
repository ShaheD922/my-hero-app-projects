import { Link } from "react-router";
import downloadImg from "../../assets/icon-downloads.png";
import reviewdImg from "../../assets/icon-ratings.png";

const ApplicationCard = ({ data }) => {
 
  const formatDownloads = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };
  
  return (
    <Link
      to={`/allApps/${data?.id}`}
      className="border-2 border-gray-300 rounded-4xl card bg-base-100 w-full shadow-sm cursor-pointer hover:scale-105 transition ease-in-out "
    >
      <figure className="bg-base-100 p-4">
        <img
          className="h-64 object-cover rounded-2xl border-gray-500 "
          src={data?.image}
          alt={data?.title}
        />
      </figure>
      <div className="card-body  ">
        <h2 className="card-title"> {data?.title} </h2>
        <div className="card-actions flex justify-between">
          <div className="badge badge-outline border-0 lg:p-4 badge-success bg-green-200 flex items-center justify-center">
            <img className=" w-4 h-4" src={downloadImg} alt="" />
            {formatDownloads(data?.downloads)}
          </div>
          <div className="badge badge-soft lg:p-4 badge-warning bg-amber-200 flex items-center justify-center ">
            <img className="w-4 h-4" src={reviewdImg} alt="" />
            {formatDownloads(data?.ratingAvg)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationCard;
//