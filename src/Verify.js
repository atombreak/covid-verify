import React, { Component, createRef } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeftIcon as BackIcon } from '@heroicons/react/solid';
import Scanner from "./Scan.js";

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError() {

  }
  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render () {
   return this.state.error ?
    (<div className='p-4'>
      <h1 className='p-4 bg-red-400 font-medium text-lg'> Something went wrong </h1>
    </div>
    ) : this.props.children;
  }

}


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameras: [],
        };
        this.constraints = {
            video: {
            facingMode: 'enviroment',
            height: { ideal: 4000 },
            width: { ideal: 4000 }
            }
        }
        this.background = createRef();
        this.ref = createRef();
    }
    componentDidMount() {
        if (navigator.mediaDevices.getUserMedia) {
     navigator.mediaDevices.enumerateDevices()
    .then(devices => {
    devices = devices.filter(device => {
      return device.kind === 'videoinput';
    });
    this.setState({
        cameras: devices
    });
    // alert(JSON.stringify(devices));
    let back = devices.filter(devices => {
      return /facing\sback/.test(devices.label) || /back/.test(devices.label);
    })[0];
    // alert(JSON.stringify(back))
    if(back) {
    // constraints.video.deviceId = { exact: back.deviceId };
    }
    this.startScan();
    // constraints.video.deviceId = { exact: '1237488' };
  });
}
    }
    startScan() {

    navigator.mediaDevices.getUserMedia(this.constraints)
  .then((stream) => {
    
    this.background.current.srcObject = stream;

   })
  .catch(function (error) {
      console.log(error);
    console.log("Something went wrong!");
  });
  return;
  /*
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
  scanner.addListener('scan', function (content) {
    alert(content)
  });
  Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanned.style.display = "block"
    scanner.start(cameras[0]);
  } else {
    console.error('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});
*/
    }
    render() {
        return (
          
            <div className='bg-black min-h-screen w-screen relative'>
                <div className='flex absolute z-50 w-full p-4 justify-between items-center'>
                    <Link to='/' className=''><BackIcon className='h-8 text-white w-8' /> </Link>
                    <select value='default' onChange={this.startScan} className='b2 p-1 px-8 rounded-lg'>
                        <option disabled className='text-white' value='default'> Select Camera </option>
                        {
                            this.state.cameras.map(camera => {
                                return <option key={camera} className='text-white' value={camera.id}> { camera.label } </option>
                            })
                        }
                    </select>
                </div>
                <div className='absolute w-full h-full'>
                  <video ref={this.background} className='h-screen w-screen absolute -z-10 object-cover' />
                </div>
                <div className='flex h-screen justify-center items-center relative'>
                <ErrorBoundary><Scanner/></ErrorBoundary>
                </div>
            </div>
        )
    }
}

export default Verify;
