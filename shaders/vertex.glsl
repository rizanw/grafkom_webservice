// attribute vec4 aPosition;

precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;

void main() {
  fColor = vColor; 

  mat4 translate = mat4(
    1.0, 0.0, 0.0, -0.7,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scale = mat4(
    0.7, 0.0, 0.0, 0.0,
    0.0, 0.7, 0.0, 0.0,
    0.0, 0.0, 0.7, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotate = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = rotate * vec4(vPosition, 0.0, 1.0) * translate * scale;
  // gl_Position = aPosition;
}
