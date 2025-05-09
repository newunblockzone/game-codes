attribute vec3 VertexPos;
attribute vec2 TextureCoor;
uniform vec4 Colors;

uniform mat4 PrMatrix;
uniform mat4 MvMatrix;
uniform mat4 NoMatrix;
uniform mat4 CaMatrix;

uniform vec4 ParticlesXYZS[31];
uniform vec2 ParticlesRT[31];

varying vec2 vTextureCoord;
varying float Alpha;

void main(void)
{
	int ID = int(VertexPos.x);

Alpha = ParticlesXYZS[ID].w*0.01;

	vec2 Trail = vec2 (ParticlesRT[ID].x*VertexPos.y, ParticlesRT[ID].y*VertexPos.y)*ParticlesXYZS[ID].w;

	vec4 MyVertex = vec4( ParticlesXYZS[ID].x+Trail.x, ParticlesXYZS[ID].y+Trail.y, 0.0, 1.0);

	gl_Position = PrMatrix * CaMatrix * MvMatrix * MyVertex;
	vTextureCoord = TextureCoor;
	vTextureCoord.x -= Colors.a;
}
