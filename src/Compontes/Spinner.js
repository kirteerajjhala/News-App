import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div>
    <div className='text-center'>
    <div class="spinner-border " role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        </div>
      </div>
    )
  }
}
