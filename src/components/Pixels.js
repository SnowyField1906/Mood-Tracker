import { monthNames, pixelConfig } from '../constants'

function Pixels(props) {
    const isLeap = (year) => new Date(year, 1, 29).getDate() === 29
    const isToday = (year, month, day) => {
        const today = new Date()
        return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
    }

    const monthDays = [31, 28 + isLeap(props.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const handlePixel = (date) => {
        props.setDetail(date)
        props.setMood(0)
    }

    const ringHandle = (date, i, j) => {
        return isToday(props.year, i, j + 1) && (date === props.detail) ? "overlap"
            : isToday(props.year, i, j + 1) ? "today"
                : date === props.detail ? "choosing"
                    : "default"
    }

    return (
        <div className="flex">
            <div className="grid overflow-hidden grid-cols-1 auto-rows-auto gap-x-1 gap-y-1 place-content-start place-items-right mt-7 mr-2">
                {
                    [...Array(31)].map((_, i) => {
                        return (
                            <div class="text-black text-right text-xs h-4">{(i + 1) % 2 === 0 ? (i + 1) : ""}</div>
                        )

                    })
                }
            </div>

            <div class="grid overflow-hidden grid-cols-12 grid-rows-1 gap-x-1 gap-y-1">

                {
                    [...Array(12)].map((_, i) => {
                        return (
                            <div class="grid overflow-hidden grid-cols-1 auto-rows-auto place-content-start place-items-center">
                                <p className="text-center px-1.5">{monthNames[i].slice(0, 3)}</p>
                                {
                                    [...Array(monthDays[i])].map((_, j) => {
                                        const date = Math.ceil(new Date(props.year, i, j + 1).getTime() / 86400000)

                                        return (
                                            <div className={`my-[2px] mx-[1px] ${pixelConfig[+(props.detail === date) * props.mood].bg}
                                            ${pixelConfig[+(props.detail === date) * props.mood].addition}
                                            ${pixelConfig[ringHandle(date, i, j)]}`}
                                                onClick={() => handlePixel(date, i, j)}></div>
                                        )

                                    })
                                }


                            </div>
                        )
                    })
                }
            </div>
        </div >
    )

}

export default Pixels