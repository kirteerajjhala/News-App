import React, { Component } from 'react'

export default class NewIteam extends Component {
  render() {
    let {title ,description ,imageURL ,newURl,author,date,source} =this.props;
    return (
      <div>
    <div className="card" >
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left :'90%' ,zIndex :'1'}}>
      {source}
    <span class="visually-hidden">unread messages</span>
  </span>
  <img src={(imageURL===null)?"https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/05/Aston-Martin_Apple-CarPlay-Ultra_03.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1":imageURL} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}... </p>
    <p className='card-text'><small className='text-muted'>By {!author ?"Unkonwn" :author} on {new Date(date).toGMTString()}</small></p>
    <a href={newURl} className="btn btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}
