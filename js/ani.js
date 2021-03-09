
let scene, camera, renderer;
let mixer;


var clock = new THREE.Clock();

init();
animate();

function init() {
  
  
  window.addEventListener('resize', onResize, false);

  var container = document.getElementById('canvas');

  //console.log(document.getElementById('canvas').style.height);

  var width =container.clientWidth;
  var height= getHeigth(container);

  //document.body.appendChild( container );
  //document.body.appendChild( container );


  scene = new THREE.Scene();
  //scene.background = new THREE.Color(0xdddddd);
  
  camera = new THREE.PerspectiveCamera(45,width/height,1,5000);
  //camera.rotation.y = 150;

  camera.position.x = 50;
  camera.position.y = 40;
  camera.position.z = -40;
 //camera.updateProjectionMatrix();




  //controls = new THREE.OrbitControls(camera);
  //controls.addEventListener('change', renderer);

  hlight = new THREE.AmbientLight (0x404040,15);
  scene.add(hlight);
  const pointLight =  new THREE.PointLight( 0xffffff, 1, 1000 );
  pointLight.position.set( 10, 25, - 40 );
  scene.add( pointLight );

  const pointLight2 =  new THREE.PointLight( 0xffffff, 1, 1000 );
  pointLight2.position.set( 50, 55, 50 );
  scene.add( pointLight2 );
  //var drawingSurface = document.getElementById( 'canvas' );
//	var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: drawingSurface } );

  renderer = new THREE.WebGLRenderer({ antialias: true});


  renderer.setSize(width,height);
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize(320, 180);
//   document.body.appendChild(renderer.domElement);
  
  //document.getElementById("c").appendChild(renderer.domElement);
  //document.body.appendChild(renderer.domElement);

  container.append(renderer.domElement);
  //container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, container);

  

  let loader = new THREE.GLTFLoader();
  loader.load('model/moonrover.glb', function(gltf){
    console.log(gltf);
    console.log(gltf.scene.children[0]);
    
    rover = gltf.scene.children[0];
    rover.scale.set(10,10,10);
    scene.add(gltf.scene);

    //console.log(gltf  );
    

    mixer = new THREE.AnimationMixer( gltf.scene.children[0]);
  


    const clip = gltf.animations[0];


    const action = mixer.clipAction(clip);
    action.play();
    // var action = mixer.clipAction( gltf.animations[0]);
    // action.reset().play();
    // scene.add(gltf.scene);
    //if ( mixer ) mixer.update( clock.getDelta());

    // clock = new THREE.Clock();
    // var delta = clock.getDelta();
    // mixer.update( delta );
    //console.log(action);

    animate();
   

  });
}
function animate() {

  
  requestAnimationFrame(animate);
  if (mixer) mixer.update (clock.getDelta ());  
  renderer.render(scene,camera);
 
}





  function onResize() {

    var container = document.getElementById('canvas');

    var height =getHeigth(container);
    var width =container.clientWidth;
    //console.log(container.style.maxHeight);
    camera.position.x = 60;
    camera.position.y = 60;
    camera.position.z = 140;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function getHeigth(container){
    //Para que cuando cambie a estar un arriba del otro, tenga una altura bien (cambia a ese modo en heigth=736)
    var ancho =document.body.clientWidth;

    if (ancho > 736) {
      
      height= document.getElementById('two').clientHeight;
    }
    if (ancho<=736){
      var height =container.clientHeight;
    }
    return height;
  }

