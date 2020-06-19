import React from 'react';
import './Piano.css';
import { sounds } from './pianoSounds.js';

export class Piano extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: false
        };

        this.countKeys = 0;
        this.listTouchKeys = ['C#', 'E','B', 'A', 'D'];
        this.code = 'C#EBAD';

        document.addEventListener('run-piano.exe', (evt) => {
           /*this.name = evt.detail.name;*/
            this._showPanel();
        })
    }

    render() {
        if (this.state.showPanel) {
            return <div className="modal-window">
                <div className="piano">
                    <div className="terminal-toolbar-window">
                        <div className="terminal-toolbar-window-button red" onClick={() => this._hiddenPanel()}></div>
                        <div className="terminal-toolbar-title">Piano</div>
                    </div>

                    <ul className="set">
                        <li className="white b" onClick={() => this._handlerPlaySound('F3')}> <div className="piano-note-white">F</div> </li>
                        <li className="black as" onClick={() => this._handlerPlaySound('F3G3')}> <div className="piano-note-black">F#</div> </li>
                        <li className="white a" onClick={() => this._handlerPlaySound('G3')}> <div className="piano-note-white">G</div> </li>
                        <li className="black gs" onClick={() => this._handlerPlaySound('G3A3')}> <div className="piano-note-black">G#</div> </li>
                        <li className="white g" onClick={() => this._handlerPlaySound('A3')}> <div className="piano-note-white piano-key">A</div> </li>
                        <li className="black fs" onClick={() => this._handlerPlaySound('A3B3')}> <div className="piano-note-black">A#</div> </li>
                        <li className="white f" onClick={() => this._handlerPlaySound('B3')}> <div className="piano-note-white piano-key">B</div> </li>
                        <li className="white e" onClick={() => this._handlerPlaySound('C4')}> <div className="piano-note-white">C</div> </li>
                        <li className="black ds" onClick={() => this._handlerPlaySound('C4D4')}> <div className="piano-note-black piano-key">C#</div> </li>
                        <li className="white d" onClick={() => this._handlerPlaySound('D4')}> <div className="piano-note-white piano-key">D</div> </li>
                        <li className="black cs"  onClick={() => this._handlerPlaySound('D4E4')}> <div className="piano-note-black">D#</div> </li>
                        <li className="white c"  onClick={() => this._handlerPlaySound('E4')}> <div className="piano-note-white piano-key">E</div> </li>
                    </ul>

                </div>
            </div>;
        } else {
            return ""
        }
    }

    _handlerPlaySound(key) {
        const listNodes = document.getElementsByClassName('piano-key');
        
        if (this._parseKey(key) == this.listTouchKeys[this.countKeys]) {
            this.countKeys ++;
        } else {
            this.countKeys = 0;
        }
        
        if (this.countKeys == this.listTouchKeys.length) {
            Array.from(listNodes).forEach(nodeHTML => {
                nodeHTML.classList.add('piano-red');
            });
        } else {
            Array.from(listNodes).forEach(nodeHTML => {
                nodeHTML.classList.remove('piano-red');
            });
        }
        
        this._playSound(key);
    }

    _playSound(key) {
        const sound = document.createElement("audio");
        sound.src = sounds[key];
        sound.play();
    }

    _parseKey(key) {
        return key.length > 2 ? key[0] + '#': key[0];
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