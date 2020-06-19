import React from 'react';
import './MobilePhone.css';
import 'iconicss/dist/iconicss.min.css';
import { icons } from '../Icons/Icons.js';
import { texts, clueMadrid, clueRoma, clueLondres, clueVarsovia } from './texts.js';
import { sounds } from './sounds.js';
import iconCall from './img/iconCall.png';
import iconMessage from './img/iconMessage.png';
import weather from './img/weather.png';
import iconBackArrow from './img/backArrow.png';
import iconClose from './img/iconClose.png';

export class MobilePhone extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            number: props.number,
            isCall: props.isCall,
            acceptCall: false,
            timeCall: '00:00',
            idCall: props.idCall,
            mode: props.mode // Modes: "menu", "incomingCall", "acceptCall", "oldCalls", "clue"
        };

        this.initCount = 0;
        this.time = this._getTime();
        this.avatar = "";
        this.audioPlayer = null;
        this.listCallsFinish = [];

        this._callbackFinish = props.callbackFinish;
        this._handleAcceptCall = this._acceptCall.bind(this);
        this._handleDeclineCall = this._declineCall.bind(this);
        this._handleGoToOldCall = this._changeMode.bind(this, 'oldCalls');
        this._handleGoToClue = this._changeMode.bind(this, 'clue');
    }

    render() {
        return (
            <div className={`wrapper-mobile ${this.props.show ? 'mobile-top-down' : ''}`} >
            <div className="mobile-phone-close" onClick={this._handleDeclineCall}> <img src={iconClose}></img> </div>
                <div className="mobile-body">
                    <div className="mobile-speaker"></div>

                    <div className={`mobile-screen ${"mobile-screen-background-" + this.props.mode}`} >

                        <div className="mobile-screen-toolbar">
                            <div>{this.time} </div>
                            <div>
                                <i className="icss-bluetooth"></i>
                                <i className="icss-wifi"></i>
                                <i className="icss-battery-3"></i>
                            </div>
                        </div>

                        {this._renderScreen()}

                    </div>

                </div>
            </div>
        )
    }

    _renderScreen() {
        switch (this.props.mode) {
            case 'menu':
                return (
                    <div className="mobile-menu">
                        <div className="mobile-menu-weather">
                            <img src={weather}></img>
                            <span>Nublado, 15ºC</span>
                        </div>
                        <div className="mobile-menu-icons">
                            <img className="mobile-menu-icon mobile-bk-green" src={iconCall} onClick={this._handleGoToOldCall}></img>
                            <img className="mobile-menu-icon mobile-bk-yellow" src={iconMessage} onClick={this._handleGoToClue}></img>
                        </div>
                    </div>
                )
            case 'incomingCall':
                return (
                    <div className="wrapper-render-screen">
                        <div className="mobile-avatar">
                            <img className="mobile-avatar-img" src={icons.avatar}></img>
                        </div>
                        <div className="mobile-name">{this.props.name}</div>
                        <div className="mobile-telephone">{this.props.number}</div>



                        <div className="wrapper-mobile-buttons-call">
                            <div className="mobile-button-decline-call" onClick={this._handleDeclineCall}>
                                <img src={icons.phoneDecline}></img>
                            </div>
                            <div className={`mobile-button-accept-call is-call`} onClick={this._handleAcceptCall}>
                                <img src={icons.phoneAccept}></img>
                            </div>
                        </div>
                    </div>
                )
            case 'acceptCall':
                const trans = texts[this.props.idCall].map((e) => { return <div className="mobile-trans-ele"> -{e} </div> })

                return (
                    <div className="wrapper-render-screen">
                        <div className="mobile-name">{this.props.name}</div>
                        <div className="mobile-telephone">{this.state.timeCall}</div>

                        <div className="mobile-transcription">{trans}</div>

                        <div className="mobile-button-decline-call" onClick={this._handleDeclineCall}>
                            <img src={icons.phoneDecline}></img>
                        </div>
                    </div>
                )

            case 'oldCalls':
                const getTexts = (texts) => {
                    return texts.map((t) => {
                        return <div className="mobile-phone-text-transcription">- {t}</div>
                    })
                }

                const listItems = this.listCallsFinish.map((call) =>
                    <div>
                        <div className="mobile-phone-title-call" onClick={() => this._toggleAccordeon(call)}>Llamada de {call}</div>
                        <div className="mobile-phone-transcription-call" id={"mobile-phone-text-" + call}>
                            {getTexts(texts[call])}
                        </div>
                    </div>
                );


                return (
                    <div className="mobile-oldCalls">
                        <div>
                            <img className="mobile-oldCalls-back" src={iconBackArrow} onClick={this.props.callbackChangeMode.bind(this, 'menu')}></img> Transcripción de llamadas
                        </div>

                        {listItems}
                    </div>
                )

            case 'clue':
                const cluesList = (clues) => {return clues.map((ele, index) => {
                    return (
                        <div>
                            <div className="mobile-phone-title-call" onClick={() => this._toggleAccordeon(ele)}>Pista {index + 1}</div>
                            <div className="mobile-phone-transcription-call" id={"mobile-phone-text-" + ele}>{ele}</div>
                        </div>
                    )
                })}

                return (
                    <div className="mobile-clue">
                        <div>
                            <img className="mobile-oldCalls-back" src={iconBackArrow} onClick={this.props.callbackChangeMode.bind(this, 'menu')}></img> Pistas
                        </div>

                        <div className="mobile-phone-title-call">Puzzle Madrid</div>
                        {cluesList(clueMadrid)}

                        <div className="mobile-phone-title-call">Puzzle Roma</div>
                        {cluesList(clueRoma)}

                        <div className="mobile-phone-title-call">Puzzle Londres</div>
                        {cluesList(clueLondres)}

                        <div className="mobile-phone-title-call">Puzzle Varsovia</div>
                        {cluesList(clueVarsovia)}
                    </div>
                )
        }
    }

    _toggleAccordeon(id) {
        document.getElementById('mobile-phone-text-' + id).classList.toggle('mobile-phone-show');
    }

    _acceptCall() {
        this.props.callbackChangeMode('acceptCall');

        this._initCounter(true);
        this.audioPlayer = new Audio(sounds[this.props.idCall]);
        this.audioPlayer.play();

        this.listCallsFinish.push(this.props.idCall);
    }

    _declineCall() {
        if (this.audioPlayer)
            this.audioPlayer.pause()

        this.props.callbackChangeMode('menu');

        this._callbackFinish();

        this.listCallsFinish.push(this.props.idCall);
    }

    _changeMode(newMode) {
        this.props.callbackChangeMode(newMode);
    }

    _getTime() {
        const today = new Date();
        const h = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
        const m = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();

        return `${h}:${m}`;
    }

    _initCounter(isInit) {
        if (isInit) this.initCount = new Date().getTime();

        setTimeout(() => {
            console.log(this.props.mode)
            const t = new Date().getTime() - this.initCount;
            const s = parseInt(t / 1000) % 60;
            const m = parseInt(s / 60);
            this.setState({
                timeCall: `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
            })

            if (this.props.mode == 'acceptCall')
                this._initCounter(false);
        }, 100);
    }
}