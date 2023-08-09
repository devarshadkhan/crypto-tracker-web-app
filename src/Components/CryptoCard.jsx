import React, { useEffect, useState } from "react";
import { CoinList } from "../APIConfig/API";
import axios from "axios";
import {
  Badge,
  Box,
  CardContent,
  Container,
  Grid,
  Tooltip,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles((theme) => ({
  bag2: {
    // border: "1px solid red",
    padding: "1rem",
    borderRadius: "15px",
    margin: "1rem",
  },
  bag1: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    "& img": {
      marginLeft: "auto",
    },
    "& h3": {
      fontSize: "10px",
      fontWeight: "lighter",
    },
    "& h6": {
      margin: "0",
      fontSize: "1rem",
      fontWeight: 700,
    },
    "& span": {
      padding: "2px 5px",
      borderRadius: "5px",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: "12px",
    },
  },
  card: {
    padding: "0 !important",
  },
  bag3: {
    "& ul": { padding: "0 !important" },
    "& ul li": { listStyle: "none" },
    "& ul li span": {
      fontSize: "14px",
    },
  },
  tooltip: {
    // background: "#000",
    color: "#fff",
    borderRadius: 10,
    borderRadius: 0,
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
    zIndex: 1,
    padding: 10,
    fontSize: "15px",
    maxWidth: 350,
  },
}));

const CryptoCard = () => {
  const classes = useStyles();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // const [searchmatch,setSearchMatch] = useState([])
  const [filter, setFilter] = useState("");
  // console.log("lllllllll",filter)
  const Fetch_Coin = async () => {
    const Data = await axios.get(CoinList());
    // console.log("Data", Data.data);
    setCoin(Data.data);
    setLoading(true);
    clearTimeout(setSearch);
  };
  const handleChange = (event,val) => {
    console.log(val?.props.value);
    setFilter(val?.props.value);
  };
  useEffect(() => {
    setTimeout(() => {
      Fetch_Coin();
    }, 2000);
  }, []);



 const filterOrSearchData=(filterKey,searchKey)=>{
  return coin?.filter((value,index)=>{
    return filterKey? value?.name.includes(filterKey)||filterKey==="All":value?.name.toLowerCase().includes(searchKey)
  })
 }

// const filterOrSearchData=(filterKey,searchKey)=>{
//   if(filterKey){
//     return coin?.filter((value,index)=>{
//       return value?.name.includes(filterKey)||filterKey==="All"
//     })
//   }else{
//     return coin?.filter((value,index)=>{
//       return value?.name.toLowerCase().includes(searchKey)
//     })
//   }
//  }

  // const searchCoin  = (text) => {
  //   let match  = coin.filter((c) => {
  //     const regex = new RegExp(`${text}`,"gi");
  //     return c.name.match(regex) || c.symbol.match(regex)
  //   })
  //   setCoin(match)
  // }
  return (
    <>
      {!loading ? (
        <>
          {" "}
          <Box sx={{ display:  "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <Box>
          <Box sx={{display: "flex", justifyContent: "space-between",alignItems:"center" }}>
          <TextField
            id="outlined-basic"
            value={search}
            fullWidth
            placeholder="Search For a Crypto Currency.."
            label="Search For a Crypto Currency.."
            variant="outlined"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={filter}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
             <MenuItem value={"All"}>
                 All
                </MenuItem>
              {coin?.map((v,i) => (
                <MenuItem key={i} value={v?.name} >
                  {v?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              maxWidth="xl"
            >
              {
                filterOrSearchData(filter,search)?.map((e,i) => {
                  const profit = e?.price_change_percentage_24h > 0;
                  return (
                    <>
                      <Grid key={i} item lg={3} md={6} sm={12}>
                        <Box
                          className={classes.bag2}
                          style={{
                            border: profit
                              ? "1px solid green"
                              : "1px solid red",
                          }}
                        >
                          <CardContent className={classes.card}>
                            <Box key={e.id} className={classes.bag1}>
                              <h3>{e.market_cap_rank}</h3>
                              <Tooltip
                                title={e.name}
                                arrow
                                placement="top"
                                classes={{
                                  tooltip: classes.tooltip,
                                  // arrow: classes.arrow
                                }}
                              >
                                <h6>{`${e.name?.substring(0, 10)}`}</h6>
                              </Tooltip>

                              <span
                                style={{
                                  color: profit ? "green" : "red",
                                  background: profit
                                    ? "rgba(0, 255, 0,0.3)"
                                    : "rgba(255, 0, 0,0.2)",
                                }}
                              >
                                {e.symbol}
                              </span>
                              <img src={e.image} alt="" width="15%" />
                            </Box>
                            <Box className={classes.bag3}>
                              <ul>
                                <li>
                                  <span>
                                    Price $:{" "}
                                    {numberWithCommas(
                                      e.current_price.toFixed(2)
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    1h:{" "}
                                    <span
                                      style={{
                                        color: profit ? "green" : "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {profit && "+"}
                                      {e.market_cap_change_percentage_24h?.toFixed(
                                        2
                                      )}
                                      %{/* {e.price_change_24h}% */}
                                    </span>
                                  </span>
                                </li>
                                <li>
                                  <p>
                                    24h:{" "}
                                    <span
                                      style={{
                                        color: profit ? "green" : "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {" "}
                                      {profit && "+"}
                                      {e.price_change_percentage_24h?.toFixed(
                                        1
                                      )}
                                      %
                                    </span>
                                  </p>
                                </li>
                                <li>
                                  <p>
                                    7d:
                                    <span
                                      style={{
                                        color: profit ? "green" : "red",
                                        fontWeight: "bold",
                                      }}
                                      // >    {e.market_cap_change_percentage_24h?.toFixed(3)}%</span>
                                    >
                                      {" "}
                                      {e.market_cap_change_percentage_24h}%
                                    </span>
                                  </p>
                                </li>
                                <li>
                                  {/* <p>  <span>24h Volume: {e.market_cap_change_24h}</span></p> */}
                                  <p>
                                    {" "}
                                    <span>
                                      24h Volume:{" "}
                                      {numberWithCommas(
                                        e.total_volume?.toFixed(2)
                                      )}
                                    </span>
                                  </p>
                                </li>
                                <li>
                                  <span>
                                    Mkt Cap: {profit}{" "}
                                    {numberWithCommas(
                                      e.market_cap.toString().slice(0, -6)
                                    )}
                                    M
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    Circulating Supply: {profit}{" "}
                                    {numberWithCommas(
                                      e.circulating_supply
                                        .toString()
                                        .slice(0, -6)
                                    )}
                                    M
                                  </span>
                                </li>
                              </ul>
                            </Box>
                          </CardContent>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default CryptoCard;

//  {/* .filter((coin) => coin.name.toLowerCase().includes(search)) */}