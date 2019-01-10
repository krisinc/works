import React, { Component } from 'react';
import './App.css';

class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const {job} = this.props
    return (
      <div className="job">
        <h2 className="job__title">{job.title}</h2>
        <div className="job__break"></div>
        <p className="job__content">{job.content}</p>
        <div className="job__break"></div>
        <p className="job__salary">{job.salary}</p>
        <a className="job__link" href={job.link} target="_blank" rel="noopener noreferrer">我要應徵</a>
      </div>
    )
  }
}



class Nav extends Component {

  filterFrontEndProps = () => {
    const {filterFrontEnd} = this.props
    filterFrontEnd()
  }

  filterBackEndProps = () => {
    const {filterBackEnd} = this.props
    filterBackEnd()
  }


  render() {
    return (
      <nav className="nav">
        <div className="nav__item" onClick={this.filterFrontEndProps}>前端</div>
        <div className="nav__item" onClick={this.filterBackEndProps}>後端</div>
        <div className="nav__item">其他</div>
      </nav>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      initRes: []
    }
  }

  componentDidMount(){
    fetch('http://www.mocky.io/v2/5c18f4ac2f00002a00af130a')
      .then(data => data.json())
      .then(data => {
        this.setState({
          jobs: data,
          initRes: data
        })
      })
  }

  
  initData = () => {
    const {initRes} = this.state
    this.setState({
      jobs: initRes
    })
    console.log(initRes)
  }

  filterFrontEnd = () => {
    const {jobs} = this.state
    this.initData()
    this.setState({
      jobs: jobs.filter(job => job.title.indexOf('前') !== -1)
    })
    console.log(jobs)
  }

  filterBackEnd = () => {
    const {jobs} = this.state
    this.initData()
    this.setState({
      jobs: jobs.filter(job => job.title.indexOf('Backend') !== -1)
    })
    console.log(jobs)
  }
  // filterOther = () => {

  // }



  render() {
    const {jobs} = this.state
    return (
      <div className="app">
        <h1 className="app__title">Job Boards職缺報報</h1>
        <h1 className="app__title" onClick={this.initData}>initData</h1>
        <Nav 
          jobs={jobs}
          filterFrontEnd={this.filterFrontEnd}
          filterBackEnd={this.filterBackEnd}
        />
        <div className="jobs">
          {
            jobs.map((job,key) => (
              <Job job={job} key={key} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
