import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home/Home.js';
import { ScapeRoom } from './components/ScapeRoom/ScapeRoom.js';
import { Ending } from './components/Ending/Ending.js';

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/scapeRoom" render={() => <ScapeRoom />} />
                    <Route exact path="/ending" render={() => <Ending />} />
                    <Route component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
