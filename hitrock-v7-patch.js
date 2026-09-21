
/* HIT ROCK v7 — cores + roleta 5s
   Substitui a função pickChallenge antiga por esta versão e acrescenta as classes CSS indicadas no README. */
const challengeColorsV7=['blue','red','yellow','green','purple'];
let wheelTimerV7=null;
function paintChallengeV7(i){
  let c=document.getElementById('challenge');
  challengeColorsV7.forEach(x=>c.classList.remove(x));
  c.classList.add(challengeColorsV7[i]);
  document.getElementById('challengeText').textContent=challenges[gameMode][i];
}
function pickChallenge(){
  if(gameMode==='normal'){document.getElementById('challenge').classList.add('hidden');return}
  if(wheelTimerV7) clearTimeout(wheelTimerV7);
  let a=challenges[gameMode], winner=Math.floor(Math.random()*a.length), start=performance.now(), i=0;
  currentChallenge=a[winner];
  document.getElementById('challenge').classList.remove('hidden');
  let w=document.getElementById('wheel');
  w.classList.remove('spinning'); void w.offsetWidth; w.classList.add('spinning');
  function suspense(){
    let elapsed=performance.now()-start;
    if(elapsed>=5000){paintChallengeV7(winner);return}
    paintChallengeV7(i%5); i++;
    wheelTimerV7=setTimeout(suspense,90+Math.pow(elapsed/5000,3)*520);
  }
  suspense();
}
