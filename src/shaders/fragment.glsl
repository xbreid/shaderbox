varying vec2 vUv;
uniform vec4 resolution;

void main() {
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    gl_FragColor = vec4(newUV, 0.5, 1.0);
}