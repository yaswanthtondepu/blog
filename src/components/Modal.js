import React from 'react'
import { IoClose } from 'react-icons/io5';

const Modal = ({ title, content, btn1, btn2, setShowModal, setModalResponse }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h3>{title}</h3>
                    <IoClose style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => setShowModal(false)} />
                </div>
                <div className='modal-body'>
                    {content}
                </div>
                <div className='modal-footer'>
                    <button className='btn btn-warn' onClick={() => setModalResponse(1)}>
                      {btn1}
                    </button>
                    <button className='btn btn-secondary' onClick={() => setShowModal(false)}>{btn2}</button>
                </div>
            </div>

        </div>
    )
}

export default Modal