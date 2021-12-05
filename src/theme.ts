export type ColorType = 'primary' | 'success' | 'change' | 'danger'

export const theme = {
  colors: {
    text: {
      light: '#e5e5e5',
      dark: '#464646',
      muted: '#9e9e9e'
    },
    background: {
      primary: '#4e6cb7',
      light: '#f8f8f8',
      muted: '#d0d0d0'
    },
    type: {
      primary: '#4e6cb7',
      danger: '#f13838',
      success: '#009443',
      change: '#ffa400'
    }
  },
  shadows: {
    primary: 'rgba(0, 0, 0, 0.25) 0 0.05em 0.3em'
  },
  borders: {
    radius: {
      primary: '0.25em',
      big: '0.4em'
    },
    style: {
      separator: 'solid 0.1em #d8d8d8'
    }
  },
  outline: {
    width: '0.15em'
  }
}
