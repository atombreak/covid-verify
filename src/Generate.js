import React, { Component, createRef } from 'react';
import {Link} from 'react-router-dom';
import { UserIcon, CalendarIcon, IdentificationIcon, LocationMarkerIcon, MapIcon, PhoneIcon } from '@heroicons/react/outline';

import { Context } from './data-context.js';

class Generate extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            error: false, errorMesage: '',
            finalLink: '/view-code/'
        };
        this.nrc = createRef();
        this.name = createRef();
        this.tel = createRef();
        this.dob = createRef();
        this.address = createRef();
        this.town = createRef();
        this.form = createRef();
        this.finalLink = createRef();
        this.generateCode = this.generateCode.bind(this);
    }
    generateCode(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/users/'+this.nrc.current.value)
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                alert(1)
            } else {
                let form = {
                    nrc: this.nrc.current.value,
                    name: this.name.current.value,
                    dob: this.dob.current.value,
                    address: this.address.current.value,
                    tel: this.tel.current.value,
                    town: this.town.current.value
                }
                fetch('http://127.0.0.1:8000/users/', {
                    method: 'POST', 
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json'
                      }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.id) {
                        this.setState({ finalLink: '/view-code/'+data.id });
                        this.finalLink.current.click();
                    } else {
                        alert('Something went wrong')
                    }
                })

            }
        })
    }

    render() {
        return (
            <div className='min-h-screen w-full flex justify-around items-center p-7 bg-gray-200'>
                <div className='form-container bg-white px-4 py-8 rounded-lg shadow-md'>
                    <form className='' ref={this.form} onSubmit={this.generateCode} >
                        <h1 className='text-3xl font-bold mb-6'>
                         Generate Vaccine Certificate
                        </h1>
                        <label htmlFor='name' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <UserIcon className='w-5 h-5' />
                            <input id='name' ref={this.name} type='text' className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Enter your full names'/>
                        </label>

                        <label htmlFor='dob' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <CalendarIcon className='w-5 h-5' />
                            <input id='dob' ref={this.dob} type='text' className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Enter your date of birth (dd/mm/yy)'/>
                        </label>

                        <label htmlFor='id' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <IdentificationIcon className='w-5 h-5' />
                            <input id='id' ref={this.nrc} type='number' className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Passport or NRC number '/>
                        </label>

                        <label htmlFor='addresss' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <LocationMarkerIcon className='w-5 h-5' />
                            <input id='address' ref={this.address} type='text' className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Enter your residential adderess'/>
                        </label>

                        <label htmlFor='town' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <PhoneIcon className='w-5 h-5' />
                            <input id='town' type='text' ref={this.town} className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Enter the town you reside in'/>
                        </label>

                        <label htmlFor='tel' className='flex rounded-md mb-4 px-2 py-2 block border-color-black border-2 items-center justify-around'>
                            <MapIcon className='w-5 h-5' />
                            <input id='tel' type='tel' ref={this.tel} className='w-full ml-2 focus:border-0 focus:outline-0 h-full' placeholder='Enter your phone number'/>
                        </label>
                        <button className='block mt-3 bg-green-500 hover:bg-green-600 text-white rounded-lg  w-full font-medium py-2 px-10'> Generate </button>
                        <p className='text-md p-2'>
                            <Link to={ this.state.finalLink } ref={ this.finalLink } className='hidden'>  </Link>
                            Already <Link to='/' className='text-orange-400 font-medium'>verified by us?</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

Generate.contextType = Context;

export default Generate;