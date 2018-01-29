import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import {ZoneLabels, HostName } from "./env";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/fontawesome-pro-solid'
import classnames from 'classnames';
import Zone from './Zone';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            zones: [],
            max: 28,
            min: 0,
            step: 1,
        };
        this.handleAllOff = this.handleAllOff.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
        this.handleChangePower = this.handleChangePower.bind(this);
        this.handleChangeSource = this.handleChangeSource.bind(this);
    }

    static pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    handleChangeSource(index, source) {
        let zones = this.state.zones;
        let that = this;
        zones[index].ch = App.pad(source,2);

        this.setState({
            zones: zones,
            isLoading: true
        });

        this.setSource(index, source, function () {
            that.setState({
                isLoading: false
            });
        });
    }

    handleChangeVolume(index, volume) {
        let zones = this.state.zones;
        let that = this;
        zones[index].vo = App.pad(volume,2);

        this.setState({
            zones: zones,
            isLoading: true
        });

        this.setVolume(index, volume, function () {
            that.setState({
                isLoading: false
            });
        });
    }

    handleChangePower(index, enabled) {
        let zones = this.state.zones;
        let that = this;
        zones[index].pr = (enabled ? "01" : "00");

        this.setState({
            zones: zones,
            isLoading: true
        });

        this.setPower(index, enabled, function () {
            that.setState({
                isLoading: false
            });
        });

    }

    componentDidMount() {
        this.refreshAll();
    }

    setVolume(index, value, callback) {
        let config = {
            headers: {
                'Content-Type': 'text/plain'
            },
            responseType: 'text'
        };

        axios.post(
            'http://' + HostName + '/zones/' + this.state.zones[index].zone + '/vo',
            App.pad(value, 2),
            config
        )
            .then(function (response) {
                if (callback) {
                    callback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSource(index, value, callback) {
        let config = {
            headers: {
                'Content-Type': 'text/plain'
            },
            responseType: 'text'
        };

        axios.post(
            'http://' + HostName + '/zones/' + this.state.zones[index].zone + '/ch',
            App.pad(value, 2),
            config
        )
            .then(function (response) {
                if (callback) {
                    callback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setPower(index, enabled, callback) {
        let config = {
            headers: {
                'Content-Type': 'text/plain'
            },
            responseType: 'text'
        };

        axios.post(
            'http://' + HostName + '/zones/' + this.state.zones[index].zone + '/pr',
            enabled ? "01" : "00",
            config
        )
            .then(function (response) {
                if (callback) {
                    callback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    refreshAll() {
        let that = this;
        axios.get('http://' + HostName + '/zones')
            .then(function (response) {
                that.setState({
                    zones: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleAllOff() {
        axios.get('http://' + HostName + '/zones')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">
                        Whole House Audio &nbsp;
                        {this.state.isLoading &&
                        <FontAwesomeIcon icon={faSpinner} spin/>
                        }
                    </h1>
                </header>

                <div className="content container">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Shortcuts
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Zones
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <h4>Macros here</h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">

                                        {this.state.zones.map(function (zone, index) {
                                            let volume = parseInt(zone.vo, 10);
                                            let source = parseInt(zone.ch, 10);
                                            return (
                                                <Zone
                                                    key={index}
                                                    name={ZoneLabels[index]}
                                                    enabled={zone.pr === "01"}
                                                    index={index}
                                                    zone={zone.zone}
                                                    volume={volume}
                                                    source={source}
                                                    onVolumeChange={this.handleChangeVolume}
                                                    onPower={this.handleChangePower}
                                                    onSourceChange={this.handleChangeSource}
                                                />
                                            );
                                        }, this)}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>

            </div>
        );
    }
}

export default App;
