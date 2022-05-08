import React from 'react'

export default function RankingItemFull({ sl, postData, handleDetail }) {
    return (
        <>
            <tr onClick={() => handleDetail(postData)} style={{ cursor: "pointer" }}>
                <th scope="row" className="rank-sl">{sl+1}</th>
                <td className="rank-collection">
                    <div className="rank-col-inner d-flex flex-wrap align-items-center">
                        <div className="rank-col-content">
                            {postData.title}
                        </div>
                    </div>
                </td>
                <td className="rank-vol">
                    <div className="rank-vol-inner d-flex flex-wrap align-items-center">
                        <div className="rank-vol-content">
                            {postData.voted}
                        </div>
                    </div>
                </td>
            </tr>

        </>
    )
}
