const challenges = [
 {title:"Elementos y pertenencia",level:"NIVEL 1 · INICIAL",desc:"Reconoce elementos y símbolos de pertenencia.",questions:[
  {q:"En el aula, el conjunto A contiene {lápiz, regla, borrador}. ¿Cuál elemento pertenece a A?",h:"Recuerda: ∈ significa que un elemento pertenece al conjunto.",o:["Cuaderno","Regla","Mochila","Tijera"],a:1,e:"La regla forma parte de los elementos del conjunto A."},
  {q:"Si B = {2, 4, 6, 8}, ¿qué expresión es correcta?",h:"El símbolo ∉ indica que un elemento no pertenece.",o:["5 ∈ B","8 ∈ B","3 ∈ B","9 ∈ B"],a:1,e:"El número 8 sí aparece en el conjunto B."}
 ]},
 {title:"Unión de conjuntos",level:"NIVEL 2 · BÁSICO",desc:"Reúne elementos de dos conjuntos sin repetir.",questions:[
  {q:"En un grupo, A = {Ana, Luis} juega fútbol y B = {Luis, Eva} juega básquet. ¿Quiénes están en A ∪ B?",h:"La unión reúne todos los elementos de ambos conjuntos.",o:["Ana y Eva","Ana, Luis y Eva","Solo Luis","Ana y Luis"],a:1,e:"La unión incluye a Ana, Luis y Eva; Luis se escribe una sola vez."},
  {q:"A = {1, 2, 3} y B = {3, 4}. ¿Cuál es A ∪ B?",h:"No repitas los elementos comunes.",o:["{1, 2, 3, 4}","{3}","{1, 2, 4}","{1, 2, 3, 3, 4}"],a:0,e:"La unión contiene todos los elementos: 1, 2, 3 y 4."}
 ]},
 {title:"Intersección",level:"NIVEL 3 · INTERMEDIO",desc:"Encuentra los elementos que tienen en común.",questions:[
  {q:"A = {manzana, pera, uva} y B = {pera, mango, uva}. ¿Cuál es A ∩ B?",h:"La intersección reúne solo los elementos comunes.",o:["{manzana, mango}","{pera, uva}","{manzana, pera, uva, mango}","{mango}"],a:1,e:"Pera y uva aparecen en los dos conjuntos."},
  {q:"En una encuesta, A = {2, 4, 6, 8} y B = {1, 2, 3, 4}. ¿Cuál es la intersección?",h:"Compara las dos listas.",o:["{1, 3}","{6, 8}","{2, 4}","{1, 2, 3, 4, 6, 8}"],a:2,e:"Los números 2 y 4 están en ambos conjuntos."}
 ]},
 {title:"Diferencia de conjuntos",level:"NIVEL 4 · INTERMEDIO",desc:"Identifica los elementos exclusivos de un conjunto.",questions:[
  {q:"A = {rojo, azul, verde} y B = {azul, amarillo}. ¿Qué elementos forman A − B?",h:"Quita de A los elementos que también están en B.",o:["{azul}","{amarillo}","{rojo, verde}","{rojo, azul, verde, amarillo}"],a:2,e:"Rojo y verde están en A, pero no aparecen en B."},
  {q:"A = {5, 6, 7, 8} y B = {7, 8, 9}. ¿Cuál es A − B?",h:"Conserva los elementos exclusivos de A.",o:["{7, 8}","{5, 6}","{9}","{5, 6, 7, 8, 9}"],a:1,e:"5 y 6 pertenecen a A y no pertenecen a B."}
 ]},
 {title:"Conjuntos y diagramas",level:"NIVEL 5 · AVANZADO",desc:"Interpreta relaciones en situaciones cotidianas.",questions:[
  {q:"En un curso de 20 estudiantes, 12 practican fútbol, 9 básquet y 4 ambos deportes. ¿Cuántos practican al menos uno?",h:"Usa: total = fútbol + básquet − ambos.",o:["25","21","17","13"],a:2,e:"12 + 9 − 4 = 17 estudiantes practican al menos uno."},
  {q:"De 30 estudiantes, 18 leen cuentos, 15 leen cómics y 8 leen ambos. ¿Cuántos no leen ninguno de los dos?",h:"Primero calcula la unión y luego réstala al total.",o:["5","8","11","13"],a:0,e:"18 + 15 − 8 = 25; entonces 30 − 25 = 5."}
 ]},
 {title:"Reto final: aplica lo aprendido",level:"NIVEL 6 · EXPERTO",desc:"Resuelve problemas combinando operaciones.",questions:[
  {q:"En una feria, 16 estudiantes visitaron ciencias, 14 arte y 6 visitaron ambas áreas. ¿Cuántos visitaron solo ciencias?",h:"A los que visitaron ciencias, réstales quienes visitaron ambas.",o:["6","8","10","16"],a:2,e:"16 − 6 = 10 estudiantes visitaron solo ciencias."},
  {q:"A = {a, e, i, o, u} y B = {a, e, i}. ¿Cuál es B − A?",h:"¿Hay elementos de B que no estén en A?",o:["{a, e, i}","{o, u}","∅","{a, e, i, o, u}"],a:2,e:"Todos los elementos de B están en A; por eso la diferencia es el conjunto vacío."}
 ]}
];
const $ = id => document.getElementById(id);
const views = ["welcomeView","studentView","teacherView"];
let activeChallenge = 0, questionIndex = 0, correctCount = 0, answered = false;
let state = JSON.parse(localStorage.getItem("aulaConjuntosState") || '{"name":"","score":0,"solved":[]}');
function save(){localStorage.setItem("aulaConjuntosState",JSON.stringify(state));}
function showView(id){views.forEach(v=>$(v).classList.toggle("hidden",v!==id));window.scrollTo({top:0,behavior:"smooth"});}
function enterStudent(){ $("nameDialog").showModal(); }
function renderStudent(){
 $("studentNameTitle").textContent=state.name||"explorador";
 $("scoreValue").textContent=state.score;
 $("solvedValue").textContent=state.solved.length;
 $("progressValue").textContent=Math.round(state.solved.length/challenges.length*100)+"%";
 $("challengeGrid").innerHTML=challenges.map((c,i)=>`<article class="challenge-card"><span class="challenge-number">${c.level}</span><h4>${c.title}</h4><p>${c.desc}</p><button class="button button-primary" data-challenge="${i}">${state.solved.includes(i)?"Practicar otra vez":"Comenzar reto"} →</button></article>`).join("");
 $("challengeGrid").querySelectorAll("[data-challenge]").forEach(b=>b.addEventListener("click",()=>startChallenge(Number(b.dataset.challenge))));
}
function startChallenge(index){activeChallenge=index;questionIndex=0;correctCount=0;$("quizPanel").classList.remove("hidden");renderQuestion();$("quizPanel").scrollIntoView({behavior:"smooth",block:"start"});}
function renderQuestion(){
 const c=challenges[activeChallenge],q=c.questions[questionIndex];answered=false;
 $("quizLevel").textContent=c.level;$("questionCounter").textContent=`Pregunta ${questionIndex+1} de ${c.questions.length}`;
 $("progressBar").style.width=(questionIndex/c.questions.length*100)+"%";
 $("questionText").textContent=q.q;$("questionHint").textContent=q.h;
 $("answerOptions").innerHTML=q.o.map((option,i)=>`<button class="answer-option" data-answer="${i}">${String.fromCharCode(65+i)}. ${option}</button>`).join("");
 $("feedback").className="feedback hidden";$("nextQuestion").classList.add("hidden");
 $("answerOptions").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>chooseAnswer(Number(b.dataset.answer))));
}
function chooseAnswer(choice){
 if(answered)return;answered=true;const q=challenges[activeChallenge].questions[questionIndex],ok=choice===q.a;
 if(ok)correctCount++;
 $("answerOptions").querySelectorAll("button").forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct");else if(i===choice)b.classList.add("incorrect");});
 const feedback=$("feedback");feedback.textContent=(ok?"¡Excelente! ":"Sigue practicando. ")+q.e;feedback.className="feedback "+(ok?"good":"bad");
 $("nextQuestion").textContent=questionIndex===challenges[activeChallenge].questions.length-1?"Finalizar reto":"Siguiente pregunta →";$("nextQuestion").classList.remove("hidden");
}
function nextQuestion(){
 if(questionIndex<challenges[activeChallenge].questions.length-1){questionIndex++;renderQuestion();return;}
 const passed=correctCount===challenges[activeChallenge].questions.length;
 if(passed&&!state.solved.includes(activeChallenge)){state.solved.push(activeChallenge);state.score+=20;save();}
 $("progressBar").style.width="100%";
 $("questionCounter").textContent="Reto finalizado";
 $("questionText").textContent=passed?"¡Reto superado! 🌟":"¡Buen intento! Sigue practicando.";
 $("questionHint").textContent=`Respuestas correctas: ${correctCount} de ${challenges[activeChallenge].questions.length}.`;
 $("answerOptions").innerHTML="";
 $("feedback").textContent=passed?"Has ganado 20 puntos. ¡Continúa con el siguiente nivel!":"Para superar este reto necesitas responder correctamente todas las preguntas. Puedes intentarlo nuevamente.";
 $("feedback").className="feedback "+(passed?"good":"bad");
 $("nextQuestion").textContent="Volver a los retos";$("nextQuestion").onclick=()=>{$("quizPanel").classList.add("hidden");$("nextQuestion").onclick=nextQuestion;renderStudent();};
 renderStudent();
}
function renderTeacher(){
 $("teacherChallengeCount").textContent=challenges.length;
 $("teacherSolvedCount").textContent=state.solved.length;
 $("teacherChallengeList").innerHTML=challenges.map((c,i)=>`<div><b>${i+1}. ${c.title}</b><br><span>${c.level} · ${c.questions.length} preguntas</span></div>`).join("");
}
document.querySelectorAll("[data-role]").forEach(b=>b.addEventListener("click",()=>{
 if(b.dataset.role==="student"){enterStudent();}else{renderTeacher();showView("teacherView");}
}));
$("nameForm").addEventListener("submit",e=>{e.preventDefault();const name=$("studentName").value.trim();if(!name)return;state.name=name;save();$("nameDialog").close();renderStudent();showView("studentView");});
$("studentBack").addEventListener("click",()=>showView("welcomeView"));
$("teacherBack").addEventListener("click",()=>showView("welcomeView"));
$("closeQuiz").addEventListener("click",()=>$("quizPanel").classList.add("hidden"));
$("nextQuestion").addEventListener("click",nextQuestion);
$("resetData").addEventListener("click",()=>{if(confirm("¿Deseas borrar el nombre, los puntos y los avances guardados en este dispositivo?")){state={name:"",score:0,solved:[]};save();renderTeacher();}});
let installPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").classList.remove("hidden");});
$("installBtn").addEventListener("click",async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("installBtn").classList.add("hidden");});
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{$("connectionText").textContent="Modo web";}));}
if(navigator.onLine===false)$("connectionText").textContent="Disponible sin conexión";
