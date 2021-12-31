
import React, { Component } from 'react';

class CaseData extends React.Component {
    render() {
        return (
            <div className='px-4 mb-4 w-3/6 md:w-3/12'>
                <div className={ 'card shadow-md p-6 rounded-sm '+ this.props.color } >
                <h2 className='text-md font-semibold'> { this.props.title } </h2>
                 { this.props.value === null ? 
                 <p className='text-gray-500 mt-3'> loading ... </p> : 
                 <p className='text-2xl mt-3 font-bold'> { this.props.value } </p> 
                }
            </div>
            </div>
        )
    }
}

export default CaseData;