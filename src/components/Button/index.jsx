import './styles.css';
import { Component } from "react";

export class Button extends Component {
    render() {
        const { onclick, title, disabled } = this.props;
        return (
            <button
                disabled={disabled}
                className='button'
                onClick={onclick}>{title}</button>
        )
    }
}