import React from 'react'
import { Figure } from 'react-bootstrap'
import { useTimer } from "reactjs-countdown-hook";
import { scroller } from 'react-scroll'

export default function CarouselPre({ setShowRule }) {

    let today = new Date();
    const startDate = '2022-05-11';
    const endDate = today;
    const diffInMs = (new Date(startDate) - new Date(endDate)) / 1000;


    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer(diffInMs);

    // Somewhere else, even another file
    const scrollToSection = () => {
        scroller.scrollTo("explore-scroll", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };


    return (
        <section className="banner-section">
            <div className="container">
                <div className="banner-wrapper">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <div className="banner-content">
                                <h1 className="mb-3 neon" style={{ fontFamily: "'Encode Sans', sans-serif", fontWeight: 800 }}>RACE FOR KNOWLEDGE 2022
                                </h1>
                                <h2 className="small-title gradient-text-pink" style={{ fontFamily: "ETH" }}>
                                    META-KONQUEST
                                </h2>
                                <p className="mb-5">RACE FOR KNOWLEDGE is an English academic competition hosted by BELL Club. Making a comeback on a nationwide scale, RACE FOR KNOWLEDGE 2022: META-KONQUEST will be the pioneer to exploit Gamification in Metaverse, especially Gamified Education.</p>
                                <div className="banner-btns d-flex flex-wrap">
                                    <div className="default-btn move-top" onClick={() => scrollToSection()}><span>EXPLORE</span> </div>
                                    <div className="default-btn move-right" onClick={() => setShowRule(true)}><span>RULES</span> </div>
                                </div>
                            </div>
                        </div >
                        <div className="col-lg-5">
                            <div className="swiper banner-slider">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="nft-item">
                                            <div className="nft-inner" style={{
                                                background: 'hsl(239deg 80% 10%)',
                                                borderRadius: '17px'
                                            }}>
                                                {/* nft top part */}
                                                <div className="nft-item-top d-flex justify-content-between align-items-center">
                                                    <div className="author-part">
                                                        <ul className="author-list d-flex">
                                                            <li className="single-author d-flex align-items-center">
                                                                <a href="author.html" className="veryfied">
                                                                    <img src="/assets/images/avata.png" alt="Bell Club" /></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* nft-bottom part */}
                                                <div className="nft-item-bottom">
                                                    <div className="nft-thumb">
                                                        <img src="/assets/images/banner.png" alt="nft-img" />
                                                        <span className="badge rounded-pill position-absolute"><i className="icofont-heart" />
                                                            1.3k</span>
                                                    </div>
                                                    <center>
                                                        <div className="item-details-countdown">
                                                            <ul className="item-countdown-list count-down" >
                                                                <li>
                                                                    <span className="days">{days}</span><span className="count-txt">Days</span>
                                                                </li>
                                                                <li>
                                                                    <span className="hours">{hours}</span><span className="count-txt">Hours</span>
                                                                </li>
                                                                <li>
                                                                    <span className="minutes">{minutes}</span><span className="count-txt">Mins</span>
                                                                </li>
                                                                <li>
                                                                    <span className="seconds">{Math.floor(seconds)}</span><span className="count-txt">Secs</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </center>
                                                    <div className="nft-content">
                                                        <div className="nft-status d-flex flex-wrap justify-content-between align-items-center ">
                                                            <span className="nft-view"><a href="activity.html"><i className="icofont-eye-alt" /> View
                                                            </a> </span>
                                                            <div className="nft-stock"> Rank</div>
                                                        </div>
                                                        <div className="price-like d-flex justify-content-between align-items-center">
                                                            <div className="nft-price d-flex align-items-center">
                                                                <span className="currency-img">

                                                                    <Figure.Image
                                                                        width={60}
                                                                        height={60}
                                                                        src="https://www.bellclubueh.net/wp-content/uploads/2020/04/LOGO_BELL_White.svg"
                                                                        className='img-curr'
                                                                    />
                                                                </span>
                                                            </div>
                                                            <button className="nft-bid">VOTE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </section >

    )
}
