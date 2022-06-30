import * as Cesium from 'cesium';
import 'cesium/Widgets/widgets.css';
import '../src/css/main.css';

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  animation: false,
  baseLayerPicker: false,
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

// viewer.dataSources.add(
//   Cesium.GeoJsonDataSource.load(
//     'http://localhost:8080/geoserver/SeoulCity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SeoulCity%3AF_FAC_BUILDING_11_202206&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326',
//     {
//       fill: Cesium.Color.PINK,
//     }
//   )
// );

// viewer.dataSources.add(
//   Cesium.GeoJsonDataSource.load(
//     'http://localhost:8080/geoserver/Administrative_district/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Administrative_district%3AZ_NGII_N3A_G0100000&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326'
//   )
// );

// 서울 위치로 카메라 이동
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(126.975, 37.4575, 700),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
  },
});

const makeBox = document.querySelector('#boxbutton');
const makeCylinder = document.querySelector('#cylinderbutton');

makeBox.addEventListener('click', () => {
  const box = viewer.entities.add({
    name: 'Box',
    position: Cesium.Cartesian3.fromDegrees(126.924, 37.524, 255.0), // 경도, 위도, 높이, 타원체(Ellipsoid.WGS84), 결과를 저장할 객체
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
  alert('3D 상자를 생성합니다.');
});
