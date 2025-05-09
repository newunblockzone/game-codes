attribute vec3 VertexPos;
attribute vec2 TextureCoor;

uniform mat4 PrMatrix;
uniform mat4 MvMatrix;
uniform mat4 NoMatrix;
uniform mat4 CaMatrix;
uniform vec4 ParticlesXYZS[30];
uniform vec2 ParticlesRT[30];

varying vec2 vTextureCoord;


mat4 rotationZaxis( float angle)
{
    float s = sin(angle); float c = cos(angle);
    return mat4(
		c, s, 0.0, 0.0, 
		-s, c, 0.0, 0.0, 
		0.0, 0.0, 1.0, 0.0, 
		0.0, 0.0, 0.0, 1.0);


}

void main(void)
{


	int ID = int(VertexPos.z);

	vec4 ParticlesPos = vec4(VertexPos.x*ParticlesXYZS[ID].w, VertexPos.y*ParticlesXYZS[ID].w, -20.0 ,1.0);
	ParticlesPos = rotationZaxis(ParticlesRT[ID].x) * ParticlesPos;
	ParticlesPos.xy += vec2(ParticlesXYZS[ID].x, ParticlesXYZS[ID].y);
	gl_Position = PrMatrix * CaMatrix * MvMatrix*ParticlesPos;
	vTextureCoord = vec2 (TextureCoor.s+ParticlesRT[ID].y, TextureCoor.t);

}
