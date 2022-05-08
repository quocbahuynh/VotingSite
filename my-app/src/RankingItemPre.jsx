import React from 'react'

export default function RankingItemPre({ index, postData, handleDetail }) {

    const replaceTile = (title) => {
        return title.length > 13 ? title.replace(title.substring(13), '...') : title;
    }

    return (
        <div className="seller-item" onClick={() => handleDetail(postData)} style={{ cursor: "pointer" }}>
            <div className="seller-inner">
                <div className="seller-part">
                    <p className="assets-number">{index < 10 ? 0 + "" + (index + 1) : (index + 1)}</p>
                    <div className="assets-owner">
                        <div className="owner-thumb veryfied">
                            <img src={postData.images[0]} style={{ height: "60px", width: "70px" }} alt={postData.title} />
                        </div>
                        <div className="owner-content">
                            <h6><p style={{ color: '#ffffff' }}>{replaceTile(postData.title)}</p></h6>
                            <p>{postData.voted} voted</p>
                        </div>
                    </div>
                </div>
                {
                    postData.voted > 0 ?
                        Math.floor(Math.random() * 10) > 5
                            ? (
                                <span className="badge rounded-pill bg-blue">+{Math.floor(Math.random() * 10)} %</span>
                            ) : (
                                <span className="badge rounded-pill bg-orange">-{Math.floor(Math.random() * 10)} %</span>
                            )
                        : (<span className="badge rounded-pill bg-blue">0 %</span>)
                }
            </div>
        </div>

    )
}
