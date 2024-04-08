import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//mui
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
//Hooks
import { useEffect, useState } from "react";
//external libraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  Typography: {
    fontFamily: ["alex"],
  },
});
let cancelAxios = null;

function App() {
  let [locale, setLocale] = useState("ar");
  //event handlers
  function handleLanguageClick() {
    if (locale == "ar") {
      i18n.changeLanguage("ar");
      setLocale("en");
      moment.locale("ar");
    } else {
      i18n.changeLanguage("en");
      setLocale("ar");
      moment.locale("en");
    }
    setDateAndTime(moment().format("LLLL"));
  }

  const { t, i18n } = useTranslation();

  let [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    img: "",
  });
  const [dateAndTime, setDateAndTime] = useState("");

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  useEffect(() => {
    setDateAndTime(moment().format("LLLL"));
    // Make a request for a user with a given ID
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.9539&lon=35.9106&appid=acc0feb88684664dac5ad88c8d4643a0",
        {
          cancelToken: new axios.CancelToken((cancel) => {
            cancelAxios = cancel;
          }),
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data.weather[0].icon);

        console.log(response.data.main.temp_min);
        const deg = (response.data.main.temp - 273.15).toFixed();
        const responseDescription = response.data.weather[0].description;
        const responseMin = (response.data.main.temp_min - 273.15).toFixed();
        const responseMax = (response.data.main.temp_max - 273.15).toFixed();
        const responseImg = response.data.weather[0].icon;
        console.log(responseImg);
        setTemp({
          number: deg,
          description: responseDescription,
          min: responseMin,
          max: responseMax,
          img: responseImg,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("cancelling");
      cancelAxios();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* start content container  */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* start card */}
            <div
              style={{
                backgroundColor: "#007aff",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 10px 10px rgb(0 0 0 / 50%)",
                width: "100%",
              }}
            >
              {/* content */}
              <div>
                {/* start city and time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    direction: "rtl",
                    justifyContent: "right",
                    marginRight: "20px",
                  }}
                >
                  <Typography variant="h3" style={{ fontFamily: "alex" }}>
                    {t("Amman")}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ fontFamily: "alex", marginRight: "20px" }}
                  >
                    {dateAndTime}
                  </Typography>
                </div>
                {/* city and time */}
                <hr />
                {/* container of degree + cloud icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    direction: "rtl",
                  }}
                >
                  {/* degree number and description */}

                  <div>
                    {/* temperature */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h1"
                        style={{ fontFamily: "alex", textAlign: "right" }}
                      >
                        {temp.number}
                      </Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${temp.img}@2x.png`}
                        alt=""
                      />

                      {/* ===temp image === */}
                    </div>
                    {/* ===temperature=== */}

                    <Typography variant="h6" style={{ fontFamily: "alex" }}>
                      {t(temp.description)}
                    </Typography>
                    {/* start min and max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {" "}
                        {t("min")} : {temp.min}
                      </h5>
                      <h5>|</h5>
                      <h5>
                        {" "}
                        {t("max")} : {temp.max}
                      </h5>
                    </div>
                    {/* ==== min and max ==== */}
                  </div>
                  {/* end degree number and description */}
                  <CloudIcon style={{ fontSize: "200px" }} />
                </div>
                {/* ==== container of degree + cloud icon ==== */}
              </div>
              {/* end content */}
            </div>
            {/* end card */}
            {/* start language  */}
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handleLanguageClick}
              >
                {locale == "ar" ? "العربية" : "English"}
              </Button>
            </div>
            {/* end language  */}
          </div>
          {/* end content container  */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
