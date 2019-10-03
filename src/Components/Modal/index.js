import React from "react"

import './modal.scss'

export default props =>
    <div id="countryModal" className={`modal  ${props.modalOpen ? 'modal--open ' : ''}`}>
        <div className="modal__inner">
            <div id="countryModalImg">none</div>
            <div className="modal__headline">
                <p id="countryModalName">none</p>
            </div>
            <div className="modal__info">
                <span>Capital</span>
                <p id="countryModalCapital">none</p>
            </div>
            <div className="modal__info">
                <span>Population</span>
                <p id="countryModalPopulation">none</p>
            </div>
            <div className="modal__info">
                <span>Area</span>
                <p id="countryModalArea">none</p>
            </div>
            <div className="modal__info">
                <span>Currencies</span>
                <p id="countryModalCurrencies">none</p>
            </div>
            <button onClick={props.onClick}>Close</button>
        </div>
    </div>
