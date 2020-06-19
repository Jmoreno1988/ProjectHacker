import React from 'react';
import './ScapeRoom.css';
import { Terminal } from '../Terminal/Terminal.js';
import { MapSearch } from '../MapSearch/MapSearch.js';
import { Bot } from '../Bot/Bot.js';
import { ColorPicker } from '../ColorPicker/ColorPicker.js';
import { Game } from '../Game/Game.js';
import { Viewer } from '../Viewer/Viewer.js';
import { Reader } from '../Reader/Reader.js';
import { EncryptionCircle } from '../EncryptionCircle/EncryptionCircle.js';
import { Piano } from '../Piano/Piano.js';
import { Countdown } from '../Countdown/Countdown.js';
import { MobilePhone } from '../MobilePhone/MobilePhone.js';
import { Toolbox } from '../Toolbox/Toolbox.js';
import { EncryptedCode } from '../EncryptedCode/EncryptedCode.js';
import { Link } from 'react-router-dom';

export class ScapeRoom extends React.Component {

    constructor() {
        super();

        this.state = {
            componentDidMount: false,
            phoneIsCall: false,
            idCall: 'call1',
            mobileName: 'Anónimo',
            mobileNumber: 'xxxxxxxxx',
            showUI: false,
            showMobilePhone: false,
            mobileMode: null
        }
        this.game = new Game('Los Monguers');
        this.idMissionActive = null;
        this.refTerminal = React.createRef();
        this.refBot = React.createRef();
        this.isIntroductionFinish = false;
        this.linkRouter = React.createRef();

        document.addEventListener('click-in-mission', (evt) => {
            this.idMissionActive = evt.detail.idMission;
            const mission = this.game.getMission(this.idMissionActive);

            // TODO: reactividad!!
            if (this.refTerminal.current)
                this.refTerminal.current.changeTerminal(mission);

            if (!mission.isCall) {
                setTimeout(() => {
                    this.setState({
                        showMobilePhone: true,
                        mobileMode: 'incomingCall',
                        idCall: mission.idMission,
                        mobileName: mission.idMission,
                        mobileNumber: 'xxxxxxxxx'
                    });
                }, 1000);
                mission.isCall = true;
            }
        });

        document.addEventListener('run-mobile-phone.exe', (evt) => {
            this.setState({showMobilePhone: true})
        })

        document.addEventListener('finish-game', this._goToEnding.bind(this));
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showMobilePhone: true,
                mobileMode: 'incomingCall',
                idCall: 'call1',
                mobileName: 'Anónimo',
                mobileNumber: 'xxxxxxxxx'
            });
        }, 1000);
    }

    render() {
        return (
            <div className="scape-room">
                <MobilePhone
                    mode={this.state.mobileMode}


                    show={this.state.showMobilePhone}
                    isCall={this.state.phoneIsCall}
                    idCall={this.state.idCall}
                    name={this.state.mobileName}
                    number={this.state.mobileNumber}
                    callbackChangeMode={this._handlerChangeMobileMode.bind(this)}
                    callbackFinish={this._handlerFinishCall.bind(this)}
                />

                <div className={`scape-room-ui ${!this.state.showUI ? 'hiddenUI' : ''}`}>

                    <div className="app-first-row">
                        <div className="mini-container1">
                            <Toolbox />
                        </div>
                        <div className="mini-container2">
                            <MapSearch markers={this.game.getPositions()}></MapSearch>
                        </div>
                    </div>
                    <div className="mini-container3">
                        <Terminal ref={this.refTerminal}></Terminal>
                    </div>

                </div>

                <ColorPicker></ColorPicker>
                <Viewer></Viewer>
                <Reader></Reader>
                <EncryptionCircle></EncryptionCircle>
                <EncryptedCode></EncryptedCode>
                <Piano></Piano>
                <Link to="/ending" ref={this.linkRouter}></Link>
            </div>
        )
    }

    _handlerChangeMobileMode(newMode) {
        this.setState({mobileMode: newMode});
    }

    _handlerFinishCall() {
        this.setState({ showMobilePhone: false });

        this._nextStep();
    }

    _nextStep() {
        if (!this.isIntroductionFinish) {
            setTimeout(() => {
                this.setState({
                    showMobilePhone: true,
                    mobileMode: 'incomingCall',
                    idCall: 'call2',
                    mobileName: 'Policía',
                    mobileNumber: '555-678977'
                });
            }, 1500);

            this.isIntroductionFinish = true;
            return;
        }

        this.setState({
            showUI: true
        })
    }

    _goToEnding() {
        this.linkRouter.current.click();
    }
}