precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec2 impactPoint;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    float dist = distance(uv, impactPoint);
    float ripple = sin(20.0 * dist - time * 6.0) * 0.02 / (dist * 20.0 + 1.0);

    uv += ripple;

    gl_FragColor = vec4(uv, 0.5 + ripple * 20.0, 1.0);
}
