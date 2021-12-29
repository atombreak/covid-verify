
import { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid';


function FAQ (props) {
    const [active, setActive ] = useState(false);
    return (
        <div onClick={e => setActive(!active)} className="faq p-4 md:px-10 hover:bg-gray-300 bg-gray-200">
            <div className="flex justify-between items-center">
                <h1 className='font-bold text-xl mb-2'> { props.data.question } </h1>
                <button className="h-5 flex items-center justify-center font-bold w-5 rounded-full bg-gray-500 hover:bg-white hover:text-green-400">
                    { active ?  <ChevronDownIcon className='w-4 h-4' /> : <ChevronRightIcon className='w-4 h-4' /> }
                </button>
            </div>
            { active && (
            <>
            <div className='w-20 bg-green-400 mb-3 h-1 rounded-sm'> </div>
            <p className="text-md"> { props.data.answer } </p>
            </>
            )}
        </div>
    )
}

export default FAQ;