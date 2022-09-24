import React from 'react'

function DayDetail({ detail }) {
    const date = new Date(detail*86400000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return (
        <div>
            {
                detail ?
                    <p className="text-center text-black text-xl">{year + "/" + month + "/" + day}</p>
                    :
                    <p className='text-center text-black text-xl'>click to see detail</p>
            }
        </div>
    )
}

export default DayDetail
