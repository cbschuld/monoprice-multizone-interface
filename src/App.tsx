import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { ZoneInformation, ZoneStatus } from './common/types';
import { Layout, Menu, PageHeader } from 'antd';
import { HomeName, Zones, HostName } from './env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSun, faStar } from '@fortawesome/free-solid-svg-icons';
import { Zone } from './Zone';
import axios from 'axios';
import produce from 'immer';
import { SliderValue } from 'antd/lib/slider';
import { useDebouncedCallback } from 'use-debounce';
import { ZoneList } from './ZoneList';

const { Header, Content, Footer, Sider } = Layout;

const DEBOUNCE_TIMING = 400;

const App: React.FC = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [zoneInfo, setZoneInfo] = useState<ZoneInformation>({ label: 'All Zones', zone: '0', icon: faHome });
  const [zoneStatusList, setZoneStatusList] = useState<Array<ZoneStatus>>([]);

  const [debouncedRefreshZones] = useDebouncedCallback(() => {
    refreshZones();
  }, DEBOUNCE_TIMING);

  const [debouncedSetPower] = useDebouncedCallback((zone: string, on: boolean) => {
    axios
      .post('http://' + HostName + '/zones/' + zone + '/pr', on ? '01' : '00')
      .then(debouncedRefreshZones)
      .catch((error) => {
        console.error(error);
      });
  }, DEBOUNCE_TIMING);
  const [debouncedSetVolume] = useDebouncedCallback((zone: string, volume: SliderValue) => {
    axios
      .post('http://' + HostName + '/zones/' + zone + '/vo', pad(String(volume), 2))
      .then(debouncedRefreshZones)
      .catch((error) => {
        console.error(error);
      });
  }, DEBOUNCE_TIMING);
  const [debouncedSetBass] = useDebouncedCallback((zone: string, bass: SliderValue) => {
    axios
      .post('http://' + HostName + '/zones/' + zone + '/bs', pad(String(bass), 2))
      .then(debouncedRefreshZones)
      .catch((error) => {
        console.error(error);
      });
  }, DEBOUNCE_TIMING);
  const [debouncedSetTreble] = useDebouncedCallback((zone: string, treble: SliderValue) => {
    axios
      .post('http://' + HostName + '/zones/' + zone + '/tr', pad(String(treble), 2))
      .then(debouncedRefreshZones)
      .catch((error) => {
        console.error(error);
      });
  }, DEBOUNCE_TIMING);
  const [debouncedSetSource] = useDebouncedCallback((zone: string, source: number) => {
    axios
      .post('http://' + HostName + '/zones/' + zone + '/ch', pad(String(source), 2))
      .then(debouncedRefreshZones)
      .catch((error) => {
        console.error(error);
      });
  }, DEBOUNCE_TIMING);

  const getZoneStatus = () => {
    return (
      zoneStatusList.find((z) => z.zone === zoneInfo.zone) || {
        zone: '00',
        pa: '00',
        pr: '00',
        mu: '00',
        dt: '00',
        vo: '00',
        tr: '00',
        bs: '00',
        bl: '00',
        ch: '00',
        ls: '00',
      }
    );
  };

  const pad = (n: string, width: number, z: number | string = '') => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z.toString()) + n;
  };

  const setVolume = (zone: string, volume: SliderValue) => {
    setZoneStatusList(
      produce(zoneStatusList, (draft: Array<ZoneStatus>) => {
        draft[draft.findIndex((z) => z.zone === zone)].vo = pad(String(volume), 2);
      })
    );
    debouncedSetVolume(zone, volume);
  };

  const setBass = (zone: string, bass: SliderValue) => {
    setZoneStatusList(
      produce(zoneStatusList, (draft: Array<ZoneStatus>) => {
        draft[draft.findIndex((z) => z.zone === zone)].bs = pad(String(bass), 2);
      })
    );
    debouncedSetBass(zone, bass);
  };

  const setTreble = (zone: string, treble: SliderValue) => {
    setZoneStatusList(
      produce(zoneStatusList, (draft: Array<ZoneStatus>) => {
        draft[draft.findIndex((z) => z.zone === zone)].tr = pad(String(treble), 2);
      })
    );
    debouncedSetTreble(zone, treble);
  };

  const setPower = (zone: string, on: boolean) => {
    setZoneStatusList(
      produce(zoneStatusList, (draft: Array<ZoneStatus>) => {
        draft[draft.findIndex((z) => z.zone === zone)].pr = on ? '01' : '00';
      })
    );
    debouncedSetPower(zone, on);
  };

  const setSource = (zone: string, source: number) => {
    setZoneStatusList(
      produce(zoneStatusList, (draft: Array<ZoneStatus>) => {
        draft[draft.findIndex((z) => z.zone === zone)].ch = pad(String(source), 2);
      })
    );
    console.warn('sending setSource');
    debouncedSetSource(zone, source);
  };

  const refreshZones = () => {
    axios
      .get('http://' + HostName + '/zones')
      .then((response) => {
        // let updatedZoneStatusList: Array<ZoneStatus> = [];
        // for (let i = 0; i < response.data.length; i++) {
        //   console.log(response.data[i]);
        //   let zoneIndex = zoneStatusList.findIndex((n: ZoneStatus) => n.zone === response.data[i].zone);
        //   if (zoneIndex >= 0) {
        //     updatedZoneStatusList = produce(updatedZoneStatusList, (draft: Array<ZoneStatus>) => {
        //       draft[zoneIndex] = response.data[i];
        //     });
        //   }
        //   else {
        //     console.log('push');
        //     updatedZoneStatusList.push( response.data[i] );
        //   }
        // }
        // setZoneStatusList(updatedZoneStatusList);
        if (response.data.length === Zones.length) {
          setZoneStatusList(response.data);
        } else {
          console.warn('ERROR: received invalid status payload');
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshZones();
  }, [zoneInfo]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={menuCollapsed}
        onBreakpoint={(broken) => {
          console.error(broken);
        }}
        onCollapse={(collapsed, type) => {
          if ('clickTrigger' === type || 'responsive' === type) {
            setMenuCollapsed(collapsed);
          }
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          onSelect={(info) => {
            if ('0' === info.key) {
              setZoneInfo({ label: 'All Zones', zone: '0', icon: faStar });
            } else if ('1' === info.key) {
              setZoneInfo({ label: 'Interior Zones', zone: '1', icon: faHome });
            } else if ('2' === info.key) {
              setZoneInfo({ label: 'Exterior Zones', zone: '2', icon: faSun });
            } else {
              setZoneInfo(Zones.find((z) => z.zone === info.key) || { label: 'All Zones', zone: '0', icon: faStar });
            }
            setTimeout(() => {
              setMenuCollapsed(true);
            }, 250);
          }}
        >
          <Menu.Item key="0">
            <FontAwesomeIcon icon={faHome} fixedWidth />
            &nbsp;&nbsp;
            <span className="nav-text">All Zones</span>
          </Menu.Item>
          <Menu.Item key="1">
            <FontAwesomeIcon icon={faHome} fixedWidth />
            &nbsp;&nbsp;
            <span className="nav-text">Interior</span>
          </Menu.Item>
          <Menu.Item key="2">
            <FontAwesomeIcon icon={faSun} fixedWidth />
            &nbsp;&nbsp;
            <span className="nav-text">Exterior</span>
          </Menu.Item>
          <Menu.Divider />
          {Zones.map((z) => {
            return (
              <Menu.Item key={z.zone}>
                <FontAwesomeIcon icon={z.icon} fixedWidth />
                &nbsp;&nbsp;
                <span className="nav-text">{z.label}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#ccc', padding: 0 }}>
          <PageHeader backIcon={false} onBack={() => null} title="House Audio" subTitle={HomeName} />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {!['0', '1', '2'].includes(zoneInfo.zone) && (
              <Zone
                info={zoneInfo}
                status={getZoneStatus()}
                onVolumeChange={(zone, vo) => {
                  setVolume(zone, vo);
                }}
                onBassChange={(zone, bs) => {
                  setBass(zone, bs);
                }}
                onTrebleChange={(zone, tr) => {
                  setTreble(zone, tr);
                }}
                onPowerChange={(zone, on) => {
                  setPower(zone, on);
                }}
                onSourceChange={(zone, ch) => {
                  setSource(zone, ch);
                }}
              />
            )}
            {['0', '1', '2'].includes(zoneInfo.zone) && (
              <ZoneList
                label={['All Zones', 'Interior', 'Exterior'][parseInt(zoneInfo.zone)]}
                interior={['0', '1'].includes(zoneInfo.zone)}
                exterior={['0', '2'].includes(zoneInfo.zone)}
                infoList={Zones}
                statusList={zoneStatusList}
                onVolumeChange={(zone, vo) => {
                  setVolume(zone, vo);
                }}
                onBassChange={(zone, bs) => {
                  setBass(zone, bs);
                }}
                onTrebleChange={(zone, tr) => {
                  setTreble(zone, tr);
                }}
                onPowerChange={(zone, on) => {
                  setPower(zone, on);
                }}
                onSourceChange={(zone, source) => {
                  setSource(zone, parseInt(source));
                }}
              />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#d0d2d5' }}>©2019 Chris Schuld</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
