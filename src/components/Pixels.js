
function Pixels(props) {
    const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;
    const isToday = (year, month, day) => {
        const today = new Date();
        return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    }

    const monthDays = [31, (28 + isLeap(props.year)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    return (
        <div>
            <div class="grid overflow-hidden grid-cols-12 grid-rows-1 gap-x-1 gap-y-1">
                {
                    [...Array(12)].map((_, i) => {
                        return (
                            <div class="grid overflow-hidden grid-cols-1 auto-rows-auto gap-x-1 gap-y-1 place-content-start place-items-center">
                                <p className="text-center">{monthNames[i]}</p>
                                {
                                    [...Array(monthDays[i])].map((_, j) => {
                                        if (isToday(props.year, i, j + 1)) {
                                            return (
                                                <div class="bg-gray-200 rounded-sm w-11 h-4 hover:bg-blue-400 cursor-pointer ring-blue-700 ring-2"></div>
                                            )
                                        }
                                        return (
                                            <div class="bg-gray-200 rounded-sm w-11 h-4 hover:bg-gray-400 cursor-pointer"></div>
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
