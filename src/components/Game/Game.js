export class Game {

    constructor(namePlayer) {
        this.namePlayer = namePlayer;
        this.missions = [
            new Mission('Madrid', [-3.6833724976, 40.4151689954], '#ff00ff'),
            new Mission('Londres', [-0.118092, 51.509865], 'gloria'),
            new Mission('Roma', [12.496366, 41.902782], 'suerte'),
            new Mission('Varsovia', [21.017532, 52.237049], 'ABC#DE'),
        ];

        document.addEventListener('password-verfication', (evt) => {
            this.missions.forEach(ele => {
                if (ele.result.toLowerCase() == evt.detail.password.toLowerCase()) {
                    ele.isPassed = true;
                    const evt = new CustomEvent('password-correct', { detail: { mission: ele } });
                    document.dispatchEvent(evt);
                } else {
                    const evt = new CustomEvent('password-incorrect', { detail: { mission: ele } });
                    document.dispatchEvent(evt);
                }
            })

            if (this._isFinishgame()) {
                const evt = new CustomEvent('finish-game', { detail: {} });
                document.dispatchEvent(evt);
            }
        })
    }

    getPositions() {
        return this.missions.map(ele => {
            return { idMission: ele.idMission, coords: ele.coords, mission: ele};
        })
    }

    getMission(id) {
        return this.missions.find( ele => ele.idMission == id) || null;
    }

    _isFinishgame() {
        let isFinish = true;

        this.missions.forEach(ele => {
            if (!ele.isPassed) isFinish = false;
        });

        return isFinish;
    }
}

export class Mission {
    
    constructor(id, coords, result) {
        this.idMission = id;
        this.isPassed = false;
        this.coords = coords;
        this.result = result;
        this.isCallInit = false;
    }
}