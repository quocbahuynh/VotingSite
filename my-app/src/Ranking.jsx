import React from 'react'
import RankingItemPre from './RankingItemPre'
import RankingItemFull from './RankingItemFull'

export default function Ranking({ posts, rankingStatus, handleDetail }) {
    const rankingList = posts.sort((a, b) => a.voted < b.voted ? 1 : -1);

    return rankingStatus ? (
        <>
            <section className="ranking-section mt-5">
                <div className="container">
                    <div className="section-header">
                        <div className="nft-filter d-flex flex-wrap align-items-center justify-content-center  gap-15">
                            <h3 style={{ color: "#fff" }}>FULL RANKING 2022</h3>
                        </div>
                    </div>

                    <div className="ranking-wrapper table-responsive">
                        <table className="table table-hover rank-table">
                            <thead>
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Team</th>
                                    <th scope="col">Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rankingList.map((post, index) => (
                                        <>
                                            <RankingItemFull key={post.toString()} sl={index} postData={post} handleDetail={handleDetail} />
                                        </>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    )

        : (
            <section className="seller-section mt-5">
                <div className="container">
                    <div className="section-header">
                        <h3 className="header-title">LEADERBOARD</h3>
                        <div className="header-content">
                            <ul className="filter-group d-flex flex-wrap align-items-center">
                                <li className="li day-filter">
                                    <div className="select-wrapper arrow-orange">
                                        <select className="form-select" aria-label="Day select">
                                            <option selected>Real time</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="section-wrapper">
                        <div className="seller-wrapper">
                            <div className="row g-3">
                                {
                                    rankingList.slice(0, 9).map((post, index) => (
                                        <div className="col-xl-4 col-lg-6" key={index}>
                                            <RankingItemPre index={index} postData={post} handleDetail={handleDetail} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
}



