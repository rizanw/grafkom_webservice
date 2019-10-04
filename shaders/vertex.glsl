// attribute vec4 aPosition;

precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;

void main() {
  fColor = vColor; 

  mat4 translate = mat4(
    1.0, 0.0, 0.0, -0.3,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translate2 = mat4(
    1.0, 0.0, 0.0, -0.6,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotate = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * translate * rotate * translate2;
  // gl_Position = aPosition;
}
