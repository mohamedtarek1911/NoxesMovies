import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Item/Item";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import SeaItem from "../SeaItem/SeaItem";
import ReactPaginate from "react-paginate";
import { current } from "@reduxjs/toolkit";
export default function Movies() {
  let { keyword } = useSelector((state) => {
    return state.Search;
  });
  // console.log(keyword);
  const [Movies, setMovies] = useState([]);
  const [Terms, setTerms] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [SearchContent, setSearchContent] = useState("");

  // let Terms = [];
  let movie = "movie";
  // let currentPage = 1;
  let handlePageClick = async (data) => {
    // console.log(data.selected);
    let number = await data.selected;
    setCurrentPage(number + 1);
    setTimeout(() => {
      ScrollUp();
    }, 1000);
    // console.log(currentPage);
  };

  let getTrending = async (Page) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=b743efb40c92290c908bcb203dd71625&page=${Page}`
    );
    // console.log(data.result);
    setMovies(data.results);
  };
  // console.log(Movies);

  const ScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let searchTerms = async (term) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=b743efb40c92290c908bcb203dd71625&query=${term}`
    );
    setMovies(data.results);
    setTerms(data.results);
    // console.log(data.results);
  };
  // let searchTerms = async () => {
  //   let { data } = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=b743efb40c92290c908bcb203dd71625&query=hell`
  //   );

  //   setTerms(data.results);
  //   console.log(data.results);
  //   // Terms = data.results;
  // };
  // console.log(Terms);
  console.log(CurrentPage);
  // console.log(Terms);

  // console.log(data.json());

  useEffect(() => {
    searchTerms(SearchContent);
    getTrending(CurrentPage);
    handlePageClick();
  }, [keyword, CurrentPage + 1, SearchContent]);
  // console.log(Terms);
  let handleSeraching = (e) => {
    // console.log(e.target.value);
    setSearchContent(e.target.value);
  };
  return (
    <>
      {Movies.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="serching-bar position-relative ">
                <input
                  type="text"
                  className="form-control bg-transparent text-white "
                  placeholder="Searching Here ......."
                  onChange={handleSeraching}
                />
                <span className="searching_icon position-absolute ">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
              {Terms.length > 0
                ? Terms.map((val, index) => {
                    return (
                      <SeaItem media={"movie"} data={val} key={index}></SeaItem>
                    );
                  })
                : ""}
              {Movies.length > 0 ? (
                Movies.map((val, index) => {
                  return <Item data={val} key={index}></Item>;
                })
              ) : (
                <Loading />
              )}
            </div>
          </div>
          <ReactPaginate
            previousLabel={"< previous"}
            nextLabel={" next >"}
            breakLabel={"..."}
            onPageChange={handlePageClick}
            pageCount={999}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center align-content-center align-items-center text-center">
            <Loading />
          </div>
        </>
      )}
    </>
  );
}
