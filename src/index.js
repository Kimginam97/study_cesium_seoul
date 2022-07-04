import * as Cesium from 'cesium';
import 'cesium/Widgets/widgets.css';
import '../src/css/main.css';

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

const makeBox = document.querySelector('#boxbutton');
const makeCylinder = document.querySelector('#cylinderbutton');
const makeControllbar = document.querySelector('#controllbar');
const makeSeoulZone = document.querySelector('#seoulzonebutton');
const makeSeoulCity = document.querySelector('#seoulcitybutton');
const cleanAllBtn = document.querySelector('#cleanbutton');
const lookSkyView = document.querySelector('#cesium-button_sky');
const lookSideView = document.querySelector('#cesium-button_side');
const lookAirPortView = document.querySelector('#cesium-button_air');

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

// 밑에 로고 삭제
viewer.bottomContainer.style.display = 'none';

// 서울 위치로 카메라 이동
const seoulMove = viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(126.975, 37.4575, 700),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
  },
});

// 서울 도시데이터 생성
makeSeoulCity.addEventListener('click', () => {
  const seoulCityGeoJson =
    'http://localhost:8080/geoserver/SeoulCity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SeoulCity%3AF_FAC_BUILDING_11_202206&maxFeatures=10000&outputFormat=application%2Fjson&srsname=EPSG:4326';

  Cesium.GeoJsonDataSource.load(seoulCityGeoJson, {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK,
    strokeWidth: 3,
  })
    .then(function (dataSource) {
      alert('서울시 건물을 생성합니다.');
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

// 서울 구역 생성
makeSeoulZone.addEventListener('click', () => {
  const seoulZoneGeoJson =
    'http://localhost:8080/geoserver/Administrative_district/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Administrative_district%3AZ_NGII_N3A_G0100000&maxFeatures=25&outputFormat=application%2Fjson&srsname=EPSG:4326';

  Cesium.GeoJsonDataSource.load(seoulZoneGeoJson, {})
    .then(function (dataSource) {
      alert('서울시 구역을 생성합니다.');
      viewer.dataSources.add(dataSource);
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
});

// 3D상자 생성
makeBox.addEventListener('click', () => {
  const box = viewer.entities.add({
    name: 'Box',
    position: Cesium.Cartesian3.fromDegrees(126.923428, 37.524969, 255.0), // 경도, 위도, 높이, 타원체(Ellipsoid.WGS84), 결과를 저장할 객체
    box: {
      dimensions: new Cesium.Cartesian3(500.0, 500.0, 500.0), // x, y, z
      material: Cesium.Color.WHITE, // 재질
      outline: false, // 바깥선
      outlineColor: Cesium.Color.BLACK, // 바깥선 색깔
    },
  });
  viewer.zoomTo(viewer.entities);
  alert('3D 상자를 생성합니다.');
});

// 3D 원기둥 생성
makeCylinder.addEventListener('click', () => {
  const cylinder = viewer.entities.add({
    name: 'Cylinder',
    position: Cesium.Cartesian3.fromDegrees(126.907, 37.527, 255.0),
    cylinder: {
      length: 490, // 길이
      topRadius: 200, // 원통 상단 반지름
      bottomRadius: 200, // 원통 하단 반지름
      material: Cesium.Color.WHITE,
      outline: false,
      outlineColor: Cesium.Color.BLACK,
    },
  });
  viewer.zoomTo(viewer.entities);
  alert('3D 원기둥를 생성합니다.');
});

// 초기화 버튼
cleanAllBtn.addEventListener('click', () => {
  viewer.dataSources.removeAll();
});

// 높이 조절 기능
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
