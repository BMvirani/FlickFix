"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [isActive, setisActive] = useState("home");
  const path = usePathname();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState();

  const MoviesData = useSelector((store) => store.movies);

  useEffect(() => {
    if (session) {
      setUserInfo(session.user);
    }
  }, [session]);

  useEffect(() => {
    if (path.includes("explore")) {
      setisActive("explore");
    } else if (path.includes("login")) {
      setisActive("login");
    } else {
      setisActive("home");
    }
  }, [path]);

  const [navbarVisible, setNavbarVisible] = useState(false);

  const handleScroll = () => {
    // Change the value to determine when the navbar becomes visible
    if (window.scrollY > 50) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [signOutLoader, setSignOutLoader] = useState(false);
  const handleSignout = async () => {
    setSignOutLoader(true);
    const res = await signOut();
    if (res) {
      setSignOutLoader(false);
      redirect("/login");
    }
  };
  const [rootLoader, setRootLoader] = useState(true);
  useEffect(() => {
    if (MoviesData) {
      setRootLoader(false);
    }
  }, []);
  return (
    <>
      {!rootLoader && (
        <div className={`navbar-wrap ${navbarVisible ? "navbar-visible" : ""}`}>
          <div className="">
            <nav className="nav-wrap">
              <div className="logo-box">
                <Link href={"/"}>
                  {" "}
                  <Image
                    src={"/assets/logo.png"}
                    alt="logo"
                    width={200}
                    height={50}
                  />
                </Link>
              </div>
              <div className="nav-item-box">
                <ul>
                  <li className={`item ${isActive == "home" && "active"}`}>
                    <Link href="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className={`item ${isActive == "explore" && "active"}`}>
                    <Link href="/explore" className="nav-link">
                      Search
                    </Link>{" "}
                  </li>
                  {!userInfo ? (
                    <>
                      {" "}
                      <li className={`item ${isActive == "login" && "active"}`}>
                        <Link href="/login" className="nav-link">
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="user-avatar-box" onClick={toggleSidebar}>
                        <Image
                          src={userInfo?.userImageThumb}
                          height={35}
                          width={35}
                          className="user-avatar"
                        />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <button onClick={toggleSidebar} className="close-btn">
              <CloseOutlined />
            </button>
            <div className="sidebar-info">
              <Image
                src={userInfo?.userImageThumb}
                height={35}
                width={35}
                className="user-avatar-sidebar"
              />
              <p>{userInfo?.name}</p>
              <p>{userInfo?.email}</p>
            </div>
            {/* <div className="signout-btn-box"> */}
            <button className="signout-btn-box" onClick={handleSignout}>
              {!signOutLoader ? (
                "Signout"
              ) : (
                <>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 25,
                          color: "#fff",
                        }}
                        spin
                      />
                    }
                  />
                </>
              )}
            </button>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
