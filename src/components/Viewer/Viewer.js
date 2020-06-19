import React from 'react';
import './Viewer.css';
import { photos } from './Photos.js';
import { images } from './Images.js'

export class Viewer extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false,
            isPasswordCorrect: true,
            needPassword: { 'foto.png': [0, 8, 7, 6, 9] },
        };

        document.addEventListener('run-viewer', (evt) => {
            this.name = evt.detail.name;

            if (Object.keys(this.state.needPassword).includes(this.name))
                this.setState({ isPasswordCorrect: false });
            else
                this.setState({ isPasswordCorrect: true });

            this._showPanel();
        })
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="viewer">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">Viewer</div>
                    </div>

                    {this._renderBody()}

                </div>
            </div>;
        } else {
            return ""
        }
    }

    _renderBody() {
        if (this.state.isPasswordCorrect)
            return this._renderPanelImage();
        else
            return this._renderPanelPassword();
    }

    _renderPanelImage() {
        return (<img className="viewer-body" src={images[this.name]}></img>);
    }

    _renderPanelPassword() {
        return (
            <div className="viewer-panel-password">
                Para ver el contenido de la imagen debe introducir la contraseña.

                <div className="viewer-pass-input">
                    <input type="text" maxlength="1" className="viewer-input-number viewer-input-blueGray" />
                    <input type="text" maxlength="1" className="viewer-input-number viewer-input-orange" />
                    <input type="text" maxlength="1" className="viewer-input-number viewer-input-lime" />
                    <input type="text" maxlength="1" className="viewer-input-number viewer-input-green" />
                    <input type="text" maxlength="1" className="viewer-input-number viewer-input-brown" />
                </div>

                <div className="viewer-button-password" onClick={() => this._passwordValid()}> Validar </div>
            </div>
        )
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

    _passwordValid() {
        const listInputs = [...document.getElementsByClassName('viewer-input-number')];
        const pass = this.state.needPassword[this.name].join('');
        let strg = '';

        listInputs.forEach(element => {
            strg += element.value
        });

        if (strg == pass) 
            this.setState({  isPasswordCorrect: true  })
        else 
            this.setState({  isPasswordCorrect: false  })
    }

    _handleChangeInput(event, id) {
        this.setState({ name: event.target.value });
    }
}