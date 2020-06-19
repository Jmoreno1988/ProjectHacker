import React from 'react';
import './Toolbox.css';
import imgPiano from './img/piano.png';
import imgClose from './img/close.png';
import imgSelectWheel from './img/select-wheel.png';
import imgMobile from './img/mobile.png';

export class Toolbox extends React.Component {

    constructor() {
        super();

        this.state = {}
        this.handleClick = this._lunchProgram.bind(this);
    }

    render() {
        return (
            <div className="toolbox">
                <div className="terminal-toolbar-window">
                    <div className="terminal-toolbar-window-button red"></div>
                    <div className="terminal-toolbar-window-button yellow"></div>
                    <div className="terminal-toolbar-window-button green"></div>
                    <div className="terminal-toolbar-title">Mi PC</div>
                </div>
                <div className="toolbox-body">

                    <div className="toolbox-icon">
                        <img class="toolbox-mobile-phone" src={imgMobile} onClick={() => { this.handleClick('run-mobile-phone.exe') }}></img>
                        Teléfono
                    </div>

                    <div className="toolbox-icon" onClick={() => { this.handleClick('run-piano.exe') }}>
                        <img src={imgPiano} ></img>
                        Mi piano
                    </div>

                    <div className="toolbox-icon" onClick={() => { this.handleClick('run-encryption-circle.exe') }}>
                        <img src={imgClose} ></img>
                        Claves
                    </div>

                    <div className="toolbox-icon">
                        <img src={imgSelectWheel} onClick={() => { this.handleClick('run-color-picker.exe') }}></img>
                        ColorPicker
                    </div>
                </div>
            </div>
        )
    }

    _lunchProgram(name) {
        document.dispatchEvent(new CustomEvent(name, {}));
    }
}