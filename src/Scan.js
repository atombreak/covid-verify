import QrReader from 'react-qr-reader';
import {Component, createRef } from 'react';
import { Link } from 'react-router-dom';
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
      alert(data);
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
      <div className='w-full h-4/10 mx-auto md:w-5/12'>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%', height:'100%', margin: "auto" }}
          facingMode= {'environment'}
          resolution= {1000}
        />
        <Link to={'/view-code/'+this.state.finalLink} ref={this.ref} className='hidden'></Link>
      </div>
    )
  }
}