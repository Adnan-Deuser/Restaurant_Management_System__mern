import React from 'react'

const Loader = () => {
  return (
<div class="fullscreen-loader">
  <div class="spinner">
    <div class="spinner-dot"></div>
    <div class="spinner-core"></div>
  </div>
  <span class="loader-label">Loading</span>
</div>
  )
}

export default Loader