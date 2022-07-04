import * as Cesium from 'cesium';

// 비행구역 생성
viewer.scene.globe.enableLighting = true; // 장면의 광원으로 지구 조명을 활성화합니다.
viewer.scene.globe.depthTestAgainstTerrain = true; // 빌보드, 폴리라인, 레이블 등과 같은 기본 요소가 지형 표면에 대해 깊이 테스트되어야 하는 경우 true
Cesium.Math.setRandomNumberSeed(3);

// 시작, 종료 날짜 설정
const start = Cesium.JulianDate.fromDate(new Date(2022, 7, 4, 10)); // JavaScript 날짜에서 새 인스턴스를 만듭니다.
const stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate()); // 제공된 날짜 인스턴스에 제공된 시간(초)을 추가합니다.

// viewer 작동시간
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop 종료

// 항공기 비행구역 설정
function computeCircularFlight(lon, lat, radius) {
  let property = new Cesium.SampledPositionProperty(); // 기준좌표계

  for (let i = o; i <= 360; i += 45) {
    let radians = Cesium.Math.toRadians(i); // 범위 설정
    let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate()); // 시간설정
    let position = Cesium.Cartesian3.fromDegrees(
      lon + radius * 1.5 * Math.cos(radians),
      lat + radians * Math.sin(radians),
      Cesium.Math.nextRandomNumber() * 500 + 1000
    );
    property.addSample(time, position);
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
      },
    });
  }
  return property;
}

// 항공기 생성
const plane = viewer.entities.add({
  availability: new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({
      start: start,
      stop: stop,
    }),
  ]),

  position: position,

  orientation: new Cesium.VelocityOrientationProperty(position),
  model: {
    uri: 'js/Cesium-1.53/Apps/SampleData/models/CesiumAir/Cesium_Air.gltf',
    minimumPixelSize: 64,
  },

  path: {
    resolution: 1,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.1,
      color: Cesium.Color.YELLOW,
    }),
    width: 10,
  },
});

lookSkyView.addEventListener('click', () => {
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(126.924403, 37.524624)
  );
  const camera = viewer.camera;

  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-10000.0, -10000.0, 25000.0)
  );

  viewer.trackedEntity = undefined;
  viewer.zoomTo(
    viewer.entities,
    new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
  );
});
