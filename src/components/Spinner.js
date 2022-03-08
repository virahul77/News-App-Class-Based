import React, { Component } from 'react'
import Loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center mb-3'>
        <img src={Loading} alt="Please Wait" />
      </div>
    )
  }
} 

export default Spinner
