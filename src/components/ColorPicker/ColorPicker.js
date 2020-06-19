import React from 'react';
import './ColorPicker.css';

export class ColorPicker extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false,
            red: 0,
            green: 0,
            blue: 0,
            hexColor: '#000000'
        };
        document.addEventListener('run-color-picker.exe', () => {
            this._showPanel();
        })
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="color-picker">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">ColorPicker</div>
                    </div>

                    <div className="color-picker-result" style={{ background: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})` }}>
                    </div>

                    <div className="color-picker-result-hex">
                        {this.state.hexColor}
                    </div>

                    <div className="wrapper-input">
                        <input id="color-picker-input-red" type="range" defaultValue="0" min="0" max="3" range="1" onChange={evt => this._handlerChangeRed(evt)}></input>
                        <input id="color-picker-input-green" type="range" defaultValue="0" min="0" max="3" range="1" onChange={evt => this._handlerChangeGreen(evt)}></input>
                        <input id="color-picker-input-blue" type="range" defaultValue="0" min="0" max="3" range="1" onChange={evt => this._handlerChangeBlue(evt)}></input>
                    </div>

                </div>
            </div>;
        } else {
            return ""
        }
    }

    _showPanel() {
        this.setState({
            showPanel: true
        })
    }

    _hiddenPanel() {
        this.setState({
            red: 0,
            green: 0,
            blue: 0,
            hexColor: '#000000',
            showPanel: false
        })
    }

    _handlerChangeRed(evt) {
        const value = evt.target.value * 85;

        setTimeout(() => {
            this.setState({
                red: parseInt(value)
            });

            this._updateHex();
        }, 100);
    }

    _handlerChangeGreen(evt) {
        const value = evt.target.value * 85;

        setTimeout(() => {
            this.setState({
                green: parseInt(value)
            });

            this._updateHex();
        }, 100);
    }

    _handlerChangeBlue(evt) {
        const value = evt.target.value * 85;

        setTimeout(() => {
            this.setState({
                blue: parseInt(value)
            });

            this._updateHex();
        }, 100);
    }

    _updateHex(reset) {
        let r = this.state.red || 0;
        let g = this.state.green || 0;
        let b = this.state.blue || 0;

        this.setState({
            hexColor: "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        });
    }
}