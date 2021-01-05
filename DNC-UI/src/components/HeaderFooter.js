import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderFooter extends React.Component
{
  render()
  {
    return (
      
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary" style={{ transition: '1s ease',backgroundColor:'black'}} >
  <a class="navbar-brand" href="#">DNC</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
     
    </ul>
  </div>
</nav>
      
    )
  }
}
export default HeaderFooter;
