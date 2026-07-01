
const data={
getraenke:[["Hacker",2.5],["Bier",2],["Softdrink",2],["Wasser",1]],
grill:[["Bratwurst im Brötchen",3],["Bratwurst",2.5],["Currywurst",3.5],["Frikadelle im Brötchen",2.5],["Frikadelle",2]],
eis:[["1,50 €",1.5],["2,00 €",2],["2,50 €",2.5],["3,00 €",3]]
};
const s={};
const history=[];
let pfandAktiv=true;

function build(id){
 let p=document.getElementById(id);
 data[id].forEach(a=>{
  s[a[0]]=0;
  let d=document.createElement("div");
  d.className="card";
  d.innerHTML=`<div class=name>${a[0]}</div>
  <div class=ctrl><button>-</button><div class=count>0</div><button>+</button></div>`;
  let c=d.querySelector(".count");
  let b=d.querySelectorAll("button");
  b[0].onclick=()=>{if(s[a[0]]>0){history.push([a[0],1]);s[a[0]]--;c.textContent=s[a[0]];update();}}
  b[1].onclick=()=>{s[a[0]]++;c.textContent=s[a[0]];update();}
  p.appendChild(d);
 });
}
function update(){
 let sum=0,out="",pf=0;
 Object.entries(s).forEach(([k,v])=>{
   if(!v)return;
   out+=k+" × "+v+"<br>";
   for(let gname in data){
    for(let f of data[gname]){
      if(f[0]==k){
        sum+=f[1]*v;
        if(pfandAktiv && gname==="getraenke") pf+=0.25*v;
      }
    }
   }
 });
 document.getElementById("liste").innerHTML=out||"Keine Artikel";
 let ges=sum+pf;
 document.getElementById("summe").innerHTML="Gesamt: "+ges.toFixed(2).replace(".",",")+" €<br><small>Pfand: "+pf.toFixed(2).replace(".",",")+" €</small>";
}
function neu(){
 Object.keys(s).forEach(k=>s[k]=0);
 document.querySelectorAll(".count").forEach(e=>e.textContent="0");
 update();
}
build("getraenke");build("grill");build("eis");update();

function rueckgaengig(){
 let h=history.pop(); if(!h)return;
 s[h[0]]+=h[1];
 document.querySelectorAll(".card").forEach(card=>{
   let n=card.querySelector(".name").textContent;
   if(n===h[0]) card.querySelector(".count").textContent=s[h[0]];
 });
 update();
}
