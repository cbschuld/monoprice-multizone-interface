import React from 'react';
import {Input} from 'reactstrap';
import {SourceNames} from "./env";

export default class SourceSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange && this.props.onChange(this.props.index, e.target.value);
    }

    render() {
        let rows = [];
        Object.keys(SourceNames).forEach(function (key) {
            rows.push(
                <option key={key} value={key}>{SourceNames[key]}</option>
            );
        });
        return (
            <select
                className="form-control"
                defaultValue={this.state.source}
                onChange={this.handleChange}
            >
                {rows}
                <option>turn off</option>
            </select>
        );
    }

}

SourceSelector.defaultProps = {
    onChange: null,
    index: "",
    source: 0
};
