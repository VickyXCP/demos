import React from 'react';
import Remarkable from 'remarkable'

// import './App.css';

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (! this.state.text.length) {
      return
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }

    this.setState({
      items: this.state.items.concat(newItem),
      text: ''
    })
  }

  render () {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items}/>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={'new-todo'}>What need to be done?</label>
          <input id={'new-todo'} onChange={this.handleChange} value={this.state.text}/>
          <button>Add #{this.state.items.length+1}</button>
        </form>
      </div>
    )
  }
}

class TodoList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.items.map(item =>
          <li key={item.id}>{item.text}</li>
        )}
      </ul>
    )
  }
}

class MarkDown extends React.Component{
  constructor (props){
    super(props)
    this.state={
      value: 'Hello, **world**!'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
  
  getMarkup(){
    const md = new Remarkable()
    return {__html: md.render(this.state.value)}
  }
  
  render(){
    return (
      <div className={'MarkdownEditor'}>
        <h3>Input</h3>
        <label htmlFor={'markdown-content'}>Enter some markdown</label>
        <textarea id={'markdown-content'} onChange={this.handleChange} defaultValue={this.state.value}/>
        <h3>Output</h3>
        <div className={'content'} dangerouslySetInnerHTML={this.getMarkup()}/>
      </div>
    )
  }
}

class combine extends React.Component{
  render(){
    return (
      <div>
        <Todo/>
        <hr/>
        <MarkDown/>
      </div>
    )
  }
}

export default combine;
