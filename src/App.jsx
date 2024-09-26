import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails); 
  const [hideRead, setHideRead] = useState(false);  
  const [toggled, setToggled] = useState('inbox');

  const filteredEmails = () => {
    if (toggled === 'inbox') {
      if (hideRead) {
       return emails.filter(email =>!email.read);
      }
      return emails;
    } else if (toggled === 'starred') {
      if (hideRead) {
        return emails.filter(email => email.starred && !email.read);
      }
      return emails.filter(email => email.starred);
    }
  }

  const toggleCurrentTab = (tab) => {
    setToggled(tab);
  }

  const toggleHideRead = () => {
    setHideRead(!hideRead); 
  }

  const toggleStar = (id) => {
    const updatedEmails = emails.map(email => 
      email.id === id ? {...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  }

  const toggleRead = (id) => {
    const updatedEmail = emails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmail);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
            <li 
              className={`item ${toggled === 'inbox' ? 'active' : ''}`} 
              onClick={() => {toggleCurrentTab('inbox')}}
            >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={`item ${toggled === 'starred' ? 'active' : ''}`}
            onClick={() => {toggleCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>
          <li className="item toggle">
            <label for="hide-read">Hide read emails</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={() => toggleHideRead()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
        <ul>
          {filteredEmails().map((email, index) => ( 
            <li key={index} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className='select'>
                <input 
                  type="checkbox" 
                  checked={email.read} 
                  onClick={() => toggleRead(email.id)} />
              </div>
              <div className='star'>
                <input 
                  type="checkbox" 
                  className="star-checkbox" 
                  checked={email.starred} 
                  onClick={() => toggleStar(email.id)} />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))} 
        </ul>
      </main>
    </div>
  )
}

export default App
