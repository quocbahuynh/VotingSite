import React from 'react'
import './DetailItem.css'
import { Modal, Image, Row, Col } from 'react-bootstrap'
import diffInMs from './timesup'

export default function DetailItem({ dataPost, onShow, showStatus, vote, handleVote, handleUnVote }) {

    const changeButton = (button) => {
        return diffInMs > 0 ? button : "Locked";
    }

    return (
        <Modal show={showStatus} fullscreen={true}>
            <Modal.Header>
                <Modal.Title style={{ color: "#fff", fontFamily: "'Encode Sans', sans-serif", fontWeight: 800 }}>{dataPost.title}</Modal.Title>
                <i className="icofont-close-circled" style={{ color: "#fff", fontSize: "29px", cursor: "pointer" }} onClick={() => onShow(false)}></i>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <button className="close-detail-button">
                            <span className="text" onClick={() => dataPost.videoEmbed ? window.open(dataPost.videoEmbed, '_blank') : alert("Video is not exist")}><i className="icofont-external-link"></i> Video Presentation</span>
                        </button>
                    </Col>
                    <Col>{
                        vote.includes(dataPost.id) ? (
                            <button className="close-detail-button" style={{ backgroundImage: 'linear-gradient(180deg, hsl(131deg 93% 48%) 0%, hsl(168deg 55% 42%) 100%)' }}>
                                <span className="text" onClick={() => handleUnVote(dataPost.id)} style={{ backgroundImage: 'linear-gradient(180deg, hsl(131deg 93% 48%) 0%, hsl(168deg 55% 42%) 100%)' }}>{changeButton("Unvote")}<i className="icofont-check"></i></span>
                            </button>) :
                            (
                                <button className="close-detail-button" style={{}}>
                                    <span className="text" onClick={() => handleVote(dataPost.id)} ><i className="icofont-bubble-up"></i>{changeButton("Vote")}</span>
                                </button>
                            )
                    }</Col>
                </Row>
                <Image src={dataPost.images} />
            </Modal.Body>
        </Modal>
    )
}
