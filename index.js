import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import styled from 'styled-components'

const HCCanvas = styled.div`
  height: ${props => props.height ? props.height : 400}px;
  width: ${props => props.width ? props.width : 800}px;
  overflow-y: hidden;
  padding: 0;
  margin-bottom: 20px;
  ol {
    display: inline-flex;
    padding: 0;
    li {
      margin: 0 ${props => props.gutter ? props.gutter : 10}px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`

const HCThumbnails = styled.div`
  .list {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
`

const DivImg = styled.div`
  background-position: center;
  background-image: url('${props => props.src}');
  background-size: contain;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
`

class HorizontalCarousel extends React.Component {
  static propTypes = {
    // List of array images
    // example: ['abc.com/img1.jpg', 'abc.com/img2.jpg']
    contents: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    gutter: PropTypes.number,
    animation: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      // Save current position canvas scroll
      leftActiveCanvas: 0,
      // Detect scroll source from event onClick at Thumbnail lists
      scrollOnClick: false
    }

    // Debounce canvas scroll for performance costs
    this.debouncedCanvasScroll = debounce(this.debouncedCanvasScroll.bind(this), 100)
  }

  componentWillUpdate (nextProps, nextState) {
    // Just animating scroll if event
    // scroll source from canvas thumbnail onClick
    if (nextState.scrollOnClick) {
      const group = document.querySelector('.hc-canvas')
      if (this.state.leftActiveCanvas > nextState.leftActiveCanvas) {
        this.animateScrollLeft(group, nextState.leftActiveCanvas, -10)
      } else {
        this.animateScrollLeft(group, nextState.leftActiveCanvas)
      }
    }
  }

  /**
   * Render slide preview to Canvas
   * from contents props
   * 
   */
  renderSlideCanvas = () => {
    const { contents } = this.props
    const liContents = contents.map((url, index) => (
      <li key={`hc-li-contents-${url}`}>
        <img src={url}/>
      </li>
    ))

    return <ol>{liContents}</ol>
  }

  /**
   * Animating canvas scroll
   * if animate props is true
   * 
   */
  animateScrollLeft = (el, leftCount, acc = 10) => {
    let time = this.state.leftActiveCanvas
    const interval = window.setInterval(() => {
      time += acc

      el.scrollLeft = time
      // ============================
      // time <= leftCount && acc < 0
      // Means it's animating scroll right
      // ============================
      // time >= leftCount && acc > 0
      // Means it's animating scroll left
      if (time >= leftCount && acc > 0 || time <= leftCount && acc < 0) {
        el.scrollLeft = leftCount
        // Reset scroll source onClick
        this.setState({ scrollOnClick: false })
        return window.clearInterval(interval)
      }
    }, 1)
  }

  /**
   * Handle something when thumbnail list is clicked
   * From now, it just do scrollLeft
   * 
   */
  handleThumbnailClick = (event, index) => {
    const canvas = document.querySelectorAll(`.hc-canvas li`)[index]
    this.setState({ scrollOnClick: true })
    const canvasLeft = canvas.offsetLeft
    // This is checking whether user want to use animation
    if (this.props.animation) {
      this.setState({ leftActiveCanvas: canvasLeft })
    } else {
      const group = document.querySelector('.hc-canvas')
      group.scrollLeft = canvasLeft
      // Always reset scroll onClick source
      this.setState({ scrollOnClick: false })
    }
  }

  /**
   * Render thumbnails lists
   * from contents props
   * 
   */
  renderSlideThumbnails = () => {
    const { contents } = this.props
    const divContents = contents.map((url, index) => (
      <div
        onClick={e => this.handleThumbnailClick(e, index)}
        className="list"
        key={`hc-thumbnails-contents-${url}`}
      >
        <DivImg src={url}/>
      </div>
    ))

    return <div className="hc-thumbnails-lists">{divContents}</div>
  }

  /**
   * Debouncing canvas leftActiveCanvas position
   * Performance costs
   * 
   */
  debouncedCanvasScroll = (event) => {
    const canvasLeft = document.querySelector('.hc-canvas').scrollLeft
    this.setState({
      leftActiveCanvas: canvasLeft
    })
  }

  /**
   * Event pooling Performance reason
   * to debouncedCanvasScroll
   * 
   */
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
