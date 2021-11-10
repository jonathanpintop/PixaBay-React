import React, { useState } from "react";
import Error from "./Error";

const Form = ({ setSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);

  const searchImages = (e) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    setSearch(searchValue);
  };

  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search Images,  eg: 
            Football or Coffe"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Search"
          />
        </div>
      </div>

      {error ? <Error message="Add a Searching word" /> : null}
    </form>
  );
};

export default Form;
