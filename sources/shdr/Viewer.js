// Generated by CoffeeScript 1.4.0
(function() {
  var Viewer;

  Viewer = (function() {

    function Viewer(dom) {
      var _this = this;
      this.dom = dom;
      this.time = 0.0;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.dom.appendChild(this.renderer.domElement);
      this.material = this.defaultMaterial();
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(35, this.dom.clientWidth / this.dom.clientHeight, 1, 3000);
      this.controls = new THREE.OrbitControls(this.camera, this.dom);
      this.scene.add(this.camera);
      this.loader = new THREE.JSONLoader();
      this.loadModel('models/monkey_high.js');
      this.onResize();
      window.addEventListener('resize', (function() {
        return _this.onResize();
      }), false);
    }

    Viewer.prototype.update = function() {
      this.controls.update();
      this.time += 0.001;
      this.uniforms.time.value = this.time;
      if (this.model) {
        this.model.rotation.y = this.time * 5;
      }
      return this.renderer.render(this.scene, this.camera);
    };

    Viewer.prototype.onResize = function() {
      if (this.camera) {
        this.camera.aspect = this.dom.clientWidth / this.dom.clientHeight;
        this.camera.updateProjectionMatrix();
        this.camera.position.z = 900 / this.dom.clientWidth * 4;
        this.camera.lookAt(this.scene.position);
      }
      return this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    };

    Viewer.prototype.loadModel = function(path) {
      var _this = this;
      return this.loader.load(path, (function(g) {
        return _this.addModel(g);
      }));
    };

    Viewer.prototype.addModel = function(geo) {
      this.model = new THREE.Mesh(geo, this.material);
      return this.scene.add(this.model);
    };

    Viewer.prototype.updateShader = function(fs) {
      this.fs = fs;
      this.material.fragmentShader = fs;
      return this.material.needsUpdate = true;
    };

    Viewer.prototype.defaultMaterial = function() {
      this.uniforms = {
        time: {
          type: 'f',
          value: 0.0
        }
      };
      this.vs = ['varying vec3 fNormal;', 'varying vec4 fPosition;', 'void main()', '{', 'fNormal = normalMatrix * normal;', 'fPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', 'gl_Position = fPosition;', '}'].join("\n");
      this.fs = ['uniform float time;', 'varying vec3 fNormal;', 'varying vec4 fPosition;', 'void main()', '{', '  gl_FragColor = vec4(fNormal, 1.0);', '}'].join("\n");
      return new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vs,
        fragmentShader: this.fs
      });
    };

    return Viewer;

  })();

  this.shdr || (this.shdr = {});

  this.shdr.Viewer = Viewer;

}).call(this);
