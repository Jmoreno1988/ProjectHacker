import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import video from "../../video/videoInicial5.mp4";
import iconLaptop from './img/laptop.png';
import iconEdit from './img/edit.png';
import iconVideoCall from './img/videoCall.png';
import iconWifi from './img/wifi.png';
import iconBulb from './img/bulb.png';
import iconPerson from './img/person.png';
import iconWatch from './img/watch.png';
import logo from './img/logo.svg';


export class Home extends React.Component {

    constructor() {
        super();

        this.state = { title: '', description: '', titleOpacity0: false }
        this.textTitle = 'red de hackers';
        this.textdescription = 'Cuatro piratas informáticos han puesto en jaque a los principales gobiernos mundiales, trata de detenerlos antes de que consigan su objetivo.';
        this.positionsFinish = [];
        this.timeTransition = 50;
        this.linkRouter = React.createRef();

        this.handleInitGame = this._initGame.bind(this);
    }

    componentDidMount() {
        [...this.textTitle].forEach((ele, index) => {
            ele == ' ' ? this.positionsFinish.push(0) : this.positionsFinish.push(5 + (index + 2))
        })

        this._randomLetters(this.textTitle, 'title');
        //this._randomLetters(this.textdescription, 'description');
    }

    render() {
        return (
            <div className={`wrapper-home ${this.state.titleOpacity0 ? 'opacity0' : ''}`}>
                <div className="home-video-container">

                    <video className="video" autoPlay loop muted src={video} />

                    <div className={`overlay material-shadow ${this.state.titleOpacity0 ? 'opacity0' : ''}`}></div>
                    <div className="home-video-text">
                        <div className="title">{this.state.title}</div>
                        <div className="sub-title"> - ESCAPE ROOM ONLINE -</div>

                        <p className="font-big color-light">{this.textdescription}</p> <br />


                        <div className="home-container-row color-light">
                            <div className="home-property-tag"> <img src={iconPerson}></img> <div>Equipo 1-4 jugadores</div></div>
                            <div className="home-property-tag"> <img src={iconBulb}></img> <div>Dificultad intermedia</div></div>
                            <div className="home-property-tag"> <img src={iconWatch}></img> <div>60 minutos</div></div>
                        </div>

                        <div className="home-link-button " onClick={this.handleInitGame}>JUGAR!</div>
                        <Link to="/scapeRoom" ref={this.linkRouter}></Link>
                    </div>
                </div>

                <div className="home-container container-light home-sinopsis">
                    <div className="title-secundary color-dark">Sinopsis del juego</div>

                    <p>
                        El gobierno se ha puesto en contacto contigo para que los ayudes a detener a cuatro
                        de los mas peligrosos hackers del mundo.
                    </p>
                    <p>
                        ¿Que harás? ¿Ayudaras a las fuerzas del orden a restablecer el equilibrio de poder?, o por el contrario,
                        ¿te unirás a los hackers y su deseo de un nuevo orden mundial?
                    </p>

                </div>

                <div className="home-container container-dark color-light material-shadow">
                    <div className="title-secundary ">¿Qué necesito para jugar?</div>

                    <div className="home-container-grid ">
                        <div className="home-container-column">
                            <p> <img src={iconLaptop}></img> Ordenador o tablet. De momento, el juego a sido desarrollado con optimización para estos dispositivos, para tener una mejor experiencia. </p>
                            <p> <img src={iconEdit}></img> Lápiz y papel para poder tomar apuntes de lo que consideres necesario a lo largo de tu travesía.</p>
                        </div>
                        <div className="home-container-column">
                            <p> <img src={iconVideoCall}></img> Puedes utilizar Google Hangouts, skype, zoom o cualquier otra herramienta para realizar la videollamada con tu equipo.</p>
                            <p> <img src={iconWifi}></img> Conexión wifi. Podéis hacer uso libremente de internet y de vuestros dispositivos electrónicos. </p>
                        </div>
                    </div>
                </div>

                <div className="home-container-mini container-light color-dar">
                    <p><img class="icon-little" src={logo}></img></p> 

                    <div>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="CMHEMR9Y9762E" />
                            <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Botón Donar con PayPal" />
                            <img alt="" border="0" src="https://www.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1" />
                        </form>
                    </div>
                </div>

            </div>
        )
    }

    _randomLetters(originalText, obj) {
        const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const text = [...originalText];
        let auxText = '';

        setTimeout(() => {
            auxText = '';

            text.forEach((ele, index) => {
                if (this.positionsFinish[index] > 0 && ele != ' ')
                    auxText += alphabet[Math.floor(Math.random() * (24 - 0))];
                else
                    auxText += ele.toUpperCase();
            });

            this.positionsFinish = this.positionsFinish.map((e) => { return e - 1 })

            this.setState({
                [obj]: auxText
            });

            if (this.positionsFinish.some((e) => e > -1)) {
                this._randomLetters(text, obj);
            }

        }, this.timeTransition);
    }

    _initGame() {
        this.positionsFinish = [];
        // Pillar todos los textos y randolizarlos mientras desaparaecen...
        [...this.textTitle].forEach((ele, index) => {
            ele == ' ' ? this.positionsFinish.push(0) : this.positionsFinish.push(5000)
        })

        this._randomLetters(this.textTitle, 'title');
        setTimeout(() => { this._goToGame() }, 3100);

        this.setState({ titleOpacity0: true })
    }

    _goToGame() {
        this.linkRouter.current.click();
    }
}