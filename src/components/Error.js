import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  const { data, status, statusText } = err;
  console.log(err);

  return (
    <div>
      <center>
        <h1>Oops!!</h1>
        <h2>Something went wrong...</h2>
        {/* <h2>{data}</h2> */}
        <h2>
          Error {status}: Page {statusText}
        </h2>
      </center>
    </div>
  );
};

export default Error;
