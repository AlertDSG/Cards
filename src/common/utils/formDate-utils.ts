
export const formDate = (date: string): string => {
    const newDate = new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate()
    const newMonth = new Date(date).getMonth() < 10 ? '0' + (new Date(date).getMonth() + 1): new Date(date).getMonth() + 1
    const newHours = new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours()
    const newMinutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()
    const newSeconds = new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getSeconds()
    return `${newDate}-${newMonth}-${new Date(date).getFullYear()}  ${newHours}:${newMinutes}:${newSeconds}`
}