import React from 'react';

export class Countdown extends React.Component {

    constructor() {
        super();

        this.totalTime = 19 * 1000 * 60;
        this.finish = Date.now() + this.totalTime;

        this.state = {
            time: this.initialTime
        }

        this._refresTime();
    }

    render() {
        return (
            <span>{this.state.time}</span>
        );
    }

    _refresTime() {
        setTimeout(() => {
            const t = this.finish - Date.now();
            const min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            let sec = Math.floor((t % (1000 * 60)) / 1000);

            if (sec < 10) sec = '0' + sec;

            this.setState({ time: `${min} : ${sec < 10 ? sec = '0'+ sec : sec}` });

            this._refresTime(t);
        }, 500);
    }
}
