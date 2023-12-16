import * as THREE from 'three';
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
window.addEventListener('load', function () {
  init()
})

function init() {
  const gui = new GUI()
  const renderer = new THREE.WebGLRenderer({
      antialias:true,
  });
  
  renderer.setSize(window.innerWidth,window.innerHeight)

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )

  camera.position.z = 100

  // /** cube */

  // //많은 양의 랜더를 가져올 예정으로 setPath로 세팅
  // const textureLoader = new THREE.TextureLoader().setPath('assets/textures/Yokohama/')

  // //배열로 큐브의 각각면을 선택해줌
  // const images = [
  //   //순서는 아래와 같아야 함 pos앞 면, neg는 뒷면
  //   'posx.jpg','negx.jpg',
  //   'posy.jpg','negy.jpg',
  //   'posz.jpg','negz.jpg',
  // ];

  // const geometry = new THREE.BoxGeometry(5000, 5000, 5000);
  // //meterials 배열생성후 map을 통해서 6개의 매트리얼을 생성해줌
  // const materials = images.map(image => new THREE.MeshBasicMaterial({
  //   map : textureLoader.load(image),
  //   side : THREE.BackSide
  // }))

  // const skybox = new THREE.Mesh(geometry, materials)

  // scene.add(skybox)

  // /**controls */
  // const controls = new OrbitControls(camera, renderer.domElement)
  
  // controls.minDistance = 5;
  // controls.maxDistance = 100;


  // /** Cube */
  // const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('assets/textures/Yokohama/')
  
  // //배열로 큐브의 각각면을 선택해줌
  // const images = [
  //   //순서는 아래와 같아야 함 pos앞 면, neg는 뒷면
  //   'posx.jpg','negx.jpg',
  //   'posy.jpg','negy.jpg',
  //   'posz.jpg','negz.jpg',
  // ];

  // /** Controls */
  // new OrbitControls(camera, renderer.domElement)


  // const cuebeTexture = cubeTextureLoader.load(images);

  // scene.background = cuebeTexture


  /** 360 paranoma texture */

  const textureLoader = new THREE.TextureLoader().setPath('assets/textures/');

  const texture = textureLoader.load('village.jpeg')

  //texture.mapping -> 매핑해주는 속성 // THREE.UVMapping 기본값
  texture.mapping = THREE.EquirectangularReflectionMapping // paranoma용 세팅
  scene.background = texture
  /** Controls */
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoon = false;
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;

  /** mesh */
  const spherGeometry = new THREE.SphereGeometry(30, 50, 50);
  const spherMaterial = new THREE.MeshBasicMaterial({
    envMap : texture,
  });

  gui
  .add(texture, 'mapping', {
    Reflection : THREE.EquirectangularReflectionMapping,
    Refraction : THREE.EquirectangularRefractionMapping,
  })
  .onChange(()=> {
    spherMaterial.needsUpdate = true
  })

  gui
  .add(spherMaterial, 'reflectivity')
  .min(0)
  .max(1)
  .step(0.01)
  
  gui
  .add(spherMaterial, 'refractionRatio')
  .min(0)
  .max(1)
  .step(0.01)
  
  const spher = new THREE.Mesh(spherGeometry,spherMaterial);

  scene.add(spher)




  render() //랜더 되는 부분
  function render() {
    controls.update()
    renderer.render(scene,camera)

    requestAnimationFrame(render);
  }

  function handleResize(){ //애니메이션 작동
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight)

    renderer.render(scene, camera)

  }

  window.addEventListener('resize',handleResize)
}

