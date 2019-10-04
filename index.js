(function (global) {
  var theta = 0.0, scale = 1, membesar = 1.0;
  var gl, canvas, program, program2;
  glUtils.SL.init({ callback: function() { main(); }});

  var mainLinesVertices = new Float32Array([
      -0.4, -0.5, 1.0, 1.0, 0.0, //a
      -0.2, -0.5, 1.0, 0.0, 0.0, //b
      -0.1, -0.2, 1.0, 1.0, 0.0, //c
      +0.1, -0.2, 1.0, 0.0, 0.0, //d
      +0.2, -0.5, 1.0, 1.0, 0.0, //e
      +0.4, -0.5, 1.0, 0.0, 0.0, //f
      +0.1, +0.5, 1.0, 1.0, 0.0, //g
      -0.1, +0.5, 1.0, 0.0, 0.0,  //h
    ]);
    
    var centerLinesVertices = new Float32Array([
      -0.1, -0.0, 1.0, 1.0, 0.0,  //==c
      -0.02, +0.3, 1.0, 0.0, 0.0,
      +0.02, +0.3, 1.0, 1.0, 0.0,
      +0.1, -0.0, 1.0, 0.0, 0.0, //==d
    ]);

    var TriangleVertices1 = new Float32Array([
      +0.4, +0.5, 1.0, 1.0, 0.0,
      +0.2, +0.5, 1.0, 0.0, 0.0,
      +0.29, +0.3, 1.0, 1.0, 0.0,
      +0.31, +0.3, 1.0, 0.0, 0.0,
    ]);

    var TriangleVertices2 = new Float32Array([
      +0.2, +0.5, 1.0, 0.0, 0.0,
      +0.1, 0.0, 1.0, 1.0, 0.0,
      +0.24, 0.0, 1.0, 1.0, 0.0,
      +0.29, +0.3, 1.0, 0.0, 0.0,
    ]);

    var TriangleVertices3 = new Float32Array([
      +0.4, +0.5, 1.0, 1.0, 0.0,
      +0.5, 0.0, 1.0, 0.0, 0.0,
      +0.36, 0.0, 1.0, 1.0, 0.0,
      +0.31, +0.3, 1.0, 0.0, 0.0,
    ]);

    var TriangleVertices4 = new Float32Array([
      +0.4, -0.2, 1.0, 0.0, 0.0,
      +0.5, 0.0, 1.0, 1.0, 0.0,
      +0.1, 0.0, 1.0, 0.0, 0.0,
      +0.2, -0.2, 1.0, 1.0, 0.0,
    ]);

    var TriangleVertices5 = new Float32Array([
      +0.1, 0.0, 1.0, 1.0, 0.0,
      +0.2, -0.2, 1.0, 0.0, 0.0,
      -0.0, -0.5, 1.0, 1.0, 0.0,
    ]);
    
    var TriangleVertices6 = new Float32Array([
      +0.4, -0.2, 1.0, 0.0, 0.0,
      +0.5, 0.0, 1.0, 1.0, 0.0,
      +0.6, -0.5, 1.0, 0.0, 0.0,
    ]);

    var TriangleVertices7 = new Float32Array([
      -0.0, -0.5, 1.0, 1.0, 0.0,
      +0.15, -0.5, 1.0, 1.0, 0.0,
      +0.2, -0.2, 1.0, 0.0, 0.0,
    ]);

    var TriangleVertices8 = new Float32Array([
      +0.4, -0.2, 1.0, 0.0, 0.0,
      +0.45, -0.5, 1.0, 1.0, 0.0,
      +0.6, -0.5, 1.0, 1.0, 0.0,
    ]);

  function main() {
      window.addEventListener('resize', resizer);

      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);

      var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);

      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
      resizer();
      render();
  }

  function drawShapes(type, vertices) {
      var n = vertices.length/5;
      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(
          vPosition, 
          2,         
          gl.FLOAT,   
          gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 
          0
      );
      gl.vertexAttribPointer(
          vColor,
          3,
          gl.FLOAT,
          gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT,
          2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.drawArrays(type, 0, n);
  }

  function render() {
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      var thetaLoc = gl.getUniformLocation(program, 'theta');
      theta += 0.0183;
      gl.uniform1f(thetaLoc, theta);

      drawShapes(gl.LINE_LOOP, mainLinesVertices);
      drawShapes(gl.LINE_LOOP, centerLinesVertices);

      gl.useProgram(program2);
      var scaleLoc = gl.getUniformLocation(program2, 'scale');
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale += 0.0082 * membesar;
      gl.uniform1f(scaleLoc, scale);

      drawShapes(gl.TRIANGLE_FAN, TriangleVertices1);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices2);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices3);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices4);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices5);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices6);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices7);
      drawShapes(gl.TRIANGLE_FAN, TriangleVertices8);
      
      requestAnimationFrame(render);
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
})(window | this);