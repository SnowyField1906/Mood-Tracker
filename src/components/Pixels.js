import { monthNames } from '../constants'

function Pixels(props) {
    const isLeap = (year) => new Date(year, 1, 29).getDate() === 29
    const isToday = (year, month, day) => {
        const today = new Date()
        return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
    }


    const monthDays = [31, 28 + isLeap(props.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const className = ['bg-gray', 'bg-rose', 'bg-violet', 'bg-yellow', 'bg-sky', 'bg-green']

    const handlePixel = (date) => {
        props.setDetail(date)
        console.log(date)
    }

    // const viewMood = (date) => {
    //     return props.handleViewMood(date) ? props.handleViewMood(date) : 0
    // }

    // const name = (date) => {
    //     return `${className[viewMood(date)]}-200 rounded-sm w-[90%] h-4 cusoer-pointer ring-2`
    // }

    return (
        <div className="flex">
            <div className="grid overflow-hidden grid-cols-1 auto-rows-auto gap-x-1 gap-y-1 place-content-start place-items-right mt-7 mr-2">
                {
                    [...Array(31)].map((_, i) => {
                        return (
                            <div class="text-black text-right text-xs h-4">{(i + 1)%2 === 0 ? (i + 1) : ""}</div>
                        )

                    })
                }
            </div>
            <div class="grid overflow-hidden grid-cols-12 grid-rows-1 gap-x-1 gap-y-1">
                {
                    [...Array(12)].map((_, i) => {
                        return (
                            <div class="grid overflow-hidden grid-cols-1 auto-rows-auto gap-x-1 gap-y-1 place-content-start place-items-center">
                                <p className="text-center px-1.5">{monthNames[i].slice(0, 3)}</p>
                                {
                                    [...Array(monthDays[i])].map((_, j) => {
                                        const date = Math.ceil(new Date(props.year, i, j + 1).getTime() / 86400000)
                                        return (
                                            <div class={isToday(props.year, i, j + 1) ? "bg-gray-200 rounded-sm w-[90%] h-4 hover:bg-red-400 cursor-pointer ring-red-700 ring-2"
                                                    :
                                                    (props.detail === date) ? "bg-gray-200 rounded-sm w-[90%] h-4 hover:bg-blue-400 cursor-pointer ring-blue-700 ring-2"
                                                        :
                                                        "bg-gray-200 rounded-sm w-[90%] h-4 hover:bg-gray-400 cursor-pointer"}
                                                onClick={() => handlePixel(date)}></div>
                                        )

                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
    
}

export default Pixels