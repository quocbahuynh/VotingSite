import React, { useState, useEffect, Suspense } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import instance from "./axios";
import axios from "axios";
import Nav from "./Nav";
import DetailItem from "./DetailItem";
import CarouselPre from "./CarouselPre";
import { ErrorBoundary } from "react-error-boundary";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { reactLocalStorage } from "reactjs-localstorage";
import Cookies from "js-cookie";
import Icofont from "react-icofont";
import Footer from "./Footer";
import ErrorFallback from "./ErrorFallback";
import diffInMs from "./timesup";

const Ranking = React.lazy(() => import("./Ranking"));

const ShowAll = React.lazy(() => import("./ShowAll"));

function App() {
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [postChoose, setPostChoose] = useState({}); // set to get data from post choosed
  const [showDetail, setShowDetail] = useState(false); // set to show detail of post
  const [vote, setVote] = useState([]);
  const [postData, setPostData] = useState([]);
  const [showFullData, setShowFullData] = useState([]);
  const [showFullRanking, setShowFullRanking] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [showRule, setShowRule] = useState(false);

  const handleVote = async (itemid) => {
    if (diffInMs > 0) {
      const data = {
        postId: itemid,
      };
      if (login) {
        // CHECK VOTED
        const checkDuplicate = vote.includes(itemid);
        const checkLength = vote.length < 3;

        if (!checkDuplicate && checkLength) {
          localStorage.setItem("countDown", true);
          setShowCountDown(true);
          // VOTE
          const submitVote = await instance.post("/api/userVoting", data, {
            withCredentials: true,
            headers: {
              authorization:
                "Bearer " + localStorage.getItem("token_votebellclub"),
            },
          });
          setVote([...vote, itemid]);

          if (!submitVote.data.success) {
            setVote(vote.filter((item) => item !== itemid));
            alert("Thire is something wrong! Contact admin....");
          }
        } else {
          alert("You can vote only 3 times");
        }
      } else {
        setModalShow(true);
      }
    } else {
      alert("Time is up!");
    }
  };

  const handleUnVote = async (itemid) => {
    if (diffInMs > 0) {
      const data = {
        postId: itemid,
      };

      localStorage.setItem("countDown", true);
      setShowCountDown(true);

      const submitUnVote = await instance.post("/api/userUnVoting", data, {
        withCredentials: true,
        headers: {
          authorization: "Bearer " + localStorage.getItem("token_votebellclub"),
        },
      });

      if (submitUnVote.data.success) {
        setVote(vote.filter((item) => item !== itemid));
      } else {
        alert("Thire is something wrong! Contact admin....");
      }
    } else {
      alert("Time is up!");
    }
  };

  const handleDetail = (item) => {
    setPostChoose(item);
    setShowDetail(true);
  };

  const onSuccess = async (res) => {
    const bodyObject = {
      authId: res.tokenId,
    };
    try {
      const response = await instance.post("/api/google-login", bodyObject, {
        withCredentials: true,
      });

      console.log("AFTER LOGIN ", response);

      if (response.data.success) {
        localStorage.setItem("token_votebellclub", response.data.token);
        setLogin(true);
        setModalShow(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onFailed = (res) => {
    console.log(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/api/posts");
      setPostData(res.data);
      setShowFullData(res.data);
    };
    fetchData();
  }, [setPostData, showCountDown]);

  useEffect(() => {
    if (localStorage.getItem("token_votebellclub")) {
      setLogin(true);
    }

    if (localStorage.getItem("countDown") === "true") {
      setShowCountDown(true);
    }
  }, []);

  // get status
  useEffect(() => {
    if (login) {
      const fetchData = async () => {
        const res = await instance.get("/api/profile", {
          withCredentials: true,
          headers: {
            authorization:
              "Bearer " + localStorage.getItem("token_votebellclub"),
          },
        });
        setProfile(res.data);
        setVote(res.data.voted);
      };
      fetchData();
    }
  }, [login, setVote]);
  return (
    <>
      <Nav
        loginStatus={login}
        setLogin={setLogin}
        showLogin={setModalShow}
        name={profile.name || "Unknown"}
        dataSearch={postData}
        handleDetail={handleDetail}
      />

      <CarouselPre setShowRule={setShowRule} />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Ranking
            rankingStatus={showFullRanking}
            posts={postData}
            handleDetail={handleDetail}
          />
          <div
            className="text-center mt-5"
            onClick={() =>
              showFullRanking
                ? setShowFullRanking(false)
                : setShowFullRanking(true)
            }
          >
            <p className="default-btn move-right">
              <span>{showFullRanking ? "Hide Rank" : "Go To Rank"}</span>
            </p>
          </div>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ShowAll
            posts={showFullData}
            handleDetail={handleDetail}
            handleVote={handleVote}
            handleUnVote={handleUnVote}
            vote={vote}
          />
        </Suspense>
      </ErrorBoundary>

      <LoginRequest
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSuccess={onSuccess}
        onFailed={onFailed}
      />

      <DetailItem
        onShow={setShowDetail}
        dataPost={postChoose}
        showStatus={showDetail}
        vote={vote}
        handleVote={handleVote}
        handleUnVote={handleUnVote}
      />

      <CountDown onCountDown={showCountDown} setCountDown={setShowCountDown} />

      <Rule show={showRule} onHide={() => setShowRule(false)} />

      <Footer />
    </>
  );
}

function LoginRequest(props) {
  const { show, onHide, onSuccess, onFailed } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login in with Google"
          onSuccess={onSuccess}
          onFailure={onFailed}
          cookiePolicy={"single_host_origin"}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CountDown({ onCountDown, setCountDown }) {
  return (
    <>
      <Modal show={onCountDown} backdrop="static" keyboard={false}>
        <Modal.Body className="text-center" style={{ borderRadius: "17px" }}>
          <p>Continue voting after a few seconds</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CountdownCircleTimer
              isPlaying
              duration={Math.floor(Math.random() * 19)}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => {
                if (remainingTime === 0) {
                  localStorage.removeItem("countDown");
                  setCountDown(false);
                  //window.location.reload(false);
                }
                return remainingTime;
              }}
            </CountdownCircleTimer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function Rule(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="terms-section">
          <div className="container">
            <div
              className="terms-content"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <h4>ROUND 2: INFOTACTIC</h4>
              <ul style={{ lineHeight: "30px" }}>
                <br />
                <p>
                  ON-AIR: (20/04/2022 - 03/05/2022)
                  <br />
                  Top 40 Teams of ROUND 1: UPGEAR will create and design:
                </p>
                <li>
                  - 01 INFOGRAPHIC - Concise Gamified Education in 01 of these
                  subjects: History, Geography, Chemistry and Physics
                </li>
                <li>
                  - 01 VIDEO PRESENTATION - Present and elaborate further on the
                  team's Gamified Educational model for better understanding
                </li>
              </ul>
              <br />
              <h4>VOTING: (06/05/2022 - 10/05/2022)</h4>
              <br />
              <p>Online voting grading rules:</p>
              <b>INFOGRAPHIC: </b>
              <ul
                style={{ marginLeft: "9px", color: "red", lineHeight: "30px" }}
              >
                <li>- 01 Vote = 01 Point</li>
              </ul>
              <b>VIDEO PRESENTATION: </b>
              <ul
                style={{ marginLeft: "9px", color: "red", lineHeight: "30px" }}
              >
                <li>- 03 Views = 01 Point</li>
                <li>- 01 Like = 01 Point</li>
              </ul>
              <br />
              <p>Brief instructions:</p>

              <ul
                style={{
                  marginLeft: "9px",
                  lineHeight: "30px",
                  listStyleType: "circle",
                }}
              >
                <li>
                  Access the Voting Platform, log in via Gmail, and click on
                  your favourite team(s).
                </li>
                <li>Click “Vote” to vote for your favourite INFOGRAPHIC(s).</li>
                <li>
                  Click “Video Presentation” to access Youtube and vote for your
                  favourite VIDEO PRESENTATION(s).
                </li>
              </ul>
              <br />
              <b>
                <span style={{ color: "red" }}>NOTE</span>
                <ul>
                  <li>- Each account could only vote ONCE for each team.</li>
                  <li>- Each account could vote for a MAXIMUM of 03 teams.</li>
                </ul>
              </b>
              <br />
            </div>
          </div>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
