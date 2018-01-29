import React from 'react';
import {CardBody, Card, CardHeader, CardTitle, CardText, Row, Col, Button} from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import SourceSelector from './SourceSelector';

export default class Zone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: this.props.enabled,
            source: this.props.source,
            volume: this.props.volume
        };
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
        this.handlePower = this.handlePower.bind(this);
        this.handleChangeSource = this.handleChangeSource.bind(this);
    }

    handleChangeSource(index,value) {
        this.setState({
            source: value
        });
        this.props.onSourceChange && this.props.onSourceChange(this.props.index, value);
    }

    handleChangeVolume(event) {
        this.setState({
            volume: event.target.value
        });
        this.props.onVolumeChange && this.props.onVolumeChange(this.props.index, event.target.value);
    }

    handlePower(event) {
        let enabled = !this.state.enabled;
        this.setState({
            enabled: enabled
        });
        this.props.onPower && this.props.onPower(this.props.index, enabled);
    }


    render() {

        return (
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col sm="6">
                                    <h4>{this.props.name}</h4>
                                    <small><em>(Zone #{this.props.zone})</em></small>
                                </Col>
                                <Col sm="6">
                                    {this.state.enabled &&
                                    <Button color="danger" onClick={this.handlePower}>
                                        Off
                                    </Button>
                                    }
                                    {!this.state.enabled &&
                                    <Button color="success" onClick={this.handlePower}>
                                        On
                                    </Button>
                                    }
                                </Col>
                            </Row>
                        </CardHeader>
                        {this.state.enabled &&
                        <CardBody>
                            <Row>
                                <Col sm="6">
                                    <CardTitle>Source</CardTitle>
                                    <SourceSelector
                                        name={this.props.zone}
                                        onChange={this.handleChangeSource}
                                        source={this.state.source}
                                    />
                            </Col>
                                <Col sm="6">
                                    <small>Vol ({this.state.volume}):</small>
                                    <ReactBootstrapSlider
                                        value={this.state.volume}
                                        slideStop={this.handleChangeVolume}
                                        step={this.props.step}
                                        max={this.props.max}
                                        min={this.props.min}
                                        orientation="horizontal"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        }
                    </Card>
                </Col>
            </Row>
        );
    }
}


// Specifies the default values for props:
Zone.defaultProps = {
    onVolumeChange: null,
    onPower: null,
    onSourceChange: null,
    index: 0,
    zone: '00',
    enabled: false,
    source: 1,
    volume: 1,
    step: 1,
    max: 28,
    min: 1
};
