import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(5);
 const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      if (search === "") return;

      const imagesPerPage = 30;
      const key = "22486130-7148b94e2a7f510734e909294";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentpage}`;

      const response = await fetch(url);
      const result = await response.json();
setIsNextButtonVisible(true)
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calculateTotalPages);

      setImages(result.hits);
    };

    fetchApi();
  }, [search, currentpage]);

  const backPage = () => {
    const newCurrentPage = currentpage - 1;
    if (newCurrentPage === 0) return;

    setCurrentPage(newCurrentPage);
  };

  const nextPage = () => {
    const newCurrentPage = currentpage + 1;
    if (newCurrentPage > totalPages) return;

    setCurrentPage(newCurrentPage);
  };

  const jumbotron = document.querySelector(".jumbotron");
  jumbotron?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Pixabay Finder</p>

        <Form setSearch={setSearch} />
      </div>

      <div className="row justify-content-center">
        <ImagesList images={images} />

        {currentpage === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={backPage}
          >
            &laquo; Back{" "}
          </button>
        )}

        {currentpage !== totalPages  && isNextButtonVisible  &&  (
          <button type="button" className="bbtn btn-info" onClick={nextPage}>
            Next &raquo;
          </button>
        ) }
      </div>
    </div>
  );
}

export default App;
