import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CardItem({ item, children, handleDetail, vote }) {
    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-9">
                <div className="nft-item">
                    <div className="nft-inner">
                        <div className="nft-item-top d-flex justify-content-between align-items-center">
                        </div>
                        <div className="nft-item-bottom">
                            <div className="nft-thumb">
                                <LazyLoadImage
                                    alt={item.title}
                                    src={item.images[0]} onClick={handleDetail} effect="blur" />
                                <span className="badge rounded-pill position-absolute"><i className="icofont-heart" />
                                    {vote.includes(item.id) ? item.voted : item.voted}</span>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
