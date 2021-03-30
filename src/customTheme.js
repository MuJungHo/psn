import { createMuiTheme } from '@material-ui/core/styles'

const blue = {
    light: '#5295FF',
    dark: '#21223f'
}
const grey = {
    light: '#f8f9fb',
    medium: '#bebebe',
    dark: '#888888'
}
const typography = {
    fontFamily: [
        'Roboto',
        'PingFang TC',
        'Noto Sans TC',
    ].join(',')
}
const palette = {
    primary: { main: '#5295FF' },
    secondary: { main: '#f57182' },
    light: { main: '#ffffff' }
}
export default createMuiTheme({
    typography,
    blue,
    grey,
    palette
})