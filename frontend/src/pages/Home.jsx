import './home.css';
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import logo from "../assets/icons/ello-logo.svg";
import { Link } from "react-router-dom";
import { GET_BOOK_DATA } from '../data/query';
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10rem",
  marginBottom: "10rem",
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [readingList, setReadingList] = useState([]);
  const [visibleBooksCount, setVisibleBooksCount] = useState(24);
  const forTeacherRef = useRef(null);
  const forReadingRef = useRef(null);
  const menuRef = useRef(null)
  const { data, loading, error } = useQuery(GET_BOOK_DATA);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let myList = localStorage.getItem("readingList")

    if (myList) {
      let x = JSON.parse(myList)
      console.log("list from local storage", x);
      setReadingList(x)
    }
  }, [])
  

  const addToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, book]);
    localStorage.setItem("readingList", JSON.stringify([...readingList, book]))
    toast.success("Book successfully added");
  };

  // Remove book by title
  const removeFromReadingList = (title) => {
    console.log("Book title", title)
    setReadingList((prevList) => prevList.filter((book) => book.title !== title));
    localStorage.setItem("readingList", JSON.stringify(readingList.filter((book) => book.title !== title)))
  };

  const scrollReadList = () => {
    forReadingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAllBooks = () => {
    forTeacherRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreBooks = () => {
    setVisibleBooksCount((prevCount) => prevCount + 24);
  };

  const filteredBooks = data?.books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const toggleMenu = () => {
    let indx = Array.from(menuRef.current.classList).indexOf("invisible")
    if(indx < 1){
      let cls = Array.from(menuRef.current.classList)
      cls.push(" invisible")
      menuRef.current.classList = Array.from(cls)
    }else {
    menuRef.current.classList = Array.from(menuRef.current.classList).filter(item => item !== "invisible")
    }
  }

  return (
    <>
      <ToastContainer />
      <main className="w-full">
        <section className="hero_section m-0 p-4">
          <div className='absolute top-0 right-0 bottom-0 left-0'>
          </div>
          <nav className="sticky top-0 mb-4 gap-4">
            <div className="mx-auto flex flex-col md:flex-row sm:justify-start md:justify-between sm:items-start md:items-center py-2 px-4 md:px-10">
              <Link to="/" className="text-sm sm:text-xl sm:font-bold">
                <img src={logo} alt="Logo" className="h-10 sm:h-14 w-12 sm:w-16" />
              </Link>
                <li className='menu absolute right-0 top-4 md:hidden list-none' onClick={toggleMenu}>
                    <span className='text-3xl w-12'>&#9776;</span>
                </li>
              <ul ref={menuRef} className="flex invisible sm:visible flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center sm:items-center md:items-center text-[22px] font-semibold w-[100%] md:w-1/2 justify-center md:justify-evenly">
                <li>
                  <Link onClick={scrollToAllBooks} className="mt-4 sm:mt-0 text-sm sm:text-xl text-[#335C6E] hover:text-[#53C2C2]">
                    For Teachers
                  </Link>
                </li>
                <li>
                  <Link onClick={scrollReadList} className="mt-2 sm:mt-0 text-sm sm:text-xl text-[#335C6E] hover:text-[#53C2C2]">
                    Reading List
                  </Link>
                </li>
                <li>
                  <Link to="#account" className="text-[#53C2C2] hover:text-teal-700">
                    <button className="text-sm mt-4 sm:mt-0 sm:text-xl border border-[#53C2C2] rounded-full px-6 py-1 sm:px-8 sm:py-4">My Account</button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <section className="flex flex-col md:flex-row items-center w-full px-4 md:px-52">
            <div className="py-16 space-y-4 text-center md:text-left">
              <h1 className="font-bold text-4xl md:text-6xl leading-snug text-[#335C6E]">
                Confident, <br />
                Independent Reading
              </h1>
              <p className="text-xl md:text-2xl font-light mt-4 leading-relaxed">
                Ello is your child’s read-along companion who <br /> listens, teaches, and transforms them into an <br />
                enthusiastic reader. For Kindergarten to 3rd Grade.
              </p>
              <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2">
                <button className="w-full border rounded-full px-3 py-3 bg-[#53C2C2] text-xl md:text-2xl text-white font-medium hover:bg-teal-700">Try Ello</button>
                <div className="flex items-center justify-center w-full">
                  <span className="text-[#28B8B8] font-semibold text-[14px]">7-day free trial</span>
                </div>
                <div className="w-full h-40 p-8 flex flex-col items-center bg-[#EAEAE6] rounded-md mt-4">
                  <p className="text-xl font-bold text-[#9DA9AA]">Reviews.<span className=" font-semibold text-[10px]">io</span></p>
                  <div className="flex justify-center gap-2 w-full">
                    <FaStar className="h-5 w-5 fill-[#FAAD00]" />
                    <FaStar className="h-5 w-5 fill-[#FAAD00]" />
                    <FaStar className="h-5 w-5 fill-[#FAAD00]" />
                    <FaStar className="h-5 w-5 fill-[#FAAD00]" />
                    <FaStarHalf className="h-5 w-5 fill-[#FAAD00]" />
                  </div>
                  <a href="#" className="font-sm text-[12px] text-[#9DA9AA]">48.2 based on 946 reviews</a>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section ref={forReadingRef} className="w-full items-center mt-12 md:mt-[150px] px-4 md:px-56 rounded-md">
          <div className="mb-8">
            <p className="text-[#335C6E] font-semibold text-3xl">Reading List</p>
          </div>
          <div className="mt-4">
            {readingList.length === 0 ? (
              <p className="text-lg text-[#F76434] font-medium">No books in the list yet</p>
            ) : (
              readingList.map((book, i) => (
                <div key={i} className="flex items-center p-4 border rounded-md shadow-md mt-2 bg-[#FFFF] justify-between">
                  <div className="flex items-center">
                    <img src={'/src/' + book.coverPhotoURL} alt={book.title} className="w-12 h-12 object-cover" />
                    <p className="text-lg ml-4">{book.title}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => removeFromReadingList(book.title)} className="bg-[#F76434] text-white px-4 py-2 rounded-md hover:bg-red-700">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section ref={forTeacherRef} className="w-full items-center mt-12 md:mt-[100px] px-4 md:px-56">
          <div className="flex flex-col md:flex-row items-center w-full mb-8 md:justify-between">
            <p className="text-[#335C6E] font-semibold text-3xl mb-4 md:mb-0">All Books</p>
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search for books by title"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border focus:border-[#335C6E] rounded-md"
              />
            </div>
          </div>
          {loading && <SyncLoader color="#FAAD00" cssOverride={override} />}
          {error && <h2>Something went wrong</h2>}
          {filteredBooks.length === 0 && !loading && !error && (
            <p className="text-lg text-[#F76434] font-medium">No search results found</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {filteredBooks.slice(0, visibleBooksCount).map((book, i) => (
              <div key={i} className="p-2 border rounded-md shadow-md">
                               <img src={'/src/' + book.coverPhotoURL} alt={book.title} className="w-full h-32.5 object-cover" />
                <h3 className="font-semibold mt-2 text-[#2C3232] text-[16px]">{book.title}</h3>
                <p className="text-[#9DA9AA] text-sm font-thin">by {book.author}</p>
                <button onClick={() => addToReadingList(book)} className="mt-2 bg-[#53C2C2] text-sm text-white px-1.5 py-2 rounded-md hover:bg-teal-700">Add to Reading List</button>
              </div>
            ))}
          </div>
          {filteredBooks.length > visibleBooksCount && (
            <div className="flex justify-center mt-[34px] mb-[24px]">
              <button onClick={loadMoreBooks} className="text-[#53C2C2] px-4 py-2 rounded-md hover:text-[#28B8B8]">Load More</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
