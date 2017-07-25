import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { HCCanvas, HCThumbnails } from './styled'

class HorizontalCarousel extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    gutter: PropTypes.number,
    animation: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      leftActiveCanvas: 0,
      scrollOnClick: false
    }

    this.debouncedCanvasScroll = debounce(this.debouncedCanvasScroll.bind(this), 100)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.scrollOnClick) {
      const group = document.querySelector('.hc-canvas')
      if (this.state.leftActiveCanvas > nextState.leftActiveCanvas) {
        this.animateScrollLeft(group, nextState.leftActiveCanvas, -10)
      } else {
        this.animateScrollLeft(group, nextState.leftActiveCanvas)
      }
    }
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

  animateScrollLeft = (el, leftCount, acc = 10) => {
    let time = this.state.leftActiveCanvas
    const interval = window.setInterval(() => {
      time += acc

      el.scrollLeft = time
      if (time >= leftCount && acc > 0 || time <= leftCount && acc < 0) {
        el.scrollLeft = leftCount
        this.setState({ scrollOnClick: false })
        return window.clearInterval(interval)
      }
    }, 1)
  }

  handleThumbnailClick = (event, index) => {
    const canvas = document.querySelectorAll(`.hc-canvas li`)[index]
    this.setState({ scrollOnClick: true })
    const canvasLeft = canvas.offsetLeft
    if (this.props.animation) {
      this.setState({ leftActiveCanvas: canvasLeft })
    } else {
      const group = document.querySelector('.hc-canvas')
      group.scrollLeft = canvasLeft
      this.setState({ scrollOnClick: false })
    }
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

  debouncedCanvasScroll = (event) => {
    const canvasLeft = document.querySelector('.hc-canvas').scrollLeft
    this.setState({
      leftActiveCanvas: canvasLeft
    })
  }

  handleCanvasScroll = (event) => {
    event.persist()
    this.debouncedCanvasScroll(event)
  }

  render () {
    const { contents, ...restProps } = this.props
    return (
      <div className="hc-container">
        <HCCanvas
          className="hc-canvas"
          {...restProps}
          onScroll={this.handleCanvasScroll}
        >
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
