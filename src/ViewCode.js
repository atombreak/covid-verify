
import { Component, createRef } from 'react';
import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

const Print = props => {
    return (
        <div className='w-full p-5 min-h-screen'>
            { !props.data.error && 
            <>
            <div className='w-full flex justify-around items-center'>
            <QRCode value={props.url} size={300} background='#00ff00' level={'H'} renderAs="canvas"/>
            
            </div>
            </>
    }
            <div className='mt-4 p-4'>
            { props.data.canDownload && <button onClick={props.download} className='p-2 px-10 mb-3 bg-green-500 text-white rounded-lg mx-auto block'> Download Certificate </button>
}
            {
            props.data.nrc && !props.data.error ?
            (
            <>
            <h3 className='text-md text-center'> <b> Name: </b> { props.data.name } </h3>
            <p className='text-md text-center'> <b> NRC: </b>  { props.data.nrc } </p>
            <p className='text-md text-center'> <b> Tel: </b>  { props.data.tel } </p>
            <p className='text-md text-center'> <b> Address: </b>  { props.data.address } </p>
            <p className='text-md text-center'> <b> Town: </b>  { props.data.town } </p>
            <p className='text-green-500 text-center font-bold text-lg'> Vaccinted ! </p>
            <div className='w-full h-5/12 mx-auto bg-blue-300'>
                
            </div>
            </>
            ) : !props.data.error ? <p className='text-lg text-gray'> loading... </p> : null
    
    }

    {
     props.error && (
            <h2 className='bg-red-200 text-red-400 p-5 text-lg font-medium'> User is not vaccinated or invalid qrcode </h2>
        )
    }
                
            </div>
            </div>
    )
}

const url = 'http://localhost:8000/users/';

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
            canDownload: true
        };
        this.qrcode = createRef();
    }

    componentDidMount() {
        let id = window.location.pathname.split('/')[2];
        fetch(url+'?nrc='+id)
        .then(response => response.json())
        .then(data => {
            data = data[0]
            if(data && data.nrc) {
           // alert(JSON.stringify(data));
            this.setState(data)
            } else {
                this.setState({ error: true });
            }
        });
    }

    downloadQRCode() {

        let string = renderToString(<Print data={this.state} url={this.state.nrc} />);
        let pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: "a1",
            putOnlyUsedFonts: true
        });
        this.setState({ canDownload: false });
        pdf.html(document.body, {
           callback: doc => {
                doc.save('vaccine-certifivate-'+this.state.nrc);
                this.setState({ canDownload: true });
           }
       });

        /*
        let canvas = document.querySelector("canvas");
        let url = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "vaccine certificate";
        link.href = url;
        link.dataset.downloadurl = ["image/png",link.download,link.href].join(':');
        link.click();
   */ 
    }

    render() {
        let url = window.location.pathname.split('/')[2];
        return (
            <>
            <Print data={this.state} url={url} download={e => this.downloadQRCode() }> </Print>
    
            </>
            
        )
    }
}

export default ViewCode;
