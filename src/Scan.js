import QRScan from 'qrscan';
import {Component, createRef } from 'react';
import { Link } from 'react-router-dom';

// const url = 'http://localhost:8000/users/';
const url = '/api/users';

export default class Scanner extends Component {
    constructor(props){
        super(props);
        this.state = {
        result: 'No result',
        finalLink: '',
        }
        this.ref = createRef();
      }
  handleScan = data => {
    if (data) {
      // (data);
      this.setState({
        finalLink: data
      });
     this.ref.current.click();
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div className='w-full overflow-x-hidden h-4/10 mx-auto md:w-5/12 relative'>
        <div className='loaderA'></div>
        <QRScan
          delay={4}
          onError={this.handleError}
          onFind={this.handleScan}
          facingMode= {'environment'}
          size={300}
        />
        <Link to={'/view-code/'+this.state.finalLink} ref={this.ref} className='hidden'></Link>
      </div>
    )
  }
}