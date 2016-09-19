import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Movies from './components/Movies.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Movies />
            </div>
        );
    }
}
;

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);