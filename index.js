import React from 'react'
import PropTypes from 'prop-types'
import { HCCanvas, HCThumbnails } from './styled'

class HorizontalCarousel extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    gutter: PropTypes.number
  }

  constructor (props) {
    super(props)
  }

  renderSlideCanvas = () => {
    const { contents } = this.props
    const liContents = contents.map((url, index) => (
      <li key={`hc-li-contents-${url}`}>
        <img src={url}/>
      </li>
    ))

    return <ol>{liContents}</ol>
  }

  handleThumbnailClick = (event, index) => {
    const canvas = document.querySelectorAll(`.hc-canvas li`)[index]
    const canvasLeft = canvas.offsetLeft

    const group = document.querySelector('.hc-canvas ol')
    group.style.marginLeft = `-${canvasLeft}px`
  }

  renderSlideThumbnails = () => {
    const { contents } = this.props
    const divContents = contents.map((url, index) => (
      <div
        onClick={e => this.handleThumbnailClick(e, index)}
        className="list"
        key={`hc-thumbnails-contents-${url}`}
      >
        <img src={url}/>
      </div>
    ))

    return <div className="hc-wrapper">{divContents}</div>
  }

  render () {
    const { contents, ...restProps } = this.props
    return (
      <div className="hc-container">
        <HCCanvas className="hc-canvas" {...restProps}>
          {this.renderSlideCanvas()}
        </HCCanvas>
        <HCThumbnails className="hc-thumbnails">
          {this.renderSlideThumbnails()}
        </HCThumbnails>
      </div>
    )
  }
}

export default  HorizontalCarousel
