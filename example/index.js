import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HorizontalCarousel from '../'

class App extends Component {
  render () {
    const contents = [
      'https://www.w3schools.com/css/img_fjords.jpg',
      'https://www.w3schools.com/css/img_lights.jpg',
      'https://www.w3schools.com/css/img_forest.jpg'
    ]

    return (
      <div>
        <HorizontalCarousel
          width={800}
          contents={contents}
          animation={true}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
