import { monthNames } from '../constants';

import Amazing from '../svgs/Amazing';
import Average from '../svgs/Average';
import Difficult from '../svgs/Difficult';
import Great from '../svgs/Great';
import Tough from '../svgs/Tough';


function DayDetail(props) {
    const date = new Date(props.detail * 86400000);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();


    return (
        <div className='grid w-[22%] mt-20 ml-10 content-start'>
            {props.detail ?
                <p className="text-center font-semibold text-black text-xl">{monthNames[month] + " " + day + ", " + year}</p>
                :
                <p className='text-center text-black text-xl'>click to see detail</p>
            }
            {props.detail &&
                <div className='grid'>
                    <p className='text-center text-black italic text-xl mt-10'>How you feel today?</p>

                    <div className='flex mt-5 place-content-between'>
                        <Amazing mood={props.mood} setMood={props.setMood} />
                        <Great mood={props.mood} setMood={props.setMood} />
                        <Average mood={props.mood} setMood={props.setMood} />
                        <Difficult mood={props.mood} setMood={props.setMood} />
                        <Tough mood={props.mood} setMood={props.setMood} />
                    </div>


                    <button className='justify-self-center bg-blue-600 hover:bg-blue-800 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-bold text-2xl rounded-full px-5 py-2 w-min mt-10'
                        onClick={() => props.handleAddMood(props.detail, props.mood)} disabled={!props.mood || !props.detail}>OK!</button>
                </div>
            }
        </div>
    )
}

export default DayDetail
