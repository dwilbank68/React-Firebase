import React, { Component, PropTypes } from 'react';

class ChatRoom extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            message:''
        };
    }

    render() {
        var currentMessages = null;
        if (this.props.movie.posts != null){
            currentMessages = this.props.movie.posts.map((message, i)=>{
                return (
                    <li key={message.id}>
                        {message.text}
                    </li>
                )
            })
        }
        return (
          <div>
              <h3>{this.props.movie.title}</h3>
              <ol>
                  {currentMessages}
              </ol>
              <input    type="text"
                        className="form-control"
                        onChange={this.updateMessage.bind(this)}/>
              <br/>
              <button   className="btn btn-info"
                        onClick={this.submitMessage.bind(this)}>
                  Submit Message
              </button>
          </div>
        );
    }

    submitMessage(e) {
        e.preventDefault();
        console.log('submit message: ', this.state.message);
        const msg = {
            id: this.props.movie.posts.length,
            text: this.state.message
        }

        firebase
            .database()
            .ref('posts/' +this.props.movie.id+ '/' +msg.id)
            .set(msg);

    }

    updateMessage(e){
        this.setState({
            message:e.target.value
        });

    }

}

ChatRoom.propTypes = {};
ChatRoom.defaultProps = {};

export default ChatRoom;
