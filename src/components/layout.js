import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Cookies from 'js-cookie'

import { get } from './request'
import '../scss/general.scss'
import style from '../scss/layout.module.scss'

import SideMenu from './sideMenu'

import TopBar from './topBar'
import BigPixels from './bigPixels'
import { BASE_URL } from '../js/config'
import ModalHandler from './modal/modalHandler'

export const LoadingContext = React.createContext({
  status: false,
  set: () => {},
})
export const UserContext = React.createContext({})

class Layout extends Component {
  static logout() {
    Cookies.remove('token')
  }

  constructor(props) {
    super(props)

    this.setUser = this.setUser.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.success = this.success.bind(this)
    this.failure = this.failure.bind(this)

    this.state = {
      loginUrl: undefined,
      sideMenuOpen: false,
      loading: { status: false, set: this.setLoading },
      user: { user: undefined, set: this.setUser },
    }
  }

  componentDidMount() {
    const { location } = this.props

    // this needs to be state, otherwise the build version will use the undefined href from SSR.
    this.setState({
      loginUrl: `${BASE_URL}/account/token?redirect=${location.href}`,
    })

    get('/account/user/me/')
      .then(res => {
        this.success(res.data)
      })
      .catch(this.failure)
    this.setLoading(true)
  }

  getContent() {
    const { loading, success } = this.state
    const { children } = this.props

    if (loading.status && !success) {
      return <></>
    }

    if (success) {
      return children
    }

    return (
      <BigPixels>
        <p>Inloggningen misslyckades, testa igen.</p>
        <a href="#" className="button" onClick={Layout.logout}>
          Logga ut
        </a>
      </BigPixels>
    )
  }

  success(data) {
    this.setLoading(false)
    this.setUser(data)
    this.setState({ success: true })
  }

  failure() {
    this.setLoading(false)
    this.setState({ success: false })
  }

  render() {
    const content = this.getContent()

    const { loginUrl } = this.state

    const token = Cookies.get('token')

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content: 'Datateknologsektionens medlemsportal',
                },
                {
                  name: 'keywords',
                  content: 'medlem, d-sektionen, datateknologsektionen',
                },
              ]}
            >
              <html lang="sv" />
            </Helmet>
            <LoadingContext.Provider value={this.state.loading}>
              <UserContext.Provider value={this.state.user}>
                <div className={style.app}>
                  <ModalHandler>
                    <div className={style.containerWrapper}>
                      <SideMenu
                        open={this.state.sideMenuOpen}
                        close={() => this.setState({ sideMenuOpen: false })}
                      />
                      <TopBar
                        user={this.state.user.user}
                        logout={Layout.logout}
                        openMenu={() => this.setState({ sideMenuOpen: true })}
                      />
                      <div className={style.contentWrapper}>
                        {token !== undefined ? (
                          content
                        ) : (
                          <BigPixels>
                            <p>
                              Genom att logga in här kan du komma åt
                              D&#8209;sektionens medlemstjänster, inloggningen
                              sker via LiUs centrala inloggningssystem.
                            </p>
                            <p>
                              Genom att logga in godkänner du att dina
                              personuppgifter hanteras i enlighet med{' '}
                              <a href="https://d-sektionen.se/wp-content/uploads/2018/05/Policy-datahantering-D-sektionen.pdf">
                                D&#8209;sektionens datahanteringspolicy
                              </a>
                              .
                            </p>
                            <a href={loginUrl} className="button">
                              Logga in
                            </a>
                          </BigPixels>
                        )}
                      </div>
                    </div>
                  </ModalHandler>
                </div>
              </UserContext.Provider>
            </LoadingContext.Provider>
          </>
        )}
      />
    )
  }

  setLoading(bool) {
    this.setState({ loading: { status: bool, set: this.setLoading } })
  }

  setUser(user) {
    this.setState({ user: { user, set: this.setUser } })
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
