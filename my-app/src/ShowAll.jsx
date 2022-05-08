import React from 'react'
import {
    Figure,
} from "react-bootstrap";
import CardItem from './CardItem';

export default function ShowAll({ posts, handleDetail, handleVote, vote, handleUnVote }) {

    return (
        <>
            <section className="artwork-section">
                <div className="container">
                    <div className="section-header">
                        <h3 className="header-title" name="explore-scroll">ALL POSTS</h3>
                        <div className="header-content">
                            <ul className="filter-group d-flex flex-wrap align-items-center">
                                <li className="li day-filter">
                                    <div className="select-wrapper arrow-blue">
                                        <select className="form-select" aria-label="Day select">
                                            <option selected>Real Time</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <div className="row justify-content-center g-4">
                            {posts.map((post, index) => (
                                <CardItem item={post} vote={vote} handleDetail={() => handleDetail(post)} key={index}>
                                    <div className="nft-content">
                                        <div className="content-title">
                                            <h5 onClick={() => handleDetail(post)} style={{ color: "#fff", cursor: "pointer" }}>{post.title}</h5>
                                        </div>
                                        <div className="nft-status d-flex flex-wrap justify-content-between align-items-center ">
                                            <span className="nft-view" style={{ cursor: 'pointer' }} onClick={() => handleDetail(post)}><i className="icofont-eye-alt" /> View</span>
                                            <div className="nft-stock">{index < 9 ? 0 + "" + (index + 1) : (index + 1)}</div>
                                        </div>
                                        <div className="price-like d-flex justify-content-between align-items-center">
                                            <div className="nft-price d-flex align-items-center">
                                                <span className="currency-img">

                                                    <Figure.Image
                                                        width={60}
                                                        height={60}
                                                        src="https://www.bellclubueh.net/wp-content/uploads/2020/04/LOGO_BELL_White.svg"
                                                        className={post.title}
                                                    />
                                                </span>
                                            </div>
                                            {vote.includes(post.id) ? (
                                                <button
                                                    className="nft-bidvoted" onClick={() => {
                                                        handleUnVote(post.id)
                                                    }}>Unvote</button>) :
                                                (
                                                    <button
                                                        className="nft-bid"
                                                        onClick={() => {
                                                            handleVote(post.id)
                                                        }}>Vote</button>)
                                            }
                                        </div>
                                    </div>
                                </CardItem>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
