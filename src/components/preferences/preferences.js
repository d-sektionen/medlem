import React, { Component } from 'react'

import { put, patch } from '../request'

import style from '../../scss/preferences.module.scss'
import { Button } from '../ui/buttons'

class Preferences extends Component {
  constructor(props) {
    super(props)

    if (!props.user.profile) props.user.profile = {}

    this.state = {
      infomailSubscriber: props.user.profile.infomail_subscriber,
      liuCardId: props.user.profile.liu_card_id,
      firstName: props.user.first_name,
      lastName: props.user.last_name,
      errors: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(field, event, checkbox = false) {
    if (checkbox) this.setState({ [field]: event.target.checked })
    else this.setState({ [field]: event.target.value })
  }

  handleSubmit(event) {
    const { setLoading, setUser } = this.props

    // reset errors
    this.setState({ error: undefined, success: undefined, errors: {} })

    setLoading(true)
    patch('/account/user/me/', {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      profile: {
        liu_card_id: this.state.liuCardId,
        infomail_subscriber: this.state.infomailSubscriber,
      },
    })
      .then(res => {
        setLoading(false)
        if (res.status < 300) {
          this.setState({ success: 'Ändringarna har sparats.' })
          setUser(res.data)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        if (!err.response) this.setState({ error: 'Nätverksfel.' })
        else if (err.response.status === 400)
          this.setState({ errors: err.response.data })
        else this.setState({ error: 'Något gick fel.' })
      })
    event.preventDefault()
  }

  render() {
    const { user, title } = this.props
    const {
      firstName,
      lastName,
      liuCardId,
      infomailSubscriber,
      errors,
      error,
      success,
    } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{title}</h1>
        <p>
          <strong>
            {user.membership
              ? `Du är sektionsmedlem.`
              : 'Du saknar sektionsmedlemsskap.'}
          </strong>
        </p>
        <div>
          <label className={style.inputLabel}>
            Förnamn:
            <input
              value={firstName}
              onChange={e => this.handleChange('firstName', e)}
            />
          </label>
          {errors.first_name && (
            <div className={style.error}>{errors.first_name}</div>
          )}
        </div>
        <div>
          <label className={style.inputLabel}>
            Efternamn:
            <input
              value={lastName}
              onChange={e => this.handleChange('lastName', e)}
            />
          </label>
          {errors.last_name && (
            <div className={style.error}>{errors.last_name}</div>
          )}
        </div>
        <div>
          <label className={style.inputLabel}>
            LiU-kortnummer:
            <input
              value={liuCardId}
              onChange={e => this.handleChange('liuCardId', e)}
            />
          </label>
          {errors.profile && errors.profile.liu_card_id && (
            <div className={style.error}>{errors.profile.liu_card_id}</div>
          )}
        </div>
        <div>
          <label className={style.inputLabel}>
            Prenumerera på veckomailet:
            <input
              type="checkbox"
              checked={infomailSubscriber}
              onChange={e => this.handleChange('infomailSubscriber', e, true)}
            />
          </label>
          {errors.profile && errors.profile.infomail_subscriber && (
            <div className={style.error}>
              {errors.profile.infomail_subscriber}
            </div>
          )}
        </div>
        <div>
          <Button type="submit">Spara</Button>
        </div>
        <div>
          {error && <div className={style.error}>{error}</div>}
          {success && <div className={style.success}>{success}</div>}
        </div>
      </form>
    )
  }
}

export default Preferences
