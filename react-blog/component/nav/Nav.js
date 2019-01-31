import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './nav.css';


class Item extends Component {
    render() {
        const {to, children, exact} = this.props
        return (
            <Route
                path={to}
                exact={exact}
                //children={functional component}
                children={({ match }) => (
                    <li className={`nav__item  ${match ? 'active' : ''}`}>
                        <Link to={to}>
                            {children}
                        </Link>
                    </li>
                )}
            />
        )
    }
}

class Nav extends Component {

    render() {
        return (
            <nav className="nav">
                <ul className="nav__list">
                    <Item to='/' exact={true}>
                        Home
                    </Item>
                    <Item to='/post'>
                        Article
                    </Item>
                    <Item to='/about'>
                        About
                    </Item>
                </ul>
            </nav>
        )
    }
}

export default Nav;