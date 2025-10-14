import { Link, useNavigate } from "react-router";
import errorApp from "../../assets/App-Error.png";

const ErrorAppPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center">
        <img src={errorApp} alt="" />
      </div>
      <div>
        <p className="text-5xl font-bold py-5">OPPS!! APP NOT FOUND</p>
        <p className="text-xl text-gray-600 pb-5">
          The App you are requesting is not found on our system. please try
          another apps
        </p>
        <Link
          onClick={() => navigate(-1)}
          className="bg-violet-700 hover:bg-violet-600 text-white font-bold py- px-4 rounded shadow-lg transition duration-200  justify-between"
        >
          Go Back!
        </Link>
      </div>
    </>
  );
};

export default ErrorAppPage;