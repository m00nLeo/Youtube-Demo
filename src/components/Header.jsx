import { useState } from "react";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`videos/${text}`); // (?) // điều hướng tới path khác
  };

  return (
    <header className="-m-b-3 w-full flex py-3 px-4 text-xl border-b border-zinc-600">
      <Link to="/" className="flex items-center">
        <AiFillYoutube className="text-red-600 text-5xl rounded" />
        <h1 className="ml-1 flex w-full font-bold -tracking-widest text-2xl">
          YouTube <span className="text-xs font-normal tracking-wide">VN</span>{" "}
        </h1>
      </Link>
      <form
        action=""
        className="w-fit flex justify-center items-center inset-0 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          className="w-1/2 px-4 outline-none bg-inherit border-[0.2px] border-slate-500 rounded-l-3xl text-gray-50"
          type="text"
          placeholder="Search"
          value={text}
          id=""
          onChange={handleChange}
        />
        <button className="bg-zinc-600 h-7 px-4 border-[0.2px] border-slate-500 rounded-r-3xl">
          <AiOutlineSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
