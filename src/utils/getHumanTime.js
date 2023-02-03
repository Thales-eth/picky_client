const getHumanTime = (time) => {
    let hours = Math.floor(time / 60)
    let minutes = hours % 60
    let days = Math.floor(hours / 24)

    let hoursMsg = ""
    let daysMsg = ""
    let minutesMsg = ""

    if (days) {
        hours = hours % 24
        daysMsg = `${days} days,`
        hours ? hoursMsg = `${hours} hours` : daysMsg = `${days} days`
    }

    if (!days) {
        minutesMsg = `${minutes} minutes`
    }

    return `${daysMsg} ${hoursMsg} ${minutesMsg} ago`
}

export default getHumanTime