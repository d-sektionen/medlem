import React, { Component } from 'react'
import { post } from '../request/'

class VoteForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkedId: -1,
    }

    this.onAlternativeChecked = this.onAlternativeChecked.bind(this)
    this.placeVote = this.placeVote.bind(this)
    this.showMessage = this.props.onMessage
  }

  onAlternativeChecked(alternativeId) {
    this.setState({
      checkedId: alternativeId,
    })
  }

  placeVote() {
    const { setLoading, vote } = this.props

    const showMessage = this.showMessage
    const voteData = {
      vote_id: vote.id,
      alternative_id: this.state.checkedId,
    }

    setLoading(true)
    post('/voting/made_votes/', voteData)
      .then(res => {
        setLoading(false)
        showMessage('Tack!', 'Din röst har registrerats')
      })
      .catch(error => {
        setLoading(false)
        showMessage('Ett fel uppstod', error)
      })
  }

  render() {
    const { vote } = this.props
    const { checkedId } = this.state

    const votingDisabled = checkedId === -1
    const buttonText = votingDisabled ? 'Välj ett alternativ' : 'Rösta'

    return (
      <div>
        <strong>{vote.question}</strong>
        <ul>
          {vote.alternatives.map(({ text, id }) => (
            <li key={id}>
              <label>
                <input
                  type="radio"
                  checked={checkedId === id}
                  onChange={() => this.onAlternativeChecked(id)}
                />{' '}
                {text}
              </label>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={votingDisabled}
          onClick={this.placeVote}
        >
          {buttonText}
        </button>
      </div>
    )
  }
}

export default VoteForm
