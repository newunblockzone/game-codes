precision mediump int;
precision mediump float;

uniform sampler2D Texture0;

varying vec2 vTextureCoord;
varying vec2 vTextureCoordB;
varying vec2 vTextureCoordC;

void main(void)
{

 gl_FragColor.a = texture2D(Texture0, vTextureCoordC.st).a;
 if ( gl_FragColor.a<0.5) discard;
  vec2 Deform = texture2D(Texture0, vTextureCoordB).rb*0.1;
  gl_FragColor.rgb = texture2D(Texture0, vTextureCoord.st+Deform).rgb;
  

}
