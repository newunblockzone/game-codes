precision mediump int;
precision mediump float;

uniform vec4 Colors;
uniform sampler2D Texture0;

varying vec2 vTextureCoord;

void main(void)
{

float Decal = Colors.a;
//Colors
vec2 textCoord = vTextureCoord;
textCoord.t -= Decal*1.5;
 vec3 Tex;
  
  Tex  = texture2D(Texture0, textCoord).rgb; textCoord.t +=Decal;
  Tex += texture2D(Texture0, textCoord).rgb; textCoord.t +=Decal;
  Tex += texture2D(Texture0, textCoord).rgb; textCoord.t +=Decal;
  Tex += texture2D(Texture0, textCoord).rgb; textCoord.t +=Decal;
  Tex /= 3.5;

gl_FragColor = vec4(Tex,1.0);
}
