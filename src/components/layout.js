import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Cookies from 'js-cookie'

import { get } from './request/'
import '../scss/general.scss'
import style from '../scss/layout.module.scss'

import Pixels from './pixels'
import SideMenu from './sideMenu'

import TopBar from './topBar'
import Content from './content'
import { BASE_URL } from '../js/config'

export const LoadingContext = React.createContext({
  status: false,
  set: () => {},
})
export const UserContext = React.createContext({})

class Layout extends Component {
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
    // this needs to be state, otherwise the build version will use the undefined href from SSR.
    this.setState({
      loginUrl:
        BASE_URL + '/account/token?redirect=' + this.props.location.href,
    })

    get('/account/user/me')
      .then(res => {
        this.success(res.data)
      })
      .catch(this.failure)
    this.setLoading(true)
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

  getContent() {
    if (this.state.loading.status && !this.state.success) {
      return <></>
    }

    if (this.state.success) {
      return <Content>{this.props.children}</Content>
    }

    return (
      <Content>
        <a href="#" className="button" onClick={Layout.logout}>
          Logga ut
        </a>
        <p>Inloggningen misslyckades, testa igen.</p>
      </Content>
    )
  }

  static logout() {
    Cookies.remove('token')
    window.location.reload()
  }

  render() {
    let content = this.getContent()

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
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <LoadingContext.Provider value={this.state.loading}>
              <UserContext.Provider value={this.state.user}>
                <div className={style.app}>
                  <div className={style.pixels}>
                    <Pixels loading={this.state.loading.status} />
                  </div>
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
                    <div className={style.container}>
                      {token !== undefined ? (
                        content
                      ) : (
                        <Content>
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
                        </Content>
                      )}
                    </div>
                  </div>
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
