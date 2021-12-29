
import { Component, createRef } from 'react';
import QRCode from 'qrcode.react';
import { findAllInRenderedTree } from 'react-dom/cjs/react-dom-test-utils.production.min';

class ViewCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            name: null,
            tel: null,
            address: null,         
            town: null,
            dob: null,
        };
        this.qrcode = createRef();
    }

    componentDidMount() {
        let url = window.location.pathname.split('/')[2];
        fetch('http://127.0.0.1:8000/users/'+url)
        .then(response => response.json())
        .then(data => {
            if(data.nrc) {
           // alert(JSON.stringify(data));
            this.setState(data)
            } else {
                this.setState({ error: true });
            }
        });
    }

    downloadQRCode() {
        let canvas = document.querySelector("canvas");
        let url = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "vaccine certificate";
        link.href = url;
        link.dataset.downloadurl = ["image/png",link.download,link.href].join(':');
        link.click();
    
    }

    render() {
        let url = window.location.pathname.split('/')[2];
        return (
            <div className='w-full p-5 min-h-screen'>
            { !this.state.error && 
            <>
            <div className='w-full bg-gray-100'>
            <QRCode value={url} style={{ width: '90vw', margin: "20px auto", height: '90vw', maxHeight: '500px'  }} level={'M'} renderAs="canvas"/>
            </div>
            <button onClick={ this.downloadQRCode } className='p-2 bg-green-300 rounded-lg shadow-sm block my-4 text-white font-bold'> Download Certificate </button>
            </>
    }
            <div className='mt-4 p-4'>
            {
            this.state.nrc && !this.error ?
            (
            <>
            <h3 className='text-md'> <b> Name: </b> { this.state.name } </h3>
            <p className='text-md'> <b> NRC: </b>  { this.state.nrc } </p>
            <p className='text-md'> <b> Tel: </b>  { this.state.tel } </p>
            <p className='text-md'> <b> Address: </b>  { this.state.address } </p>
            <p className='text-md'> <b> Town: </b>  { this.state.town } </p>
            <p className='text-green-500 font-bold text-lg'> Vaccinted ! </p>
            <div className='w-full h-5/12 bg-blue-300'>
                
            </div>
            </>
            ) : !this.state.error ? <p className='text-lg text-gray'> loading... </p> : null
    
    }

    {
     this.state.error && (
            <h2 className='bg-red-200 text-red-400 p-5 text-lg font-medium'> User is not vaccinated or invalid qrcode </h2>
        )
    }
                
            </div>
            </div>
        )
    }
}

export default ViewCode;
