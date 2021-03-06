import * as Cesium from 'cesium';
import 'cesium/Widgets/widgets.css';
import '../src/css/main.css';

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

const seoulCityGeoJson =
  'http://localhost:8080/geoserver/SeoulCity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SeoulCity%3AF_FAC_BUILDING_11_202206&maxFeatures=10000&outputFormat=application%2Fjson&srsname=EPSG:4326';

const seoulZoneGeoJson =
  'http://localhost:8080/geoserver/Administrative_district/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Administrative_district%3AZ_NGII_N3A_G0100000&maxFeatures=25&outputFormat=application%2Fjson&srsname=EPSG:4326';

const daejeonCityGeoJson =
  'http://localhost:8080/geoserver/Daejeon_City/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Daejeon_City%3AF_FAC_BUILDING_30_202206&maxFeatures=10000&outputFormat=application%2Fjson&srsname=EPSG:4326';

const makeBox = document.querySelector('#boxbutton');
const makeCylinder = document.querySelector('#cylinderbutton');
const makeControllbar = document.querySelector('#controllbar');
const makeSeoulZone = document.querySelector('#seoulzonebutton');
const makeSeoulCity = document.querySelector('#seoulcitybutton');
const makeDaejeonCity = document.querySelector('#daejeoncitybutton');
const makePoint = document.querySelector('#pointbutton');
const makeLinePg = document.querySelector('#linepgbutton');
const cleanAllBtn = document.querySelector('#cleanbutton');

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  // terrainProvider: Cesium.createWorldTerrain(),
  animation: false,
  // baseLayerPicker: false,
  fullscreenButton: false,
  // infoBox: false,
  // geocoder: false,
  // homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  timeline: false,
});

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

// ?????? ?????? ??????
viewer.bottomContainer.style.display = 'none';

// ?????? ????????? ????????? ??????
const seoulMove = viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(127.01, 37.51, 700),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(0.0),
  },
});

// ?????? ??????????????? ??????
makeSeoulCity.addEventListener('click', () => {
  Cesium.GeoJsonDataSource.load(seoulCityGeoJson, {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK,
    strokeWidth: 3,
  })
    .then(function (dataSource) {
      alert('????????? ????????? ???????????????.');
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        let height = entity.properties.HEIGHT._value;

        //Remove the outlines.
        entity.polygon.outline = false;
        entity.polygon.extrudedHeight = height;
      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
});

// ?????? ??????????????? ??????
makeDaejeonCity.addEventListener('click', () => {
  Cesium.GeoJsonDataSource.load(daejeonCityGeoJson, {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK,
    strokeWidth: 3,
  })
    .then(function (dataSource) {
      alert('????????? ????????? ???????????????.');
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        let height = entity.properties.HEIGHT._value;

        //Remove the outlines.
        entity.polygon.outline = false;
        entity.polygon.extrudedHeight = height;
      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
});

// ?????? ?????? ??????
makeSeoulZone.addEventListener('click', () => {
  Cesium.GeoJsonDataSource.load(seoulZoneGeoJson, {
    stroke: Cesium.Color.BLACK,
    strokeWidth: 3,
  })
    .then(function (dataSource) {
      alert('????????? ????????? ???????????????.');
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        const name = entity._name;
        let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          colorHash[name] = color;
        }

        //Set the polygon material to our random color.
        entity.polygon.material = color;
      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
});

// 3D?????? ??????
makeBox.addEventListener('click', () => {
  const box = viewer.entities.add({
    name: 'Box',
    position: Cesium.Cartesian3.fromDegrees(126.923428, 37.524969, 255.0), // ??????, ??????, ??????, ?????????(Ellipsoid.WGS84), ????????? ????????? ??????
    box: {
      dimensions: new Cesium.Cartesian3(500.0, 500.0, 500.0), // x, y, z
      material: Cesium.Color.WHITE, // ??????
      outline: false, // ?????????
      outlineColor: Cesium.Color.BLACK, // ????????? ??????
    },
  });
  viewer.zoomTo(viewer.entities);
  alert('3D ????????? ???????????????.');
});

// 3D ????????? ??????
makeCylinder.addEventListener('click', () => {
  const cylinder = viewer.entities.add({
    name: 'Cylinder',
    position: Cesium.Cartesian3.fromDegrees(126.907, 37.527, 255.0),
    cylinder: {
      length: 490, // ??????
      topRadius: 200, // ?????? ?????? ?????????
      bottomRadius: 200, // ?????? ?????? ?????????
      material: Cesium.Color.WHITE,
      outline: false,
      outlineColor: Cesium.Color.BLACK,
    },
  });
  viewer.zoomTo(viewer.entities);
  alert('3D ???????????? ???????????????.');
});

// ????????? ??????
cleanAllBtn.addEventListener('click', () => {
  viewer.dataSources.removeAll();
  viewer.entities.removeAll();
  handler.removeInputAction();
});

// ?????? ?????? ??????
makeControllbar.addEventListener('change', (e) => {
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(126.923428, 37.524969)
  );
  const camera = viewer.camera;

  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-10000.0, -10000.0, e.target.value)
  );
});

// ?????? ?????? ????????????
makePoint.addEventListener('click', () => {
  const scene = viewer.scene;

  // ?????? ?????? ??????
  const entity = viewer.entities.add({
    label: {
      show: true,
      showBackground: true,
      backgroundColor: Cesium.Color.BLACK,
      font: '25px sans-serif',
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(15, 0),
    },
  });

  // ??????????????? ????????? ?????? ??????
  handler.setInputAction(function (movement) {
    //????????? ?????? ?????? ??????
    let cartesian = viewer.camera.pickEllipsoid(
      movement.endPosition,
      scene.globe.ellipsoid
    );
    if (cartesian) {
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
      let latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);

      entity.position = cartesian;
      entity.label.show = true;
      entity.label.text =
        '??????: ' +
        ('' + longitude).slice(-7) +
        '\u00B0' +
        '\n??????: ' +
        ('' + latitude).slice(-7) +
        '\u00B0';
    } else {
      entity.label.show = false;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});

makeLinePg.addEventListener('click', (event) => {
  function createPoint(clickPosition) {
    if (event.target.value === 'null') {
      return;
    }
    const point = viewer.entities.add({
      position: clickPosition,
      point: {
        show: true,
        color: Cesium.Color.Yellow,
        pixelSize: 7,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // ????????? ????????? ??????
      },
    });
    return point;
  }
  // Drawing mode. Initially only line is supported
  let drawingMode = event.target.value;
  function drawShape(positionData) {
    let shape;
    if (drawingMode === 'line') {
      shape = viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    } else if (drawingMode === 'polygon') {
      shape = viewer.entities.add({
        polygon: {
          hierarchy: positionData,
          material: new Cesium.ColorMaterialProperty(
            Cesium.Color.WHITE.withAlpha(0.7)
          ),
        },
      });
    }
    return shape;
  }

  let activeShapePoints = [];
  let activeShape;
  let floatingPoint;

  // ????????? ?????? ????????? shape ?????????
  handler.setInputAction(function (event) {
    // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
    // we get the correct point when mousing over terrain.
    const earthPosition = viewer.camera.pickEllipsoid(event.position);
    // `earthPosition` will be undefined if our mouse is not over the globe.
    if (Cesium.defined(earthPosition)) {
      if (activeShapePoints.length === 0) {
        floatingPoint = createPoint(earthPosition);
        activeShapePoints.push(earthPosition);
        const dynamicPositions = new Cesium.CallbackProperty(function () {
          if (drawingMode === 'polygon') {
            return new Cesium.PolygonHierarchy(activeShapePoints);
          }
          return activeShapePoints;
        }, false);
        activeShape = drawShape(dynamicPositions);
      }
      activeShapePoints.push(earthPosition);
      createPoint(earthPosition);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // ????????? ????????? ??????
  handler.setInputAction(function (event) {
    if (Cesium.defined(floatingPoint)) {
      const newPosition = viewer.camera.pickEllipsoid(event.endPosition);
      if (Cesium.defined(newPosition)) {
        floatingPoint.position.setValue(newPosition);
        activeShapePoints.pop();
        activeShapePoints.push(newPosition);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // Redraw the shape so it's not dynamic and remove the dynamic shape.
  function terminateShape() {
    activeShapePoints.pop();
    drawShape(activeShapePoints);
    viewer.entities.remove(floatingPoint);
    viewer.entities.remove(activeShape);
    floatingPoint = undefined;
    activeShape = undefined;
    activeShapePoints = [];
  }

  // ????????? ????????? ????????? ????????? ??????
  handler.setInputAction(function (event) {
    terminateShape();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
});
