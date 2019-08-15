import React, { Component } from 'react'
import style from '../../scss/pixels.module.scss'

/**
 * Displays pixels the D-sektionen logo.
 * While the prop "loading" is true it will also animate
 * it with random colors for use as a loader.
 */
class Pixels extends Component {
  constructor() {
    super()

    this.dColors = {
      blue: '#20407C',
      yellow: '#F7E623',
      cerise: '#E5398D',
      brown: '#754022',
      green: '#70BD44',
    }

    this.originalPixels = {
      'M52.742 74.106h10.769v10.485H52.742z': this.dColors.blue,
      'M76.128 74.106h10.769v10.485H76.128z': this.dColors.green,
      'M87.825 74.106h10.764v10.485H87.825z': this.dColors.cerise,
      'M98.589 96H87.825V85.517h10.764z': this.dColors.yellow,
      'M98.589 107.411H87.825V96.926h10.764z': this.dColors.brown,
      'M87.825 131.156h10.764v10.484H87.825z': this.dColors.brown,
      'M86.897 107.411H76.128V96.926h10.769z': this.dColors.blue,
      'M64.436 119.748h10.766v10.483H64.436z': this.dColors.brown,
      'M75.202 96H64.436V85.517h10.766z': this.dColors.brown,
      'M87.825 142.567h10.764v10.483H87.825z': this.dColors.yellow,
      'M99.516 142.567h10.77v10.483h-10.77z': this.dColors.cerise,
      'M121.978 164.46h-10.766v-10.483h10.766z': this.dColors.green,
      'M63.51 118.821H52.741v-10.485H63.51z': this.dColors.blue,
      'M75.202 118.821H64.436v-10.485h10.766z': this.dColors.green,
      'M41.049 74.106h10.767v10.485H41.049z': this.dColors.brown,
      'M41.049 96.926h10.767v10.485H41.049z': this.dColors.yellow,
      'M52.742 131.156h10.769v10.484H52.742z': this.dColors.yellow,
      'M75.202 153.05H64.436v-10.483h10.766z': this.dColors.blue,
      'M29.355 119.748h10.768v10.483H29.355z': this.dColors.cerise,
      'M87.825 165.386h10.764v10.485H87.825z': this.dColors.brown,
      'M134.597 165.386h10.768v10.485h-10.768z': this.dColors.cerise,
      'M64.436 62.697h10.766v10.482H64.436z': this.dColors.yellow,
      'M29.355 62.697h10.768v10.482H29.355z': this.dColors.green,
      'M76.128 51.284h10.769V61.77H76.128z': this.dColors.blue,
      'M75.202 107.411H64.436V96.926h10.766z': this.dColors.cerise,
      'M87.825 108.336h10.766v10.485H87.825z': this.dColors.cerise,
      'M63.51 96H52.741V85.517H63.51z': this.dColors.green,
      'M99.516 62.697h10.77v10.482h-10.77z': this.dColors.brown,
    }

    this.state = {
      pixels: this.originalPixels,
    }

    this.setRandomColors = this.setRandomColors.bind(this)
  }

  componentDidMount() {
    this.updateLoaderInterval()
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props
    if (prevProps.loading !== loading) this.updateLoaderInterval()
  }

  setRandomColors() {
    this.setState({
      pixels: Object.keys(this.originalPixels).reduce(
        (newState, key) => ({ ...newState, [key]: this.randomColor() }),
        {}
      ),
    })
  }

  updateLoaderInterval() {
    const { loading } = this.props
    if (loading) {
      this.interval = window.setInterval(this.setRandomColors, 300)
    } else {
      if (this.interval) window.clearInterval(this.interval)
      this.interval = null
      this.setState({ pixels: this.originalPixels })
    }
  }

  randomColor() {
    const keys = Object.keys(this.dColors)
    return this.dColors[keys[(keys.length * Math.random()) << 0]]
  }

  render() {
    const { pixels } = this.state
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154.68 166.116">
        <defs>
          <clipPath id="a">
            <path d="M0 226.77h850.39V0H0z" />
          </clipPath>
        </defs>
        <g
          clipPath="url(#a)"
          transform="matrix(1.33333 0 0 -1.33333 -39.13999942 234.4946576)"
        >
          {Object.keys(pixels).map(key => (
            <path key={key} className={style.path} d={key} fill={pixels[key]} />
          ))}
        </g>
      </svg>
    )
  }
}

export default Pixels
