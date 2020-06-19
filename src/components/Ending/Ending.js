import React from 'react';
import './Ending.css';
import { MobilePhone } from '../MobilePhone/MobilePhone.js';

export class Ending extends React.Component {

    constructor() {
        super();

        this.state = {
            phoneIsCall: false,
            idCall: '',
            mobileName: '',
            mobileNumber: '',
            showUI: false,
            showMobilePhone: false,
            mobileMode: null
        }

        this.steps = [
            { isFinish: false, callback: this._firstStep.bind(this) },
            { isFinish: false, callback: this._secondStep.bind(this) },
            { isFinish: false, callback: this._thirdStep.bind(this) }
        ]
    }

    componentDidMount() {
        setTimeout(() => {
            this._nextStep();
        }, 1000);
    }

    render() {
        return (
            <div>
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

                <div>¿De que lado estas?</div>

            </div>
        )
    }

    _handlerFinishCall() {
        this.setState({ showMobilePhone: false });

        setTimeout(() => {
            this._nextStep();
        }, 1000);
    }

    _handlerChangeMobileMode(newMode) {
        this.setState({ mobileMode: newMode });
    }



    _nextStep() {

        const step = this.steps.find(ele => !ele.isFinish);

        if (step) {
            step.isFinish = true;
            step.callback();
        }
    }

    _firstStep() {
        this.setState({
            showMobilePhone: true,
            mobileMode: 'incomingCall',
            idCall: 'call2',
            mobileName: 'Policía',
            mobileNumber: '555-678977'
        });
    }

    _secondStep() {
        this.setState({
            showMobilePhone: true,
            mobileMode: 'incomingCall',
            idCall: 'call2',
            mobileName: 'Anonimo',
            mobileNumber: 'xxxxxxxxx'
        });
    }

    _thirdStep() {
        // Mostramos la frase

        // Mostramos los dos cartelones
    }
}