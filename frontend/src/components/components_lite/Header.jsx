import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white py-16">
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="font-medium text-lg text-gray-800 flex items-center justify-center gap-2 ">
            <span className="text-[#6B3AC2] text-2xl">
              {" "}
              <PiBuildingOfficeBold />
            </span>{" "}
            Find Jobs That Value Your Skills
          </span>

          <h2 className="text-5xl font-bold">
            Find Your
            <span className="text-[#FA4F09]"> Dream Job </span>
            With Ease
          </h2>
          <p>
            Discover thousands of job opportunities from top companies.
            Start your career <br />
            journey today with our advanced job matching platform.
          </p>
          <div className="flex w-full max-w-xl mx-auto bg-white rounded-full text-gray-800 px-4 py-2 items-center gap-2">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full"
            />
            <Button onClick={searchjobHandler} className=" rounded-r-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;