import React from 'react';
import './Bot.css';
import { photos } from './IconsFaces.js'


export class Bot extends React.Component {

    constructor() {
        super();

        this.state = {
            character: 'Policia'
        };
        this.bots = {
            'Policia': [
                'No hay tiempo, así que, seré breve!',
                'El virus informático PROMON esta fuera de control',
                'Sabemos la localización de los cuatro hackers que lo han creado pero somos incapaces de acceder a sus ordenadores. Tu misión consiste en hackearlos y bloquear sus equipos',
                'Accede a sus terminales desde el mapa de ubicación y descubre la palabra clave para acceder por una puerta trasera.',
                'Buena suerte, confiamos en usted!'

            ],

            'Madrid': [
                'Soy "Madrid"... ¿de verdad piensas que podras acceder a mi PC?',
                'Maldito iluso,pero está bien, te dare una oportunidad!',
                'La contraseña para acceder a mi PC es simple y llanamante mi color favorito.',
                'Suerte! ;)'
            ],

            'Roma': [],

            'Varsovia': [],

            'Londres': []
        }
    }

    render() {
        return (
            <div className="bot">
            
                <div className="bot-panel">
                    {this.bots[this.state.character].map(ele => {
                        return<div className="bot-sentence"> 
                            <div className="bot-icon">
                                <img width="100%" src={photos[this.state.character]}></img>
                            </div>
                            <div className="bot-bubble">
                                <div className="bot-bubble-title"><b>{this.state.character}</b></div>
                                <div className="bot-bubble-text">{ele}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }

    changeCharacter(newCharacter) {
        this.setState({ character: newCharacter })
    }





}