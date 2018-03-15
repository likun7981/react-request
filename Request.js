import React from 'react'
import PropTypes from 'prop-types'

class Request extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    filter: PropTypes.func,
    api: PropTypes.string,
    params: PropTypes.object,
    options: PropTypes.object,
  }
  state = {
    dataSource: undefined,
    loading: false,
    error: false,
  }
  componentDidMount () {
    this.query()
  }
  componentWillUnmount () {
    this.unmount = true
  }
  query = () => {
    const { filter, api, params, options = {} } = this.props
    this.setState({
      loading: true,
    })
    fetch(api, {
      body: JSON.stringify(params),
      ...options,
    })
      .then(data => {
        if (filter) data = filter(data)
        if (this.unmount) return null
        this.setState({
          dataSource: data,
          loading: false,
          error: false,
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        })
      })
  }
  render () {
    return this.props.render(this.state)
  }
}

export default Request
