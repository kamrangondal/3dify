import React, { useRef } from "react";
import NavBar from "../components/NavBar";
import { Typography } from "@mui/material";
import Footer from "../components/Footer";

export default function Home() {
  const bodyRef = useRef(null);

  const handleScrollToBody = (sectionId) => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  

  return (
    <div>
      <NavBar handleScrollToBody={handleScrollToBody} />
      <div ref={bodyRef}>
        <div id="section1" 
          style={{
            height: "calc(100vh )",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#C5CCCD",
          }}
        >
          <div style={{ maxWidth: 950, width: "100%", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ color: "#4682B4", pr: 15 }}
                >
                  Best-in-Class Virtual Product Previews for Ecommerce
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "#68717E", pr: 15 }}
                >
                  Drive engagement and conversion with real-scale augmented
                  reality experiences that empower shoppers to view products in
                  and around their homes.
                </Typography>
              </div>
              <img
                src="https://media.giphy.com/media/y3qWNR4Y4YhxrJcGFG/giphy.gif"
                alt="GIF"
                style={{ width: 400, height: 300 }}
              />
            </div>
          </div>
        </div>

        <div id="section2" 
          style={{
            height: "calc(100vh )",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EEEEF7",
          }}
        >
          <div style={{ maxWidth: 950, width: "100%", padding: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#4682B4", pr: 15 }}
              >
                Inspire Confidence in Your Customers’ Purchases
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ textAlign: "center", color: "#68717E", pr: 15 }}
              >
                Over 50% of eCommerce is now conducted on mobile devices, but
                small screens make it difficult to gain a strong sense of the
                dimensions, qualities and presence of your products. As a
                result, 86% of mobile shopping carts are abandoned and over 30%
                of purchases are returned - 22% of which is due to the product
                looking different in person.
              </Typography>
              <img
                src="https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif"
                alt="GIF"
                style={{ width: 400, height: 300, marginTop: 20 }}
              />
            </div>
          </div>
        </div>

        <div id="section3" 
          style={{
            height: "calc(100vh )",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#C5CCCD",
          }}
        >
          <div style={{ maxWidth: 1250, width: "100%", padding: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: "#4682B4" }}>
                3dify is the Best In Class Solution for AR Product Previews
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ textAlign: "center", color: "#68717E" }}
              >
                We work with our customers to develop products that suit real
                needs and solve real problems
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "100%", padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: "#4682B4", pr: 15 }}
                      >
                        No code to write, no apps to install
                      </Typography>
                      <br />
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ color: "#68717E", pr: 15 }}
                      >
                        3dify is a web service that plugs into your existing
                        site built on any eCommerce platform. Mobile optimized
                        for iOS and Android. Bridged from desktop-to-mobile.
                      </Typography>
                    </div>
                    <img
                      src="https://media.giphy.com/media/y3qWNR4Y4YhxrJcGFG/giphy.gif"
                      alt="GIF"
                      style={{ width: 400, height: 300 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="section4">
        <Footer />
        </div>
      </div>


      
    </div>
  );
}
