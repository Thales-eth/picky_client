const getHumanTime = (time) => {
    let hours = Math.floor(time / 60)
    let minutes = hours % 60

    return `${hours} hours ${minutes}`
}

export default getHumanTime