precision mediump int;
precision mediump float;

uniform sampler2D Texture0;

varying vec2 vTextureCoord;
varying float Alpha;

void main(void)
{

  vec4 Tex = texture2D(Texture0, vTextureCoord.st)*Alpha;

gl_FragColor = Tex;
}
