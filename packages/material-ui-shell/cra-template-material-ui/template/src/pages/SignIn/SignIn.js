import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'

const useStyles = makeStyles((theme) => ({
  paper: {
      width: 'auto',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(620 + theme.spacing(6))]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto'
      },
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
      margin: theme.spacing(1),
      width: 192,
      height: 192,
      color: theme.palette.secondary.main,
  },
  form: {
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
  container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: `100%`,
  },
}))

const SignIn = () => {
  const classes = useStyles()
  const intl = useIntl()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthMenuOpen } = useContext(MenuContext)

  function handleSubmit(event) {
    event.preventDefault()
    authenticate({
      displayName: 'User',
      email: username,
    })
  }

  const authenticate = (user) => {
    saveAuthorisation(user)
    let _location = history.location
    let isAuth = isAuthorised()
    setAuthMenuOpen(false)
    if (isAuth) {
      let _route = '/home'
      if (_location.state && _location.state.from) {
        _route = _location.state.from.pathname
        history.push(_route)
      } else {
        history.push(_route)
      }
    }
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: 'sign_in' })}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={intl.formatMessage({ id: 'username' })}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({ id: 'password' })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: 'sign_in' })}
            </Button>
          </form>
        </div>
      </Paper>
    </Page>
  )
}

export default SignIn
