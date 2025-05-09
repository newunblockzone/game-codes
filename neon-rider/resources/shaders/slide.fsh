precision mediump int;
precision mediump float;

uniform sampler2D Texture0;

varying vec2 vTextureCoord;

void main(void)
{

  gl_FragColor = texture2D(Texture0, vTextureCoord.st);

}
