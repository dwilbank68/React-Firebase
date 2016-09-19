import React, {Component} from 'react';
import superagent from 'superagent';
import ChatRoom from './ChatRoom.jsx';


class Movies extends Component {

    constructor(props, context){
        super(props, context)
        this.state = {
            movies: [],
            selected: {
                title:''
            }
        }
    }

    componentDidMount() {
        const url = 'https://api.themoviedb.org/3/discover/movie';
        const params = {
            api_key: 'see snippets file',
            'primary_release_date.gte': '2016-08-01'
        }

        superagent
            .get(url)
            .query(params)
            .set('Accept','text/json')
            .end((error, res)=>{
                if (error) {
                    console.log('Error: ',error);
                }
                const json = res.body;
                const firstMovie = json.results[0];

                this.setState({
                    movies:json.results
                });

                this.selectMovie(firstMovie, null);

            })

    }

    render() {
        const list = this.state.movies.map((movie, i) => {
            return (
                <li key={movie.id}>
                    <a  href="#"
                        onClick={this.selectMovie.bind(this, movie)}>
                        {movie.title}
                    </a>
                </li>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {list}
                    </div>
                    <div className="col-md-8">
                        <ChatRoom movie={this.state.selected}/>
                    </div>
                </div>
            </div>
        );
    }

    selectMovie(movie, event) {
        if (event != null) {
            event.preventDefault();
        }

        console.log('Select Movie: ', JSON.stringify( movie, null, '  '));

        // if no one has posted a comment, attach a new posts array

        if (movie.posts == null){
            movie['posts'] = [];
        }
        //
        //this.setState({
        //    selected:movie
        //});
        //

        firebase
            .database()
            .ref('posts/' +movie.id)
            .on('value', (snapshot)=>{
                const currentMessages = snapshot.val();
                console.log('currentMessages: ', JSON.stringify( currentMessages, null, '  '));
                if (currentMessages != null){
                    movie['posts'] = currentMessages;
                }
                this.setState({
                    selected:movie
                });

            })

    }

};

export default Movies;
