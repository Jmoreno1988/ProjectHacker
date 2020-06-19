import React from 'react';
import './Terminal.css';
import { treeFiles } from './tree.js';

export class Terminal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listCommands: [],
            viewResults: [],
            isConnect: false
        };

        this.listCommands = {
            'ls': 'Muestra la lista de archivos del equipo.',
            'help': 'Proporciona información de ayuda para los comandos de la terminal.',
            'run': 'Ejecuta el programa que se especifique a continuación.',
            'password': 'Introduce una contraseña para bloquear el equipo.',
            'exit': 'Cierra la conexión remota en curso.',
            'view': 'Abre el visor de imágenes con la imagen que se especifique a continuación.',
            'read': 'Abre el lector de textos con el texto que se especifique a continuación.'
        };
        this.msgCmdInvalid = 'command not found';
        this.msgProgramNotFound = 'Programa no instalado en este equipo.';
        this.msgFileNotFound = 'Archivo no encontrado.';
        this.msgHelp = '';
        this.actualTree = null;
        this.idMission = null;
        this.listInputs = [];
        this.idMissionsSuccess = [];
        this.isBlocked = false;

        document.addEventListener('password-correct', this._handlerPasswordCorrect.bind(this));
        document.addEventListener('password-incorrect', this._handlerPasswordIncorrect.bind(this))
    }

    render() {
        this._downSroll();
        return <div className="terminal" onClick={evt => this._handlerClickTerminal(evt)}>
            <div className="terminal-toolbar-window">
                <div className="terminal-toolbar-window-button red"></div>
                <div className="terminal-toolbar-window-button yellow"></div>
                <div className="terminal-toolbar-window-button green"></div>
                <div className="terminal-toolbar-title">Terminal</div>
            </div>
            <div className="terminal-toolbar-wrapper-list-input">
                <div className="terminal-list">
                    {this._htmlTerminalList()}
                </div>
                {this._htmlInput()}
            </div>
        </div>;
    }

    changeTerminal(mission) {
        this.listInputs = [];
        this.actualTree = treeFiles[mission.idMission];
        this.setState({ inBlackTerminalList: true });


        setTimeout(() => {
            this.mission = mission;
            this.idMission = mission.idMission;
            this.setState({
                isConnect: true,
                inBlackTerminalList: false
            });
            this.focusInput();
        }, 300);

    }

    focusInput() {
        if (this.inputTitle)
            this.inputTitle.focus();
    }

    _handlerNewCommand(evt) {
        if (evt.key === 'Enter') {
            const cmd = evt.target.value.trim();
            this._runCommand(cmd);
            this.inputTitle.value = "";
        }
    }

    _handlerClickTerminal(evt) {
        this.focusInput();
    }

    _runCommand(command) {
        const cmd = command.split(" ")[0] || '';
        const arg = command.split(" ")[1] || '';
        const result = this._run(cmd.toLowerCase(), arg.toLowerCase());

        this.setState({ viewResults: [...this.state.viewResults, result] });

    }

    _isValidCmd(cmd) {
        return Object.keys(this.listCommands).includes(cmd);
    }

    _run(cmd, name) {

        this.listInputs.push(`$: >`);

        switch (cmd) {
            case 'help':
                this.listInputs.push(`$: >>> Información de ayuda para los comandos de la terminal:`);
                Object.keys(this.listCommands).map((value) => {
                    this.listInputs.push(`$: -> ${value} : ${this.listCommands[value]}`);
                })
                break;
            case 'ls':
                this.listInputs.push(`$: >>> Listado de archivos de '${this.idMission}-PC':`);
                this.actualTree.map((value) => {
                    this.listInputs.push(`$: -> ${value}`);
                })
                break;

            case 'run':
                this._launchProgram(name);
                break;

            case 'password':
                this._isPasswordCorrect(name)
                break;

            case 'view':
                this._viewPhoto(name);
                break;

            case 'read':
                this._readText(name);
                break;

            case 'exit':
                this.setState({ isConnect: false });
                break;

            case 'block': 
                this.listInputs.push(`$: >>> Contraseña correcta!`);
                this.listInputs.push(`$: >>> Proceso de bloqueo iniciado...`);
                this.listInputs.push(`$: >>>  - Parando procesos remotos... OK`);
                this.listInputs.push(`$: >>>  - Borrando archivos claves... OK`);
                this.listInputs.push(`$: >>> Proceso de bloqueo finalizado.`);
                this.listInputs.push(`$: >`);
                this.listInputs.push(`$: >>> Estado actual: BLOQUEADO`);

            case 'block-false': 
                this.listInputs.push(`$: >>> Contraseña INCORRECTA!`);
                break;

            case '':
                break;

            default:
                this.listInputs.push(`$: > ${cmd} : ${this.msgCmdInvalid}`);
                break;
        }
    }

    _launchProgram(name) {
        this.listInputs.push(`$: > run ${name}`);
        if (this.actualTree.includes(name))
            document.dispatchEvent(new CustomEvent(`run-${name}`, {}));
        else
            this.listInputs.push(`$: > ${name} : ${this.msgProgramNotFound}`);
    }

    _viewPhoto(name) {
        this.listInputs.push(`$: > view ${name}`);

        if (this.actualTree.includes(name))
            document.dispatchEvent(new CustomEvent('run-viewer', { detail: { name: name } }));
        else
            this.listInputs.push(`$: > ${name} : ${this.msgFileNotFound}`);

    }

    _readText(name) {
        this.listInputs.push(`$: > read ${name}`);

        if (this.actualTree.includes(name))
            document.dispatchEvent(new CustomEvent('run-reader', { detail: { name: name } }));
        else
            this.listInputs.push(`$: > ${name} : ${this.msgFileNotFound}`);


    }

    _isPasswordCorrect(pass) {
        const evt = new CustomEvent('password-verfication', { detail: { password: pass } });
        document.dispatchEvent(evt);
    }

    _htmlTerminalList() {
        if (this.state.inBlackTerminalList) return <div></div>;

        if (this.mission && this.mission.isPassed) return <div> 
            $: > ScapeRoom, Terminal Interface (4.0.5) <br /><br />
            $: >>> Contraseña correcta! <br />
            $: >>>  - Parando procesos remotos... OK <br />
            $: >>>  - Borrando archivos claves... OK <br />
            $: >>> Proceso de bloqueo finalizado. <br />
            $: > <br />
            $: >>> Estado actual: <b>BLOQUEADO</b> <br />
        </div>

        if (!this.state.isConnect) {
            return <div>
                $: > ScapeRoom, Terminal Interface (4.0.5) <br /><br />
                $: > Última conexión: Sun Apr 05 2020 09:21:09 en ttys000 <br />
                $: > -- SIN CONEXIÓN --
            </div>
        } else {
            return <div>
                $: > ScapeRoom, Terminal Interface (4.0.5) <br /><br />
                $: > Conectando con "{this.idMission}-PC"... <br />
                $: > Conexión realizada con éxito! <br />
                $: > (Escribe help para obtener un listado de los comandos disponibles)<br />

                {this.listInputs.map(ele => {
                    return <div>{ele}</div>
                })}
            </div>
        }
    }

    _htmlInput() {
        if (this.mission && this.mission.isPassed)
            return <div></div>

        if (this.state.isConnect) {
            return <div className="terminal-input">
                >> <input type="text" ref={el => this.inputTitle = el} onKeyDown={evt => this._handlerNewCommand(evt)} />
            </div>
        }

        return <div></div>
    }

    _handlerPasswordCorrect(evt) {
        this._run('block', evt.detail.mission.idMission);
    }

    _handlerPasswordIncorrect(evt) {
        if (evt.detail.mission.idMission == this.idMission)
        this._run('block-false', evt.detail.mission.idMission);
    }

    _enableInput() {
        this.setState({ enableInput: false });
    }

    _disableInput() {
        this.setState({ enableInput: true });
    }

    _downSroll() {
        setTimeout(() => {
            document.getElementsByClassName('terminal-toolbar-wrapper-list-input')[0].scrollTop = 9999999;
        }, 50);
    }

}