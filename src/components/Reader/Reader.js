import React from 'react';
import './Reader.css';
import { texts, books } from './Texts.js';

export class Reader extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false
        };

        document.addEventListener('run-reader', (evt) => {
            this.name = evt.detail.name;
            if (this.name.includes('.pdf'))
                this._showPdf();
            else
                this._showPanel();
        })
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="reader">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">Reader</div>
                    </div>

                    <div className="reader-body">
                        {texts[this.name]}
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

    _showPdf() {
        try {
            let pdfWindow = window.open("", 'PDF Reader');

            pdfWindow.document.write(
                `<iframe src="${books[this.name]}" width="100%" height="100%" >`
            )

        } catch (e) { }
    }

    _hiddenPanel() {
        this.setState({
            showPanel: false
        })
    }
}