// attribute vec4 aPosition;

precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scale;

void main() {
  fColor = vColor; 

  mat4 translate = mat4(
    1.0, 0.0, 0.0, -0.3,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translate2 = mat4(
    1.0, 0.0, 0.0, 0.3,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scale = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * translate * scale * translate2;
  // gl_Position = aPosition;
}
