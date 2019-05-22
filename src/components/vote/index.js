import React, { Component } from 'react'
import ActiveVote from './activeVote'
import { Get } from '../request'

// import style from '../../scss/vote.module.scss'

// TODO: prettify this file

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: null,
      displayReloadCloseText: false,
    }

    this.showMessage = this.showMessage.bind(this)
    this.closeMessage = this.closeMessage.bind(this)
    this.onRequestFailed = this.onRequestFailed.bind(this)
  }

  onRequestFailed() {
    this.showMessage(
      'Något gick fel',
      'Logga ut eller refresha eller nåt.',
      true
    )
  }

  closeMessage() {
    this.setState({ message: null })
  }

  showMessage(title, content, displayReloadCloseText) {
    this.setState({
      displayReloadCloseText,
      message: {
        title,
        content,
      },
    })
  }

  render() {
    const { setLoading } = this.props
    const { message } = this.state

    if (message !== null) {
      const { displayReloadCloseText } = this.state
      const { title, content } = message
      return (
        <>
          <h3>{title}</h3>
          <p>{content}</p>
          <button type="button" onClick={this.closeMessage}>
            {displayReloadCloseText ? 'Ladda om sidan' : 'Stäng'}
          </button>
        </>
      )
    }

    return (
      <Get
        endpoint="/voting/votes/?current=true"
        onError={this.onRequestFailed}
      >
        {votes => (
          <>
            <h1>D-cide</h1>
            <ActiveVote
              votes={votes}
              onMessage={this.showMessage}
              setLoading={setLoading}
            />
          </>
        )}
      </Get>
    )
  }
}

export default Vote
