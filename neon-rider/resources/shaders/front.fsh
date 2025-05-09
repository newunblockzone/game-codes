precision mediump int;
precision mediump float;

uniform vec4 Colors;
uniform sampler2D Texture0;

varying vec2 vTextureCoord;

void main(void)
{

  vec4 Tex = vec4(texture2D(Texture0, vTextureCoord.st).rgb*Colors.rgb,1.0);
  gl_FragColor = Tex;
}
