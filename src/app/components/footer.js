import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { play_store_svg } from "../../../helper/svgs/svg";
const Footer = () => {
  const [rootLoader, setRootLoader] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setRootLoader(false);
    },[3000])
  }, []);
  return (
    <>
      {!rootLoader && (
        <div className="footer-wraper">
          <footer>
            <div className="">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="footer-logo-box">
                    <Image
                      src={"/assets/logo.png"}
                      alt="logo"
                      width={200}
                      height={50}
                    />
                    <p>
                      Watch the latest movie trailers and get the inside scoop
                      on upcoming blockbusters. Keep the popcorn ready!
                    </p>
                    <p> 2024 FlickFix by Bhargav Virani</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="quick-link-box">
                    <h4>Quick links</h4>
                    <ul>
                      <li>
                        <Link href={"/"}> Contact Us</Link>
                      </li>
                      <li>
                        <Link href={"/login"}>Login</Link>
                      </li>
                      <li>
                        <Link href={"/"}> Terms of Use </Link>
                      </li>
                      <li>
                        <Link href={"/"}> Get Started</Link>
                      </li>
                      <li>
                        <Link href={"/"}> Privacy Policy </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="social-wrapper-box">
                    <div className="social-links-box">
                      <h4>Social Media Links</h4>
                      <ul>
                        <li>
                          <Link href={"/"} className="social-icon">
                            <i class="bi bi-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"} className="social-icon">
                            <i class="bi bi-youtube"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"} className="social-icon">
                            <i class="bi bi-envelope-fill"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="social-box">
                      <Link
                        href={"/"}
                        className="main-btn btn-icon btn-white app-store-btn"
                      >
                        <i class="bi bi-apple"></i>App Store
                      </Link>
                      <Link
                        href={"/"}
                        className="main-btn btn-icon btn-white play-store-btn"
                      >
                        <i> {play_store_svg}</i>
                        Google play
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
