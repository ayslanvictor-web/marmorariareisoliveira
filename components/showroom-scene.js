// Architectural scenes shared by the immersive showroom.
export function buildShowroom(T, scene, stoneTexture) {
 const materials=[],geometries=[];
 const mat=(opts)=>{const m=new T.MeshStandardMaterial(opts);materials.push(m);return m;};
 const stone=mat({map:stoneTexture,color:0xffffff,roughness:.24,metalness:.04});
 const darkStone=mat({color:0x24272b,roughness:.3,metalness:.08});
 const wood=mat({color:0x563b2c,roughness:.62}); const wall=mat({color:0xc9c4b9,roughness:.95}); const navy=mat({color:0x172c3b,roughness:.85});const brass=mat({color:0xc4a46a,metalness:.83,roughness:.25}); const black=mat({color:0x161c20,roughness:.4});
 const glow=mat({color:0xffe5b2,emissive:0xffca7c,emissiveIntensity:2});
 function mesh(g,m,group,x,y,z){geometries.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o;}
 const box=(group,w,h,d,x,y,z,m)=>mesh(new T.BoxGeometry(w,h,d),m,group,x,y,z);
 function room(offset,backMaterial=wall){const group=new T.Group();group.position.x=offset;scene.add(group);box(group,11,.15,10,0,-.12,0,mat({color:0x99958b,roughness:.65}));box(group,11,5,.15,0,2.4,-3.2,backMaterial);box(group,.15,5,7,4.8,2.4,0,wall);box(group,11,.15,7,0,4.85,0,wall);
 for(let z=-2;z<4;z+=1.3)box(group,11,.006,.012,0,-.038,z,mat({color:0x746e66,roughness:1}));
 box(group,10,.035,.035,0,4.62,-2.98,glow);const lamp=new T.PointLight(0xffdbaa,35,10,2);lamp.position.set(offset,3.7,-1.4);scene.add(lamp);
 const sun=new T.DirectionalLight(0xffefda,.75);sun.position.set(offset-3,6,4);sun.target.position.set(offset,0,0);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=7;sun.shadow.camera.bottom=-7;sun.shadow.normalBias=.025;scene.add(sun,sun.target);
 for(let i=0;i<4;i++)box(group,.08,4.5,.12,-4.4+i*.62,2.2,-2.3,black);
 return group;}
 const kitchen=room(0); const island=new T.Group();kitchen.add(island);
 box(island,4,.13,1.85,0,1.36,.35,stone);box(island,.13,1.35,1.85,-1.94,.63,.35,stone);box(island,.13,1.35,1.85,1.94,.63,.35,stone);box(island,3.7,1.12,1.57,0,.6,.34,wood);
 for(let x=-1.78;x<1.8;x+=.095)box(island,.042,1.02,.06,x,.6,1.14,wood);
 box(kitchen,7.1,1.22,.8,0,.58,-2.57,wood);box(kitchen,7.3,.075,.94,0,1.22,-2.55,stone);box(kitchen,7.2,1.35,.045,0,1.95,-3.07,stone);
 for(let x=-3.4;x<3.5;x+=1.15){box(kitchen,1.1,1.12,.035,x,.6,-2.14,wood);box(kitchen,.45,.025,.035,x,.99,-2.09,brass);box(kitchen,1.1,1.15,.6,x,3.2,-2.8,wood);}
 box(kitchen,6.9,.025,.06,0,2.59,-2.49,glow);box(kitchen,1.1,.035,.65,-1.7,1.28,-2.5,black);
 for(const x of [-2,-1.45])for(const z of [-2.7,-2.35]){const ring=mesh(new T.TorusGeometry(.115,.012,8,32),brass,kitchen,x,1.31,z);ring.rotation.x=Math.PI/2;}
 // Mixer tap, a continuous curved brass tube.
 const curve=new T.CatmullRomCurve3([new T.Vector3(1.4,1.25,-2.7),new T.Vector3(1.4,1.9,-2.7),new T.Vector3(1.4,2,-2.5),new T.Vector3(1.4,1.8,-2.35)]);mesh(new T.TubeGeometry(curve,32,.025,10,false),brass,kitchen,0,0,0);
 for(const x of [-1.25,1.25]){mesh(new T.CylinderGeometry(.35,.38,.09,40),wood,kitchen,x,.77,2);for(const dx of [-.22,.22])for(const dz of [-.2,.2])box(kitchen,.035,.7,.035,x+dx,.36,2+dz,black);mesh(new T.CylinderGeometry(.22,.25,.24,40),black,kitchen,x,3.45,.35);box(kitchen,.009,1.15,.009,x,4.15,.35,brass);mesh(new T.CircleGeometry(.2,32),glow,kitchen,x,3.32,.35).rotation.x=-Math.PI/2;}
 const vaseMat=mat({color:0xa89c87,roughness:.8});mesh(new T.LatheGeometry([new T.Vector2(.1,0),new T.Vector2(.22,.12),new T.Vector2(.2,.34),new T.Vector2(.08,.52)],40),vaseMat,island,1.2,1.43,.3);
 const leaf=mat({color:0x465638,roughness:.8,side:T.DoubleSide});for(let i=0;i<9;i++){const a=i*2.4;const o=mesh(new T.SphereGeometry(.18,12,8),leaf,island,1.2+Math.sin(a)*.2,2+ i*.055,.3+Math.cos(a)*.2);o.scale.set(.4,1.5,.1);o.rotation.z=Math.sin(a);}
 const bathroom=room(14,navy);box(bathroom,4,.15,1.05,0,1.2,-1.75,stone);box(bathroom,3.85,.68,.91,0,.79,-1.8,wood);for(let x=-1.8;x<1.9;x+=.095)box(bathroom,.04,.64,.045,x,.79,-1.32,wood);
 const bowl=mesh(new T.LatheGeometry([new T.Vector2(.05,0),new T.Vector2(.42,.03),new T.Vector2(.49,.24),new T.Vector2(.46,.25),new T.Vector2(.39,.08),new T.Vector2(.05,.055)],64),stone,bathroom,0,1.28,-1.75);bowl.material.side=T.DoubleSide;
 const mirror=mat({color:0x9ba9ac,metalness:1,roughness:.12});mesh(new T.CircleGeometry(.91,64),mirror,bathroom,0,2.72,-3.06);mesh(new T.TorusGeometry(.94,.025,10,80),brass,bathroom,0,2.72,-3.025);mesh(new T.TorusGeometry(.97,.018,8,80),glow,bathroom,0,2.72,-3.02);
 box(bathroom,.035,.57,.035,.68,1.54,-2.06,brass);box(bathroom,.035,.035,.3,.68,1.82,-1.93,brass);box(bathroom,3.5,.02,.045,0,.42,-1.37,glow);
 for(const x of [-2,2]){box(bathroom,.025,.5,.025,x,2.9,-2.8,brass);mesh(new T.SphereGeometry(.14,24,16),glow,bathroom,x,2.58,-2.8);}
 const gallery=room(28,navy);const slabMaterials=[stone,darkStone,mat({color:0xb7a384,map:stoneTexture,roughness:.35})];for(let i=0;i<3;i++){box(gallery,1.75,2.85,.1,(i-1)*2.25,1.65,-1.8,slabMaterials[i]);box(gallery,1.95,.18,.65,(i-1)*2.25,.08,-1.8,black);box(gallery,.7,.018,.028,(i-1)*2.25,3.32,-1.68,glow);}
 const portfolio=room(42);const loader=new T.TextureLoader();const photos=[];for(let i=0;i<3;i++){const t=loader.load('/images/'+['cozinha','escada','lavabo'][i]+'-reis-oliveira.jpg');t.colorSpace=T.SRGBColorSpace;photos.push(t);box(portfolio,2.02,3.23,.11,(i-1)*2.6,2,-2.85,brass);mesh(new T.PlaneGeometry(1.9,3.1),mat({map:t,roughness:.95}),portfolio,(i-1)*2.6,2,-2.77);}
 return {island,stone,darkStone,texture:stoneTexture,cleanup(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());photos.forEach(t=>t.dispose());}};
}

