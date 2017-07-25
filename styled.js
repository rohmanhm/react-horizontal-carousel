import styled from 'styled-components'

export const HCCanvas = styled.div`
  height: ${props => props.height ? props.height : 400}px;
  width: ${props => props.width ? props.width : 800}px;
  overflow-y: hidden;
  padding: 0;
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

export const HCThumbnails = styled.div`
  .list {
    display: inline-block;
    margin: 0 2px;
    img {
      height: 40px;
    }
  }
`
