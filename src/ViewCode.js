
import { Component, createRef } from 'react';
import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

const Print = props => {
    return (
        <div className='w-full min-h-screen'>
            { !props.data.error && 
            <>
            <div className='w-full h-1/6 bg-green-300 mb-1 p-3'>
                <h2 className='text-center text-xl font-bold text-white'>COVID-19 VACCINE CERTIFICATE</h2>
            </div>
            <div className='w-full h-auto py-3 flex content-start justify-around'>
                <div className='w-1/2 h-auto pl-6  flex content-center justify-center flex-col border-r-4 border-orange-400'>
                    <h2 className='text-xl text-black font-bold'> Personal INFO</h2>
                    <p className='text-xl text-black'>{ props.data.name }</p>
                    <p className='text-xl text-black'>{ props.data.nrc }</p>                    
                    <p className='text-xl text-black'>{ props.data.tel }</p>
                </div>
                <div className='w-1/2 h-auto p-17'>
                <div className='w-1/2 h-auto pl-6  flex content-center justify-center flex-col'>
                    <h2 className='text-xl text-black font-bold'> Address</h2>
                    <p className='text-xl text-black'>{ props.data.town }</p>
                    <p className='text-xl text-black'>{ props.data.address }</p>
                </div>
                </div>
            </div>
            <div className='w-full flex content-center justify-around h-auto p-4 mt-4'>
                <div className='w-3/12 h-full '>
                    <div className='w-full h-16 my-2 p-2  flex justify-center content-center'>
                    <img src='/flag_of_zambia.jpeg' className='h-full max-w-full object-center'/>
                    </div>
                    <div className='w-full h-16 my-2  flex justify-center content-center'>
                    <img src='/kot.jpg' className='h-full max-w-full object-center'/>
                    </div>
                    <div className='w-full h-16 my-2  flex justify-center content-center'>
                    <img src='/zn.jpg' className='h-full max-w-full object-center'/>
                    </div>
                </div>
                <div className='w-7/12 flex justify-around items-center bg-green-500'>
                    <QRCode value={props.url} size={200} background='#00ff00' level={'H'} renderAs="canvas"/>
                </div>
            </div>
            
            </>
    }
            <div className='mt-4 p-4'>
            { (props.data.canDownload && !props.data.error) && <button onClick={props.download} className='p-2 px-10 mb-3 bg-green-500 text-white rounded-lg mx-auto block'> Download Certificate </button>
}
            {
            props.data.nrc && !props.data.error ?
            (
            <>
            <p className='text-orange-400 text-center font-bold text-lg'> Vaccinted ! </p>
            <div className='w-full h-5/12 mx-auto bg-blue-300'>
            </div>
            </>
            ) : !props.data.error ? <p className='text-lg text-gray'> loading... </p> : null
    
    }

    {
     props.data.error && (
            <h2 className='bg-red-200 text-red-400 p-5 text-lg font-medium'> User is not vaccinated or invalid qrcode </h2>
        )
    }
                
            </div>
            </div>
    )
}

// const url = 'http://localhost:8000/users/';
const url = '/api/users';

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
        let id = window.location.pathname.split('/');
        id.shift(); id.shift();
        id = id.join('');
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
        alert(window.innerWidth);
        let pdf = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: window.innerWidth > 500 ? "a1" : [window.innerWidth, window.innerHeight],
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
