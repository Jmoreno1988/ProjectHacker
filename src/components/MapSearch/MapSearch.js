import React from 'react';
import './MapSearch.css';
import 'ol/ol.css';
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerVector from "ol/layer/Vector";
import OlSourceVector from "ol/source/Vector";
import OlFeature from "ol/Feature";
import { LineString, Point } from 'ol/geom.js';
import OlGeomPoint from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import { XYZ } from 'ol/source';
import { Icon, Style, Fill, Stroke } from 'ol/style';
import OSM from 'ol/source/OSM';
import redMarker from './img/redMarker.png';
import greenMarker from './img/greenMarker.png';



export class MapSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.initCenter = [-350000, 4900000];
        this.vectorLayer = null;
        this.key = '9ThY0S1enilmj5pKyEzJ';
        this.olmap = new OlMap({
            target: null,
            layers: [
                /*
                new TileLayer({
                    source: new XYZ({
                        attributions: '',
                        url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.key,
                        maxZoom: 20
                    })
                })*/
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });

        this.olmap.on("pointermove", function (evt) {
            var hit = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                return true;
            });
            if (hit) {
                this.getTargetElement().style.cursor = 'pointer';
            } else {
                this.getTargetElement().style.cursor = '';
            }
        });

        document.addEventListener('password-correct', (evt) => { this.updateMarker(evt.detail.mission.idMission) });

        setTimeout(() => {
            this.userAction();
        }, 100);
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");

        this.vectorLayer = new OlLayerVector({
            source: new OlSourceVector({
                features: this.props.markers.map(ele => {
                    const newFea = new OlFeature({
                        geometry: new OlGeomPoint(fromLonLat(ele.coords)),
                    });

                    newFea.setStyle(new Style({
                        image: new Icon({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            src: redMarker
                        })
                    }));

                    newFea.setProperties({
                        idMission: ele.idMission,
                        mission: ele.mission
                    })
                    return newFea;
                })
            })
        });
        this.olmap.addLayer(this.vectorLayer);

        const styles = new Style({
            stroke: new Stroke({
                color: '#FF9800',
                width: 3,
                lineDash: [4, 8],
                lineDashOffset: 6
            })
        });

        const line1 = new OlFeature({
            geometry: new LineString([fromLonLat([-3.6833724976, 40.4151689954]), fromLonLat([-0.118092, 51.509865])])
        });

        const line2 = new OlFeature({
            geometry: new LineString([fromLonLat([-3.6833724976, 40.4151689954]), fromLonLat([12.496366, 41.902782])])
        });

        const line3 = new OlFeature({
            geometry: new LineString([fromLonLat([-3.6833724976, 40.4151689954]), fromLonLat([21.017532, 52.237049])])
        });

        const line4 = new OlFeature({
            geometry: new LineString([fromLonLat([-0.118092, 51.509865]), fromLonLat([21.017532, 52.237049])])
        });

        const line5 = new OlFeature({
            geometry: new LineString([fromLonLat([12.496366, 41.902782]), fromLonLat([21.017532, 52.237049])])
        });

        const line6 = new OlFeature({
            geometry: new LineString([fromLonLat([-0.118092, 51.509865]), fromLonLat([12.496366, 41.902782])])
        });

        line1.setStyle(styles);
        line2.setStyle(styles);
        line3.setStyle(styles);
        line4.setStyle(styles);
        line5.setStyle(styles);
        line6.setStyle(styles);

        this.vectorLayer.getSource().addFeatures([line1, line2, line3, line4, line5, line6]);


        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
        });

        this.olmap.on("click", (e) => {
            this.olmap.forEachFeatureAtPixel(e.pixel,
                fea => {

                    this.olmap.getView().animate({
                        center: fea.getGeometry().getCoordinates(),
                        duration: 1000
                    });

                    const evt = new CustomEvent('click-in-mission', { detail: { idMission: fea.getProperties().idMission } });
                    document.dispatchEvent(evt);
                });
        });

    }

    updateMarker(id) {
        if (!this.vectorLayer || !this.vectorLayer.getSource()) return;

        this.vectorLayer.getSource().getFeatures().forEach(ele => {
            if (ele.getProperties().idMission == id)
                ele.setStyle(new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: greenMarker
                    })
                }));
        })


    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();

        if (center === nextState.center && zoom === nextState.zoom)
            return false;
        return true;
    }

    userAction() {
        this.setState({ center: this.initCenter, zoom: 5 });
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
            <div id="map" className="map">
                <div className="terminal-toolbar-window">
                    <div className="terminal-toolbar-window-button red"></div>
                    <div className="terminal-toolbar-window-button yellow"></div>
                    <div className="terminal-toolbar-window-button green"></div>
                    <div className="terminal-toolbar-title">Mapa</div>
                </div>
            </div>
        );
    }
}