import React from 'react';
import './EncryptionCircle.css';

export class EncryptionCircle extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false,
            angleCircle: 0,
            opacityPanelCircle: 1
        };

        document.addEventListener('run-encryption-circle.exe', (evt) => {
            this._showPanel();
        });
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="encryption-circle">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">Encryption Circle</div>
                    </div>

                    <div className="encryption-circle-body">
                    <div className="encryption-circle-result">
                                #suerte
                            </div>
                        <div className="wrapper-ec" style={{ opacity: this.state.opacityPanelCircle }}>
                            <div className="ec1">
                                <div className="ec2" style={{ transform: `rotate(${this.state.angleCircle}deg)` }} onClick={() => this._rotate()}>
                                    <div className="ec3"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>;
        } else {
            return ""
        }
    }

    _rotate() {
        this.setState({
            angleCircle: this.state.angleCircle + 13.3333333
        })
    }

    _showPanel() {
        this.setState({
            showPanel: true
        })
    }

    _hiddenPanel() {
        this.setState({
            showPanel: false
        })
    }
}