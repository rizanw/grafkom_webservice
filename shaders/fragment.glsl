precision mediump float;
varying vec3 fColor;

void main() {
  gl_FragColor = vec4(fColor, 1.0);
  // gl_FragColor = vec4(0.8392, 0.251, 0.149, 0.884);
}
