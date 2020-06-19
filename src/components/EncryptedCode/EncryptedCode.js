import React from 'react';
import './EncryptedCode.css';

export class EncryptedCode extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false,
            opacityPanelCircle: 0
        };

        document.addEventListener('run-encrypted-code.exe', (evt) => {
            this._showPanel();
        });

        this.sentence = 'Solo necesitamos tener suerte una vez. Vosotros necesitais tener suerte siempre.';
        this.encryptedSentence = 'olhl-jayaoepwilo-pajañ-oqañpa-qjw-rav.-rlolpñlo-jayaoepweo-pajañ-oqañpa-oeaimña.'; // 4 posiciones
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="encryption-code">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">Encrypted Code</div>
                    </div>


                        <div className="wrapper-sentence">
                            {Array.from(this.encryptedSentence).map(ele => {
                                if (ele == '-') return <div className="box-letter-input"> </div>

                                if (ele == '.') return <div className="box-letter-input-point"> . </div>

                                return (<div className="box-letter-input">
                                    <div>{ele}</div>
                                    <input type="text" name="username" maxlength="1" className="input-letter" onChange={ () => this._isCorrect()}/>
                                </div>)
                            })}
                        </div>
                        
                        <div className="encrypted-code-panel" style={{ opacity: this.state.opacityPanelCircle }}>suerte</div>
                    </div>

                </div>
        } else {
            return ""
        }
    }

    _isCorrect() {
        const listInputs = [...document.getElementsByClassName('input-letter')]; 
        const sentence = this.sentence.replace(/[., ' ']/g, '').toLowerCase();
        let strg = '';
        
        
        listInputs.forEach(element => {
            strg += element.value.toLowerCase();
        });

        if (strg == sentence) 
            this.setState({ opacityPanelCircle: 1 });
        else 
            this.setState({ opacityPanelCircle: 0 });
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