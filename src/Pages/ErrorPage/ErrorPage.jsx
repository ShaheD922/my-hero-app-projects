import { Link, Navigate } from "react-router";
import notFount from "../../assets/error-404.png";

const ErrorPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img src={notFount} alt="" />
      </div>
      <div>
        <p className="text-5xl font-bold py-5">Oops, page not found!</p>
        <p className="text-xl text-gray-600 pb-5">
          The page you are looking for is not available.
        </p>
        <Link
          onClick={() => Navigate(-1)}
          className="bg-violet-700 hover:bg-violet-600 text-white font-bold py-2.5 px-4 rounded shadow-lg transition duration-200  justify-between"
        >
          Go Back!
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;