  import { useEffect, useState } from "react";
  import "../styles/ListingDetails.scss";
  import { useNavigate, useParams } from "react-router-dom";
  import { facilities } from "../data";

  import "react-date-range/dist/styles.css";
  import "react-date-range/dist/theme/default.css";
  import { DateRange } from "react-date-range";
  import Loader from "../components/Loader";
  import Navbar from "../components/Navbar";
  import { useSelector } from "react-redux";
  import Footer from "../components/Footer"

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }


  const ListingDetails = () => {
    const [loading, setLoading] = useState(true);

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    const getListingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/properties/${listingId}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setListing(data);
        setLoading(false);
      } catch (err) {
        console.log("Fetch Listing Details Failed", err.message);
      }
    };

    useEffect(() => {
      getListingDetails();
    }, []);

    console.log(listing)

    const [dateRange, setDateRange] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    const handleSelect = (ranges) => {
      setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); 

    const customerId = useSelector((state) => state?.user?._id)

    const navigate = useNavigate()

    const handleSubmit = async () => {
      try {
        const bookingForm = {
          customerId,
          listingId,
          hostId: listing.creator._id,
          startDate: dateRange[0].startDate.toDateString(),
          endDate: dateRange[0].endDate.toDateString(),
          totalPrice: listing.price * dayCount,
        }

        const orderResponse = await fetch("http://localhost:3001/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bookingForm.totalPrice }),
      });
      const orderData = await orderResponse.json();
      console.log("Order Data:", orderData);
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Failed to load Razorpay SDK. Check your internet connection.");
        return;
      }

      const options = {
        key: "rzp_test_RaOEUWHBBpsKml",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Trip Booking",
        description: "Booking Payment",
        order_id: orderData.order_id,
        handler: async function (response) {
          console.log(response,"res")
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          const verifyResponse = await fetch("http://localhost:3001/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("✅ Payment successful!");

          const bookingResponse = await fetch("http://localhost:3001/bookings/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingForm),
          });

          if (bookingResponse.ok) {
            alert("Booking confirmed!");
          } else {
            alert("Payment succeeded but booking could not be created.");
          }
            navigate(`/${customerId}/trips`);
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Divyanshu Pal",
          email: "divyanshu.jpg@gmail.com",
          contact: "9919277383",
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      } catch (err) {
        console.log("Submit Booking Failed.", err.message)
      }
    }

    return loading ? (
      <Loader />
    ) : (
      <>
        <Navbar />
        
        <div className="listing-details">
          <div className="title">
            <h1>{listing.title}</h1>
            <div></div>
          </div>

          <div className="photos">
            {listing.listingPhotoPaths?.map((item) => (
              <img
                src={`http://localhost:3001/${item.replace("public", "")}`}
                alt="error loading"
              />
            ))}
          </div>

          <h2>
            {listing.type} in {listing.city}, {listing.province},{" "}
            {listing.country}
          </h2>
          <p>
            {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
            {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
          </p>
          <hr />

          <div className="profile">
            <img
              src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="error loading"
            />
            <h3>
              Hosted by {listing.creator.firstName} {listing.creator.lastName}
            </h3>
          </div>
          <hr />

          <h3>Description</h3>
          <p>{listing.description}</p>
          <hr />

          <h3>{listing.highlight}</h3>
          <p>{listing.highlightDesc}</p>
          <hr />

          <div className="booking">
            <div>
              <h2>What this place offers?</h2>
              <div className="amenities">
                {listing.amenities[0].split(",").map((item, index) => (
                  <div className="facility" key={index}>
                    <div className="facility_icon">
                      {
                        facilities.find((facility) => facility.name === item)
                          ?.icon
                      }
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>How long do you want to stay?</h2>
              <div className="date-range-calendar">
                <DateRange ranges={dateRange} onChange={handleSelect} />
                {dayCount > 1 ? (
                  <h2>
                    ${listing.price} x {dayCount} nights
                  </h2>
                ) : (
                  <h2>
                    ${listing.price} x {dayCount} night
                  </h2>
                )}

                <h2>Total price: ${listing.price * dayCount}</h2>
                <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                <p>End Date: {dateRange[0].endDate.toDateString()}</p>

                <button className="button" type="submit" onClick={handleSubmit}>
                  BOOKING
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  };

  export default ListingDetails;
