precision mediump float;

varying vec3 vNormal;

void main() {
    vec3 color = vNormal * 0.5 + 0.5;

    gl_FragColor = vec4(color, 0.7);
}