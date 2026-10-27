Chargement des messages plus anciens…
Ne touche a rien d'autre au tableau des annexes mais j'ai besoin que le total des ressources soit centré

C’est fait. J’ai modifié uniquement l’alignement de la ligne « TOTAL DES RESSOURCES » dans le tableau de l’annexe Word : le libellé et le montant total sont maintenant centrés. Le fond gris, les bordures, les autres lignes et le reste de la calculette restent inchangés.

Tu peux remplacer uniquement script.js sur GitHub.

    Ouvrir le JavaScript complet corrigé pour copier-coller

Récupérer le site complet en ZIP

Le contrôle de syntaxe JavaScript est passé avec succès.
script_complet_corrige.txtDocument
j'arrive pas a télécharger le site complet

Pas de souci. On va éviter le ZIP si le téléchargement bloque. Comme tu travailles sur GitHub, le plus simple est de récupérer les fichiers séparément.

Tu as deux possibilités :

    Pour appliquer uniquement le centrage du total des ressources, remplace seulement script.js : tu n’as pas besoin de télécharger tout le site.

    Pour récupérer le site complet, il faut disposer de index.html, script.js et style.css ensemble.

Voici à nouveau les liens directs :

Site complet — ZIP

Télécharger les 3 fichiers du site

JavaScript seul

Ouvrir le code complet à copier

Page HTML

Récupérer index.html

Si le ZIP ne se télécharge toujours pas : fais un clic droit sur le lien « Télécharger les 3 fichiers du site », puis sélectionne « Enregistrer le lien sous… ».

Si ton navigateur professionnel bloque encore le téléchargement, dis-moi exactement ce qui se passe lorsque tu cliques : rien ne se passe, une erreur apparaît ou le fichier se télécharge mais ne s’ouvre pas. Je te guiderai selon le cas.
script_complet_corrige.txtDocument
index.htmlHTML
mets moi les 3 fichiers à telecharger

Voici les 3 fichiers séparés à télécharger, pour que tu puisses les déposer directement sur GitHub.

1. index.html

La page principale du site.

Télécharger index.html

2. script.js

Les calculs, les colonnes personnalisées et les exports Word et Excel, avec le centrage du total des ressources.

Télécharger script.js

3. style.css

La mise en forme du site.

Télécharger style.css

Sur GitHub : ouvre ton dépôt, puis ajoute ou remplace chacun des trois fichiers en conservant exactement ces noms. Ils doivent se trouver au même niveau dans le dépôt.

Je te conseille de conserver une copie de tes fichiers actuels avant de les remplacer.
index.htmlHTML
script.jsCode
style.cssCode
il y a que le java qui ne se telecharge pas
Réfléchi pendant 9s

D’accord, le problème vient donc uniquement du fichier JavaScript. Je t’ai préparé le même code avec une extension .txt, plus facile à ouvrir et à copier.

JavaScript complet — version texte

734 lignes · Code intégral

Ouvrir le fichier et copier le code
Comment faire

    Clique sur le lien ci-dessus.

    Si le code s'affiche, fais Ctrl + A, puis Ctrl + C.

    Sur GitHub, ouvre script.js, clique sur le crayon pour modifier le fichier.

    Remplace tout le contenu, puis valide avec Commit changes.

Le contenu est identique à celui de script.js : seule l’extension du fichier change pour faciliter l’accès.
script_a_copier.txtDocument
const $=id=>document.getElementById(id);
const fmt=n=>Number(n||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';

function parseMoney(value){
  if(value===null||value===undefined||value==='')return NaN;
  if(typeof value==='number')return value;
  let s=String(value).trim().replace(/€/g,'').replace(/\s/g,'');
  if(s.includes(',')&&s.includes('.'))s=s.replace(/\./g,'').replace(',','.');
  else if(s.includes(','))s=s.replace(',','.');
  else if((s.match(/\./g)||[]).length>1)s=s.replace(/\./g,'');
  const n=Number(s);
  return Number.isFinite(n)?n:NaN;
}

function moneyDisplay(value){
  const n=parseMoney(value);
  return Number.isFinite(n)?fmt(n):'';
}

function attachMoneyFormatter(el){
  el.type='text';
  el.inputMode='decimal';
  el.autocomplete='off';
  el.addEventListener('focus',()=>{
    el.value=String(el.value).replace(/€/g,'').trim();
  });
  el.addEventListener('blur',()=>{
    if(el.value.trim()!==''){
      const n=parseMoney(el.value);
      if(Number.isFinite(n)&&n>=0)el.value=fmt(n);
    }
  });
}

const monthDate=s=>{
  const [y,m]=s.split('-').map(Number);
  return new Date(y,m-1,1);
};

const monthKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
const monthLabel=d=>d.toLocaleDateString('fr-FR',{month:'short',year:'2-digit'}).replace('.','');
const addMonths=(d,n)=>new Date(d.getFullYear(),d.getMonth()+n,1);
const dateLabel=d=>d.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});

function isoToFrench(v){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(v||''))return v||'';
  return `${v.slice(8,10)}/${v.slice(5,7)}/${v.slice(0,4)}`;
}


function dateToISO(v) {
  const x = (v || '').trim();

  if (/^\d{8}$/.test(x)) {
    const year = x.slice(4, 8);
    const month = x.slice(2, 4);
    const day = x.slice(0, 2);
    return `${year}-${month}-${day}`;
  }

  const match = x.match(/^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/);

  if (match) {
    const day = match[1];
    const month = match[2];
    let year = match[3];

    if (year.length === 2) {
      const y = Number(year);
      year = String(y <= 49 ? 2000 + y : 1900 + y);
    }

    const iso = `${year}-${month}-${day}`;
    const date = new Date(`${iso}T00:00:00`);

    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() + 1 !== Number(month) ||
      date.getDate() !== Number(day)
    ) {
      return '';
    }

    return iso;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(x)) {
    return x;
  }

  return '';
}

function attachDateFormatter(el){
  el.addEventListener('input',()=>{
    const digits=el.value.replace(/\D/g,'').slice(0,8);
    let out=digits.slice(0,2);
    if(digits.length>2)out+='/'+digits.slice(2,4);
    if(digits.length>4)out+='/'+digits.slice(4,8);
    el.value=out;
  });
  el.addEventListener('blur',()=>{
    const iso=dateToISO(el.value);
    if(iso)el.value=isoToFrench(iso);
  });
}

document.querySelectorAll('.date-entry').forEach(attachDateFormatter);

const euroInput=(value='')=>`<input class="money" type="text" inputmode="decimal" value="${value}" placeholder="0,00 €" autocomplete="off">`;

function bandRow(container,date,val,label){
  const row=document.createElement('div');
  row.className='grid band-row';
  row.style.marginBottom='8px';
  row.innerHTML=`<div class="field"><label>${label}</label><input class="effdate date-entry" type="text" inputmode="numeric" maxlength="10" placeholder="JJ/MM/AAAA" value="${isoToFrench(date)}"></div><div class="field"><label>Montant applicable (€)</label><input class="amount money" type="text" inputmode="decimal" value="${val}" placeholder="0,00 €" autocomplete="off"></div><div class="field"><label>Repère</label><div class="small" style="padding:9px 0">Applicable à partir de cette date, jusqu’au prochain changement.</div></div><div class="field"><label>Action</label><button class="danger remove-band" type="button">Supprimer</button></div>`;
  row.querySelector('.remove-band').onclick=()=>{
    if(container.children.length>1)row.remove();
  };
  container.appendChild(row);
  attachDateFormatter(row.querySelector('.date-entry'));
  attachMoneyFormatter(row.querySelector('.amount'));
}

function initBands(){
  bandRow($('thresholdBands'),'2024-11-01','','Date d’effet du seuil');
}

$('addThreshold').onclick=()=>bandRow($('thresholdBands'),'2025-04-01','','Date d’effet du seuil');

let incomeRows={},results=[],piBandsByDate={},pensionPaymentOverrides={};
let customResourceColumns=[];
let nextCustomColumnId=1;

function addCustomResourceColumn(){
  const suggested=`Autre ressource ${customResourceColumns.length+1}`;
  const name=window.prompt('Nom de la nouvelle colonne de ressources :',suggested);
  if(name===null)return;
  const clean=name.trim();
  if(!clean){window.alert('Le nom de la colonne ne peut pas être vide.');return;}
  if(['Mois de ressources','Montant de pension retenu (€) — modifiable','Revenus d’activité (€)','Revenus de remplacement (IJ, chômage…) (€)'].some(x=>x.toLocaleLowerCase('fr-FR')===clean.toLocaleLowerCase('fr-FR')) || customResourceColumns.some(c=>c.name.toLocaleLowerCase('fr-FR')===clean.toLocaleLowerCase('fr-FR'))){
    window.alert('Ce nom est déjà utilisé. Choisissez un nom différent.');return;
  }
  customResourceColumns.push({id:`custom${nextCustomColumnId++}`,name:clean});
  renderIncomeMonths();
  if(results.length){$('results').style.display='none';$('exportXlsx').disabled=true;$('exportDocx').disabled=true;}
}

if($('addResourceColumn'))$('addResourceColumn').onclick=addCustomResourceColumn;

function updateIncomeTableHeader(){
  const head=$('incomeTable').querySelector('thead');
  head.innerHTML='';
  const row=document.createElement('tr');
  ['Mois de ressources','Montant de pension retenu (€) — modifiable','Revenus d’activité (€)','Revenus de remplacement (IJ, chômage…) (€)',...customResourceColumns.map(c=>c.name)].forEach(label=>{
    const th=document.createElement('th');th.textContent=label;row.appendChild(th);
  });
  head.appendChild(row);
}


function getBands(id){
  return [...$(id).querySelectorAll('.band-row')].map(r=>({
    date:dateToISO(r.querySelector('.effdate').value),
    amount:r.querySelector('.amount').value===''?NaN:parseMoney(r.querySelector('.amount').value)
  })).filter(x=>x.date).sort((a,b)=>a.date.localeCompare(b.date));
}

function getPiBands(){
  return [...$('piNeededTable').querySelectorAll('tbody tr')].map(r=>({
    date:r.dataset.date,
    amount:r.querySelector('input').value===''?NaN:parseMoney(r.querySelector('input').value)
  })).sort((a,b)=>a.date.localeCompare(b.date));
}

function bandValue(bands,d){
  let value=0;
  for(const b of bands){
    if(b.date<=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`)value=b.amount;
    else break;
  }
  return value;
}

function piValue(d){
  return bandValue(getPiBands().filter(x=>Number.isFinite(x.amount)),d);
}

function renderNeededPensionMonths(){
  try{
    const pays=getPeriod(),
      first=addMonths(pays[0],-13),
      last=pays[pays.length-1],
      tb=$('piNeededTable').querySelector('tbody');

    const prior={};
    for(const r of tb.querySelectorAll('tr'))prior[r.dataset.date]=r.querySelector('input').value;

    tb.innerHTML='';
    let aprilYear=first.getFullYear();
    if(first.getMonth()<3)aprilYear--;

    const entries=[{
      date:`${monthKey(first)}-01`,
      label:`Montant théorique de pension au 1er avril ${aprilYear}`
    }];

    for(let y=aprilYear+1;y<=last.getFullYear();y++){
      const d=new Date(y,3,1);
      if(d<=last)entries.push({
        date:`${y}-04-01`,
        label:`Montant théorique revalorisé au 1er avril ${y}`
      });
    }

    entries.forEach((entry,i)=>{
      const tr=document.createElement('tr');
      tr.dataset.date=entry.date;
      tr.innerHTML=`<td>${entry.label}</td><td><input class="money" type="number" min="0" step="0.01" value="${prior[entry.date]??''}" placeholder="Montant à saisir (€)"></td><td>${i===0?`Montant théorique de la pension au 1er avril ${aprilYear}`:'Revalorisation annuelle'}</td>`;
      attachMoneyFormatter(tr.querySelector('input'));
      tr.querySelector('input').oninput=()=>refreshPensionCells();
      tb.appendChild(tr);
    });

    $('piNeededNotice').textContent=`Renseignez le montant théorique de pension applicable au 1er avril qui couvre le premier mois de la période de ressources (${monthLabel(first)}), puis les montants théoriques revalorisés au 1er avril des années suivantes affichées. Exemple : si le premier mois de ressources est octobre 2023, indiquez le montant applicable au 1er avril 2023. Ces montants sont appliqués automatiquement aux mois de comparaison. En cas de changement exceptionnel en cours d’année (prise d’effet, suspension ou montant proratisé), vérifiez et adaptez les montants mensuels dans le tableau des ressources.`;

    return true;
  }catch(e){
    showError(e.message);
    return false;
  }
}

function getPeriod(){
  const s=dateToISO($('start').value),e=dateToISO($('end').value);
  if(!s||!e||s>e)throw Error('Renseignez des dates de début et de fin d’indu valides.');
  const a=monthDate(s.slice(0,7)),b=monthDate(e.slice(0,7));
  let out=[];
  for(let d=a;d<=b;d=addMonths(d,1))out.push(d);
  return out;
}

function renderIncomeMonths(){
  try{
    renderNeededPensionMonths();
    const pays=getPeriod(),
      first=addMonths(pays[0],-13),
      lastPay=pays[pays.length-1],
      lastResource=addMonths(lastPay,-2),
      tb=$('incomeTable').querySelector('tbody');

    const prior={...incomeRows};
    updateIncomeTableHeader();
    tb.innerHTML='';
    incomeRows={};

    for(let d=first;d<=lastResource;d=addMonths(d,1)){
      const k=monthKey(d);
      incomeRows[k]=prior[k]||{activity:'',replacement:'',custom:{}};
      incomeRows[k].custom=incomeRows[k].custom||{};

      const tr=document.createElement('tr');
      const autoPension=piValue(d);
      const shownPension=incomeRows[k].pension!==undefined&&incomeRows[k].pension!==''?incomeRows[k].pension:fmtInput(autoPension);
      const isResourceMonth=d<=lastResource;
      tr.dataset.month=k;
      const values=[
        isResourceMonth?monthLabel(d):`${monthLabel(d)} — pension de la mensualité (pas de ressources à saisir)`,
        null,null,null
      ];
      const monthCell=document.createElement('td');monthCell.textContent=values[0];tr.appendChild(monthCell);
      const pensionCell=document.createElement('td');pensionCell.innerHTML=euroInput(shownPension);tr.appendChild(pensionCell);
      const activityCell=document.createElement('td');activityCell.innerHTML=isResourceMonth?euroInput(incomeRows[k].activity):'—';tr.appendChild(activityCell);
      const replacementCell=document.createElement('td');replacementCell.innerHTML=isResourceMonth?euroInput(incomeRows[k].replacement):'—';tr.appendChild(replacementCell);
      for(const col of customResourceColumns){
        const td=document.createElement('td');
        td.innerHTML=isResourceMonth?euroInput(incomeRows[k].custom[col.id]??''):'—';
        tr.appendChild(td);
      }
      const ins=tr.querySelectorAll('input');
      ins.forEach(attachMoneyFormatter);
      ins[0].oninput=()=>incomeRows[k].pension=ins[0].value;
      if(isResourceMonth){
        ins[1].oninput=()=>incomeRows[k].activity=ins[1].value;
        ins[2].oninput=()=>incomeRows[k].replacement=ins[2].value;
        customResourceColumns.forEach((col,i)=>{ins[3+i].oninput=()=>incomeRows[k].custom[col.id]=ins[3+i].value;});
      }
      tb.appendChild(tr);
    }
    return true;
  }catch(e){showError(e.message);return false;}
}

function refreshPensionCells(){
  const rows=[...$('incomeTable').querySelector('tbody').rows];
  for(const tr of rows){
    const k=tr.dataset.month;
    if(k){
      const d=monthDate(k),v=incomeRows[k]||{};
      if(v.pension===undefined||v.pension===''){
        tr.cells[1].querySelector('input').value=fmtInput(piValue(d));
      }
    }
  }
}

function fmtInput(n){
  return Number.isFinite(n)?fmt(n):'';
}

function pensionForMonth(d){
  const k=monthKey(d),v=incomeRows[k]||{};
  return v.pension!==undefined&&v.pension!==''?parseMoney(v.pension):piValue(d);
}

function showError(msg){
  $('error').textContent=msg;
  $('error').style.display='block';
}

function clearError(){
  $('error').style.display='none';
}

function calculate(){
  clearError();

  try{
    const pays=getPeriod(),th=getBands('thresholdBands');
    if(!th.length)throw Error('Renseignez le seuil de comparaison.');
    if(th.some(x=>!Number.isFinite(x.amount)||x.amount<0))throw Error('Tous les montants de seuil doivent être renseignés en euros.');

    const piBands=getPiBands();
    if(!piBands.length||piBands.some(x=>!Number.isFinite(x.amount)||x.amount<0)){
      throw Error('Renseignez tous les montants théoriques de pension demandés, y compris les montants revalorisés au 1er avril.');
    }

    const first=addMonths(pays[0],-13),last=pays[pays.length-1];
    for(let d=first;d<=last;d=addMonths(d,1)){
      const k=monthKey(d);
      incomeRows[k]=incomeRows[k]||{activity:'',replacement:''};
    }

    results=pays.map(pay=>{
      let sumPi=0,sumA=0,sumR=0,customSums=Object.fromEntries(customResourceColumns.map(c=>[c.id,0])),detail=[];

      for(let d=addMonths(pay,-13);d<=addMonths(pay,-2);d=addMonths(d,1)){
        const k=monthKey(d),v=incomeRows[k]||{activity:'',replacement:'',custom:{}},
          p=pensionForMonth(d),
          a=Number.isFinite(parseMoney(v.activity))?parseMoney(v.activity):0,
          r=Number.isFinite(parseMoney(v.replacement))?parseMoney(v.replacement):0,
          customValues=Object.fromEntries(customResourceColumns.map(c=>{const raw=v.custom?.[c.id];return [c.id,Number.isFinite(parseMoney(raw))?parseMoney(raw):0];}));

        sumPi+=p;
        sumA+=a;
        sumR+=r;
        for(const col of customResourceColumns)customSums[col.id]+=customValues[col.id];
        detail.push({date:d,pi:p,activity:a,replacement:r,custom:customValues});
      }

      const total=sumPi+sumA+sumR+Object.values(customSums).reduce((a,b)=>a+b,0),
        threshold=bandValue(th,pay),
        excess=Math.max(0,total-threshold),
        reduction=excess*0.5/12,
        basePension=pensionForMonth(pay),
        pension=(Object.prototype.hasOwnProperty.call(pensionPaymentOverrides,monthKey(pay))?pensionPaymentOverrides[monthKey(pay)]:basePension),
        arrears=Math.max(0,pension-reduction);

      return {pay,detail,sumPi,sumA,sumR,customSums,total,threshold,excess,reduction,pension,arrears,over:total>threshold};
    });

    const resultHead=$('resultTable').querySelector('thead tr');
    resultHead.innerHTML='';
    ['Mensualité','Total pension théorique','Revenus d’activité','Revenus de remplacement',...customResourceColumns.map(c=>c.name),'Total ressources','Seuil','Dépassement','Réduction mensuelle','Pension théorique de la mensualité','Arrérages théoriques après réduction'].forEach(label=>{const th=document.createElement('th');th.textContent=label;resultHead.appendChild(th);});
    const tbody=$('resultTable').querySelector('tbody');
    tbody.innerHTML='';

    for(const r of results){
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${dateLabel(r.pay)}</td><td>${fmt(r.sumPi)}</td><td>${fmt(r.sumA)}</td><td>${fmt(r.sumR)}</td>${customResourceColumns.map(c=>`<td>${fmt(r.customSums[c.id]||0)}</td>`).join('')}<td><b>${fmt(r.total)}</b></td><td>${fmt(r.threshold)}</td><td>${fmt(r.excess)}</td><td>${fmt(r.reduction)}</td><td><input class="money result-pension" type="text" inputmode="decimal" data-pay="${monthKey(r.pay)}" value="${fmt(r.pension)}" style="min-width:105px;width:100%;box-sizing:border-box"></td><td class="result-arrears"><b>${fmt(r.arrears)}</b></td>`;

      const pi=tr.querySelector('.result-pension');
      attachMoneyFormatter(pi);
      pi.addEventListener('change',()=>{
        const v=parseMoney(pi.value);
        if(!Number.isFinite(v)||v<0){
          pi.value=fmt(r.pension);
          return;
        }
        pensionPaymentOverrides[pi.dataset.pay]=v;
        r.pension=v;
        r.arrears=Math.max(0,v-r.reduction);
        tr.querySelector('.result-arrears').innerHTML=`<b>${fmt(r.arrears)}</b>`;
      });

      tbody.appendChild(tr);
    }

    const n=results.filter(r=>r.over).length;
    $('summary').innerHTML=`<p><b>${results.length}</b> mensualité(s) calculée(s), dont <b>${n}</b> avec dépassement du seuil. <span class="pill">Réduction = dépassement positif × 50 % ÷ 12</span></p><p class="small">Les arrérages théoriques sont plafonnés à 0 € lorsque la réduction atteint ou dépasse la pension théorique applicable à la mensualité. La pension théorique applicable à chaque mensualité peut être modifiée directement dans le tableau des résultats. Le montant effectivement payé n’est pas automatiquement assimilé à l’indu : il doit être comparé aux arrérages théoriques dans le cadre du décompte.</p>`;

    $('results').style.display='block';
    $('exportXlsx').disabled=false;
    $('exportDocx').disabled=false;
  }catch(e){
    showError(e.message);
  }
}

function refreshIncomeTable(){
  renderIncomeMonths();
}

$('start').onchange=refreshIncomeTable;
$('end').onchange=refreshIncomeTable;

$('calculate').onclick=calculate;

function exportData(){
  return results.map(r=>({
    Mois:dateLabel(r.pay),
    'Total pension théorique':r.sumPi,
    'Revenus activité':r.sumA,
    'Revenus remplacement':r.sumR,
    'Total ressources':r.total,
    'Seuil':r.threshold,
    'Dépassement':r.excess,
    'Réduction mensuelle':r.reduction,
    'Pension théorique applicable':r.pension,
    'Arrérages théoriques':r.arrears
  }));
}

$('exportXlsx').onclick=()=>{
  if(!results.length)return;
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';

  script.onload=()=>{
    const wb=XLSX.utils.book_new();
    const summary=[
      ['CALCUL DES COMPARAISONS DE PENSION D’INVALIDITÉ'],
      ['Prénom',$('firstName').value],
      ['Nom',$('name').value],
      [],
      ['Mensualité','Total pension théorique','Revenus d’activité','Revenus de remplacement',...customResourceColumns.map(c=>c.name),'Total ressources','Seuil de comparaison','Dépassement','Réduction mensuelle','Pension théorique applicable','Arrérages théoriques après réduction']
    ];

    results.forEach(r=>summary.push([
      dateLabel(r.pay),r.sumPi,r.sumA,r.sumR,...customResourceColumns.map(c=>r.customSums[c.id]||0),r.total,r.threshold,r.excess,r.reduction,r.pension,r.arrears
    ]));

    const ws=XLSX.utils.aoa_to_sheet(summary);
    ws['!cols']=[{wch:22},{wch:22},{wch:18},{wch:24},...customResourceColumns.map(c=>({wch:Math.min(28,Math.max(14,c.name.length+2))})),{wch:18},{wch:20},{wch:18},{wch:20},{wch:25},{wch:30}];
    XLSX.utils.book_append_sheet(wb,ws,'Synthèse');

    for(const r of results){
      const arr=[
        ['CALCUL DU PAIEMENT DE '+dateLabel(r.pay).toUpperCase()],
        ['Période de référence','Montant théorique pension d’invalidité','Revenus d’activité','Revenus de remplacement',...customResourceColumns.map(c=>c.name)],
        ...r.detail.map(d=>[monthLabel(d.date),d.pi,d.activity,d.replacement,...customResourceColumns.map(c=>d.custom?.[c.id]||0)]),
        ['SOUS-TOTAL',r.sumPi,r.sumA,r.sumR,...customResourceColumns.map(c=>r.customSums[c.id]||0)],
        ['TOTAL DES RESSOURCES',r.total,...Array(2+customResourceColumns.length).fill(null)],
        ['Seuil de comparaison',r.threshold],
        ['Dépassement',r.excess],
        ['50 % du dépassement',r.excess*.5],
        ['Montant à déduire',r.reduction],
        ['Pension théorique applicable à la mensualité',r.pension],
        ['Arrérages théoriques après réduction',r.arrears]
      ];

      const sheet=XLSX.utils.aoa_to_sheet(arr);
      sheet['!cols']=[{wch:32},{wch:34},{wch:24},{wch:28},...customResourceColumns.map(c=>({wch:Math.min(28,Math.max(14,c.name.length+2))}))];
      const name=dateLabel(r.pay).slice(0,25);
      XLSX.utils.book_append_sheet(wb,sheet,name);
    }

    XLSX.writeFile(wb,'Calcul_pension_invalidite_CRAMIF.xlsx');
  };

  document.head.appendChild(script);
};

$('exportDocx').onclick=()=>{
  if(!results.length)return;

  const script=document.createElement('script');
  script.src='https://unpkg.com/docx@8.5.0/build/index.umd.js';

  script.onload=async()=>{
    const {
      Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,
      WidthType,AlignmentType,HeadingLevel,BorderStyle,ShadingType
    }=docx;

    const children=[];
    const font='Arial Narrow';
    const size=22; // 11 points

    const run=(text,options={})=>new TextRun({
      text:String(text),
      font,
      size,
      ...options
    });

    const para=(text='',options={})=>new Paragraph({
      children:[run(text)],
      spacing:{after:100,line:260},
      ...options
    });

    const boldPara=(parts,options={})=>new Paragraph({
      children:parts.map(p=>typeof p==='string'?run(p):run(p.text,p.options||{})),
      spacing:{after:100,line:260},
      ...options
    });

    const border={style:BorderStyle.SINGLE,size:4,color:'000000'};
    const borders={top:border,bottom:border,left:border,right:border};
    const cell=(text,{bold=false,align=AlignmentType.CENTER,fill=null,width=25}={})=>new TableCell({
      width:{size:width,type:WidthType.PERCENTAGE},
      borders,
      margins:{top:70,bottom:70,left:75,right:75},
      ...(fill?{shading:{fill,type:ShadingType.CLEAR}}:{}),
      children:[new Paragraph({
        alignment:align,
        spacing:{before:0,after:0,line:240},
        children:[run(text,{bold})]
      })]
    });

    children.push(new Paragraph({
      alignment:AlignmentType.CENTER,
      spacing:{after:220},
      children:[run('ANNEXE — CALCUL DES COMPARAISONS DE PENSION D’INVALIDITÉ',{bold:true,size:24})]
    }));

    if($('firstName').value.trim()||$('name').value.trim()){
      children.push(new Paragraph({
        spacing:{after:180},
        children:[
          run('Assuré : ',{bold:true}),
          run(($('firstName').value+' '+$('name').value).trim())
        ]
      }));
    }

    for(const r of results){
      const payLabel=dateLabel(r.pay);
      const payCapital=payLabel.toLocaleUpperCase('fr-FR');
      // Titre de mensualité encadré, comme dans les modèles CRAMIF.
      children.push(new Table({
        width:{size:100,type:WidthType.PERCENTAGE},
        rows:[new TableRow({children:[new TableCell({
          borders,
          margins:{top:55,bottom:55,left:80,right:80},
          children:[new Paragraph({
            alignment:AlignmentType.CENTER,
            spacing:{before:0,after:0,line:240},
            children:[run('CALCUL DU PAIEMENT DE LA MENSUALITÉ DE '+payCapital,{bold:true})]
          })]
        })]})]
      }));
      children.push(para(''));

      children.push(para(
        'Les ressources prises en compte sont celles perçues durant la période de référence allant du 13e mois au 2e mois précédant la mensualité à payer.'
      ));

      const columnNames=['Période de référence','Montant théorique de la pension d’invalidité','Revenus d’activité','Revenus de remplacement',...customResourceColumns.map(c=>c.name)];
      const columnWidths=columnNames.map((_,i)=>i===0?18:i===1?25:i===2?17:i===3?20:Math.max(10,20/customResourceColumns.length));
      const widthTotal=columnWidths.reduce((a,b)=>a+b,0);
      const normalizedWidths=columnWidths.map(w=>w*100/widthTotal);
      const cellWidths=normalizedWidths;
      const rows=[new TableRow({tableHeader:true,children:columnNames.map((v,i)=>cell(v,{bold:true,align:AlignmentType.CENTER,width:cellWidths[i]}))})];

      for(const d of r.detail){
        const vals=[monthLabel(d.date),fmt(d.pi),fmt(d.activity),fmt(d.replacement),...customResourceColumns.map(c=>fmt(d.custom?.[c.id]||0))];
        rows.push(new TableRow({children:vals.map((v,i)=>cell(v,{align:i===0?AlignmentType.CENTER:AlignmentType.RIGHT,width:cellWidths[i]}))}));
      }

      const subtotalValues=['SOUS-TOTAL',fmt(r.sumPi),fmt(r.sumA),fmt(r.sumR),...customResourceColumns.map(c=>fmt(r.customSums[c.id]||0))];
      rows.push(new TableRow({children:subtotalValues.map((v,i)=>cell(v,{bold:true,align:i===0?AlignmentType.LEFT:AlignmentType.RIGHT,width:cellWidths[i]}))}));

      rows.push(new TableRow({children:[
        cell('TOTAL DES RESSOURCES',{bold:true,fill:'D9D9D9',align:AlignmentType.CENTER,width:cellWidths[0]}),
        new TableCell({
          columnSpan:columnNames.length-1,
          width:{size:100-cellWidths[0],type:WidthType.PERCENTAGE},
          borders,
          shading:{fill:'D9D9D9',type:ShadingType.CLEAR},
          margins:{top:70,bottom:70,left:75,right:75},
          children:[new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:0,line:240},children:[run(fmt(r.total),{bold:true})]})]
        })
      ]}));

      const metricRow=(label,value,fill=null,bold=false)=>new TableRow({children:[
        cell(label,{bold,fill,align:AlignmentType.LEFT,width:cellWidths[0]}),
        new TableCell({columnSpan:columnNames.length-1,width:{size:100-cellWidths[0],type:WidthType.PERCENTAGE},borders,...(fill?{shading:{fill,type:ShadingType.CLEAR}}:{}),margins:{top:70,bottom:70,left:75,right:75},children:[new Paragraph({alignment:AlignmentType.RIGHT,spacing:{before:0,after:0,line:240},children:[run(fmt(value),{bold})]})]})
      ]});
      rows.push(metricRow('Seuil de comparaison',r.threshold));
      rows.push(metricRow('DÉPASSEMENT',r.excess,'D9D9D9',true));

      children.push(new Table({width:{size:100,type:WidthType.PERCENTAGE},columnWidths:normalizedWidths.map(w=>Math.round(w*100)),rows}));
      children.push(para(''));

      if(r.over && r.reduction < r.pension){
        // Suspension partielle : reprise du texte à trous validé.
        const paymentMonth = payLabel;
        const insuredName = ($('firstName').value + ' ' + $('name').value).trim() || 'l’assurée';
        const monthStart = `${r.pay.getFullYear()}-${String(r.pay.getMonth() + 1).padStart(2, '0')}-01`;
        const applicablePiBand = getPiBands()
          .filter(b => b.date <= monthStart && Number.isFinite(b.amount))
          .sort((a, b) => a.date.localeCompare(b.date))
          .at(-1);
        const revaluationYear = applicablePiBand?.date.match(/^(\d{4})-04-01$/)?.[1];
        const revaluationNote = revaluationYear
          ? ` (montant revalorisé au 01/04/${revaluationYear})`
          : '';

        children.push(para(
          `Le total de la pension théorique et des ressources de l’assurée étant supérieur au montant de son seuil de comparaison (${fmt(r.threshold)}), le service de sa pension est suspendu pour la mensualité de ${paymentMonth}.`
        ));

        children.push(para(
          'Pour déterminer s’il s’agit d’une suspension partielle ou totale, il convient de calculer le montant de la réduction mensuelle et de le comparer au montant théorique de la pension d’invalidité de l’assurée, ce en application du III des dispositions précitées selon lequel « le montant des arrérages mensuels servis au titre des trois mois civils suivants est réduit à hauteur d’un douzième de 50 % du montant du dépassement constaté ». '
        ));

        children.push(para(
          'Si le montant de la réduction mensuelle est inférieur au montant théorique de la pension d’invalidité, des arrérages réduits sont dus. Si le montant de la réduction mensuelle est supérieur ou égal au montant théorique de la pension d’invalidité, aucun arrérage n’est dû.'
        ));

        children.push(boldPara([
          'En l’espèce, le montant de la réduction mensuelle calculée est de ',
          {text:fmt(r.reduction),options:{bold:true}},
          `, correspondant à 1/12ème de 50 % du dépassement constaté (${fmt(r.excess)} (ressources − seuil de comparaison) × 50 % / 12).`
        ]));

        children.push(para(
          `Le montant de la pension théorique de ${insuredName} est de ${fmt(r.pension)}${revaluationNote}.`
        ));

        children.push(boldPara([
          `Par conséquent, seuls des arrérages bruts de ${fmt(r.arrears)} étaient dus pour la mensualité de ${paymentMonth} [${fmt(r.pension)} − ${fmt(r.reduction)} = ${fmt(r.arrears)}].`
        ]));
      }else if(r.over){
        // Suspension totale : ne pas utiliser le texte réservé à la suspension partielle.
        children.push(para(
          `Le total de la pension théorique et des ressources de l’assurée (${fmt(r.total)}) étant supérieur au seuil de comparaison (${fmt(r.threshold)}), un dépassement de ${fmt(r.excess)} est constaté pour la mensualité de ${payLabel}.`
        ));
        children.push(para(
          `La réduction mensuelle calculée, correspondant à 1/12ème de 50 % du dépassement constaté (${fmt(r.excess)} × 50 % / 12), s’élève à ${fmt(r.reduction)}.`
        ));
        children.push(boldPara([
          `Le montant de cette réduction étant supérieur ou égal au montant théorique de la pension applicable (${fmt(r.pension)}), aucun arrérage brut n’était dû pour la mensualité de ${payLabel}.`
        ]));
      }else{
        children.push(para(
          `Le total de la pension théorique et des ressources de l’assurée (${fmt(r.total)}) ne dépasse pas le seuil de comparaison (${fmt(r.threshold)}). Aucun dépassement n’est constaté pour la mensualité de ${payLabel} ; aucune réduction au titre de la comparaison des ressources n’est donc appliquée.`
        ));
      }
      children.push(para(''));
    }

    const doc=new Document({
      styles:{
        default:{
          document:{run:{font,size},paragraph:{spacing:{after:100,line:260}}}
        }
      },
      sections:[{
        properties:{
          page:{
            margin:{top:850,bottom:850,left:850,right:850}
          }
        },
        children
      }]
    });

    const blob=await Packer.toBlob(doc);
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='Annexe_calcul_pension_invalidite_CRAMIF.docx';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  };

  script.onerror=()=>showError('Impossible de charger la bibliothèque nécessaire à la création du document Word. Vérifiez votre connexion internet.');
  document.head.appendChild(script);
};

initBands();
renderIncomeMonths();

/* Navigation au clavier :
   Entrée passe au champ correspondant de la ligne suivante
   dans les tableaux des ressources et de pension théorique. */
function enableEnterToNextRow(tableId){
  const table=$(tableId);
  if(!table)return;

  table.addEventListener('keydown',event=>{
    if(event.key!=='Enter'||!(event.target instanceof HTMLInputElement))return;

    const currentInput=event.target;
    const currentRow=currentInput.closest('tbody tr');
    if(!currentRow)return;

    const rows=[...table.querySelectorAll('tbody tr')];
    const rowIndex=rows.indexOf(currentRow);

    if(rowIndex<0||rowIndex>=rows.length-1)return;

    const inputsInRow=[...currentRow.querySelectorAll('input:not([disabled])')];
    const inputIndex=inputsInRow.indexOf(currentInput);
    if(inputIndex<0)return;

    const nextRow=rows[rowIndex+1];
    const nextInputs=[...nextRow.querySelectorAll('input:not([disabled])')];
    const nextInput=nextInputs[inputIndex];

    if(!nextInput)return;

    event.preventDefault();
    nextInput.focus();

    if(typeof nextInput.select==='function')nextInput.select();
  });
}

enableEnterToNextRow('incomeTable');
enableEnterToNextRow('piNeededTable');
