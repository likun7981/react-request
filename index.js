import React from 'react'

/**
 *
 * @param {*} config
 * {
 *  api: 请求链接
 *  defaultParams: 默认请求条件
 *  options: 请求项
 * }
 */
const requestHoC = (filter, config) => Component =>
  class extends React.Component {
    constructor (props) {
      super(props)

      if (typeof config === 'function') {
        this.config = config(props)
      } else {
        this.config = config
      }
      this.query = this.query.bind(this, this.config.options || {})
    }
    state = {
      dataSource: undefined,
      loading: false,
      error: false,
    }
    componentDidMount () {
      if (this.config.notAutoRequest) {
        return
      }
      this.query()
    }
    componentWillUnmount () {
      this.unmount = true
    }
    query = (options, params = this.config.defaultParams || {}, reset) => {
      console.log('did query', this.config.api, params)
      this.setState({
        loading: true,
      })
      fetch(this.config.api, {
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
      const { dataSource, loading, error } = this.state
      return (
        <Component
          {...this.props}
          query={this.query}
          dataSource={dataSource}
          loading={loading}
          error={error}
        />
      )
    }
  }
export default requestHoC
